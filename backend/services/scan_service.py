from services.nmap_service import NmapService
from services.web_scanner import WebScanner
from services.vulnerability_engine import VulnerabilityEngine
from services.ssl_analyzer import analyze_ssl


class ScanService:

    def __init__(self):

        self.nmap_service = NmapService()
        self.web_scanner = WebScanner()
        self.vulnerability_engine = VulnerabilityEngine()

    def full_scan(self, target: str):

        # NMAP SCAN

        nmap_results = self.nmap_service.scan_target(target)

        services = []
        open_ports = []
        ip_address = None

        if nmap_results["hosts"]:

            host = nmap_results["hosts"][0]

            ip_address = host["ip"]

            for port_info in host["ports"]:

                open_ports.append(
                    port_info["port"]
                )

                services.append(
                    port_info
                )
        # WEB CHECKS

        web_results = self.web_scanner.scan(target)

        # SSL ANALYSIS
        ssl_results = analyze_ssl(target)


        # VULNERABILITY MATCHING

        vulnerabilities = self.vulnerability_engine.analyze(
            services
        )

        # BASIC RISK SCORE

        risk_score = 0

        risk_score += len(vulnerabilities) * 20

        risk_score += len(
            [
                finding
                for finding in web_results
                if finding.get("severity") == "Medium"
            ]
        ) * 5

        if ssl_results.get("grade") == "F":
            risk_score += 30

        elif ssl_results.get("grade") == "D":
            risk_score += 20

        elif ssl_results.get("grade") == "C":
            risk_score += 10

        risk_score = min(risk_score, 100)

        # FINAL REPORT

        report = {

            "target": target,

            "network": {
                "ip": ip_address,
                "open_ports": open_ports
            },

            "services": services,

            "web_checks": web_results,

            "ssl_analysis": ssl_results,

            "vulnerabilities": vulnerabilities,

            "summary": {
                "open_port_count": len(open_ports),
                "vulnerability_count": len(vulnerabilities),
                "web_issue_count": len(web_results),
                "ssl_grade": ssl_results.get("grade"),
                "risk_score": risk_score
            }
        }

        return report