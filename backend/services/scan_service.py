from services.nmap_service import NmapService
from services.web_scanner import WebScanner
from services.vulnerability_engine import VulnerabilityEngine


class ScanService:

    def __init__(self):

        self.nmap_service = NmapService()
        self.web_scanner = WebScanner()
        self.vulnerability_engine = VulnerabilityEngine()

    def full_scan(self, target: str):

        nmap_results = self.nmap_service.scan_target(target)

        web_results = self.web_scanner.scan(target)

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

        vulnerabilities = self.vulnerability_engine.analyze(
            services
        )

        report = {

            "target": target,

            "network": {
                "ip": ip_address,
                "open_ports": open_ports
            },

            "services": services,

            "web_checks": web_results,

            "vulnerabilities": vulnerabilities
        }

        return report