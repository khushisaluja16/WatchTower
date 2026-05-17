import ssl
import socket
import datetime
import httpx
from cryptography import x509
from cryptography.hazmat.backends import default_backend


def analyze_ssl(hostname: str, port: int = 443) -> dict:
    results = {
        "hostname": hostname,
        "port": port,
        "error": None,
        "cert_subject": None,
        "cert_issuer": None,
        "cert_serial_number": None,
        "valid_from": None,
        "valid_until": None,
        "days_until_expiry": None,
        "is_expired": False,
        "is_self_signed": False,
        "tls_version": None,
        "cipher_suite": None,
        "cipher_bits": None,
        "subject_alt_names": [],
        "hsts_enabled": False,
        "hsts_max_age": None,
        "grade": None,
        "warnings": [],
    }

    try:
        # ── Step 1: Connect and grab cert ─────────────────────────────────
        der_cert = None

        # First try: strict (works for valid certs like google.com)
        try:
            context = ssl.create_default_context()
            with socket.create_connection((hostname, port), timeout=10) as sock:
                with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                    results["tls_version"] = ssock.version()
                    cipher = ssock.cipher()
                    results["cipher_suite"] = cipher[0]
                    results["cipher_bits"] = cipher[2]
                    der_cert = ssock.getpeercert(binary_form=True)

        except ssl.SSLCertVerificationError:
            # Second try: lenient (for expired/self-signed certs)
            # We disable verification so we can still READ the certificate
            lenient_context = ssl.create_default_context()
            lenient_context.check_hostname = False
            lenient_context.verify_mode = ssl.CERT_NONE
            with socket.create_connection((hostname, port), timeout=10) as sock:
                with lenient_context.wrap_socket(sock, server_hostname=hostname) as ssock:
                    results["tls_version"] = ssock.version()
                    cipher = ssock.cipher()
                    results["cipher_suite"] = cipher[0]
                    results["cipher_bits"] = cipher[2]
                    der_cert = ssock.getpeercert(binary_form=True)

        # ── Step 2: Parse the certificate ─────────────────────────────────
        cert = x509.load_der_x509_certificate(der_cert, default_backend())
        results["cert_subject"] = cert.subject.rfc4514_string()
        results["cert_issuer"] = cert.issuer.rfc4514_string()
        results["cert_serial_number"] = str(cert.serial_number)

        # ── Step 3: Validity dates ─────────────────────────────────────────
        now = datetime.datetime.now(datetime.timezone.utc)
        valid_from = cert.not_valid_before_utc
        valid_until = cert.not_valid_after_utc
        results["valid_from"] = valid_from.isoformat()
        results["valid_until"] = valid_until.isoformat()
        results["days_until_expiry"] = (valid_until - now).days
        results["is_expired"] = results["days_until_expiry"] < 0

        # ── Step 4: Self-signed check ──────────────────────────────────────
        results["is_self_signed"] = (cert.issuer == cert.subject)

        # ── Step 5: Subject Alternative Names ─────────────────────────────
        try:
            san_ext = cert.extensions.get_extension_for_class(
                x509.SubjectAlternativeName
            )
            results["subject_alt_names"] = [name.value for name in san_ext.value]
        except x509.ExtensionNotFound:
            results["warnings"].append("No Subject Alternative Names found")

        # ── Step 6: HSTS check ─────────────────────────────────────────────
        try:
            with httpx.Client(verify=False, timeout=10) as client:
                response = client.get(f"https://{hostname}", follow_redirects=True)
                hsts = response.headers.get("Strict-Transport-Security")
                if hsts:
                    results["hsts_enabled"] = True
                    for part in hsts.split(";"):
                        part = part.strip()
                        if part.startswith("max-age="):
                            results["hsts_max_age"] = int(part.split("=")[1])
        except Exception:
            results["warnings"].append("Could not check HSTS header")

        # ── Step 7: Warnings ───────────────────────────────────────────────
        if results["is_expired"]:
            results["warnings"].append("Certificate is EXPIRED")
        elif results["days_until_expiry"] is not None and results["days_until_expiry"] < 30:
            results["warnings"].append(
                f"Certificate expires in {results['days_until_expiry']} days"
            )
        if results["is_self_signed"]:
            results["warnings"].append("Certificate is self-signed")
        if results["tls_version"] in ("TLSv1", "TLSv1.1"):
            results["warnings"].append(f"{results['tls_version']} is outdated and insecure")
        if results["cipher_bits"] and results["cipher_bits"] < 128:
            results["warnings"].append("Weak cipher strength (< 128 bits)")
        if not results["hsts_enabled"]:
            results["warnings"].append("HSTS not enabled")

        # ── Step 8: Grade ──────────────────────────────────────────────────
        results["grade"] = _calculate_grade(results)

    except socket.timeout:
        results["error"] = "Connection timed out"
    except ConnectionRefusedError:
        results["error"] = f"Connection refused on port {port}"
    except Exception as e:
        results["error"] = f"Unexpected error: {str(e)}"

    return results


def _calculate_grade(r: dict) -> str:
    if r["error"] or r["is_expired"]:
        return "F"
    score = 100
    if r["is_self_signed"]:                        score -= 40
    if r["tls_version"] in ("TLSv1", "TLSv1.1"):  score -= 30
    elif r["tls_version"] == "TLSv1.2":            score -= 10
    days = r.get("days_until_expiry", 999)
    if days is not None and days < 14:             score -= 20
    elif days is not None and days < 30:           score -= 10
    if not r.get("hsts_enabled"):                  score -= 10
    if r.get("cipher_bits") and r["cipher_bits"] < 128: score -= 20

    if score >= 95: return "A+"
    if score >= 85: return "A"
    if score >= 75: return "B"
    if score >= 60: return "C"
    if score >= 40: return "D"
    return "F"