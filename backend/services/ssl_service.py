import uuid
from datetime import datetime, timezone
from database import supabase
from services.ssl_analyzer import analyze_ssl


async def run_ssl_scan_and_save(target: str, port: int, scan_id=None) -> dict:
    # Step 1: Run the pure analysis
    results = analyze_ssl(target, port)

    # Step 2: Save to Supabase
    try:
        record = {
            # ── Original columns your teammate created ──
            "scan_id": scan_id,
            "tls_version": results.get("tls_version"),
            "certificate_issuer": results.get("cert_issuer"),  # ← their name
            "expiry_date": results.get("valid_until"),         # ← their name
            "is_expired": results.get("is_expired", False),
            "risk_level": results.get("grade"),                # ← their name

            # ── New columns you just added ──
            "hostname": results.get("hostname"),
            "port": results.get("port"),
            "error": results.get("error"),
            "cert_subject": results.get("cert_subject"),
            "cert_issuer": results.get("cert_issuer"),
            "cert_serial_number": results.get("cert_serial_number"),
            "valid_from": results.get("valid_from"),
            "valid_until": results.get("valid_until"),
            "days_until_expiry": results.get("days_until_expiry"),
            "is_self_signed": results.get("is_self_signed", False),
            "cipher_suite": results.get("cipher_suite"),
            "cipher_bits": results.get("cipher_bits"),
            "subject_alt_names": results.get("subject_alt_names", []),
            "hsts_enabled": results.get("hsts_enabled", False),
            "hsts_max_age": results.get("hsts_max_age"),
            "grade": results.get("grade"),
            "warnings": results.get("warnings", []),
            "scanned_at": datetime.now(timezone.utc).isoformat(),
        }

        response = supabase.table("ssl_analysis").insert(record).execute()
        if response.data:
            results["db_id"] = str(response.data[0]["id"])

    except Exception as e:
        print(f"[DB ERROR] Could not save SSL results: {e}")
        results["db_id"] = None

    return results