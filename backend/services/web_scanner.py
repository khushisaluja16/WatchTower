import requests


class WebScanner:

    def scan(self, target):

        findings = []

        try:

            url = f"https://{target}"

            response = requests.get(
                url,
                timeout=10
            )

            headers = response.headers

            security_headers = [
                "Content-Security-Policy",
                "Strict-Transport-Security",
                "X-Frame-Options",
                "X-Content-Type-Options"
            ]

            for header in security_headers:

                if header not in headers:

                    findings.append({
                        "type": "Missing Security Header",
                        "header": header,
                        "severity": "Medium"
                    })

            if "Server" in headers:

                findings.append({
                    "type": "Information Disclosure",
                    "details": headers["Server"],
                    "severity": "Low"
                })

            robots = requests.get(
                f"{url}/robots.txt",
                timeout=5
            )

            if robots.status_code == 200:

                findings.append({
                    "type": "robots.txt Found",
                    "severity": "Info"
                })

        except Exception as e:

            findings.append({
                "type": "Scan Error",
                "details": str(e)
            })

        return findings