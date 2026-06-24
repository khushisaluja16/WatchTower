import time
import uuid

from services.nmap_service import NmapService
from services.web_scanner import WebScanner
from services.vulnerability_engine import VulnerabilityEngine
from services.ssl_analyzer import analyze_ssl
from services.history_service import HistoryService
from services.risk_engine import RiskEngine
from services.Engine.recommendation_engine import RecommendationEngine
from services.severity_aggregator import SeverityAggregator
from services.scan_metadata_generator import ScanMetadataGenerator
from services.report_service import ReportService


class ScanService:
    def __init__(self):

        self.nmap_service = NmapService()
        self.web_scanner = WebScanner()
        self.vulnerability_engine = VulnerabilityEngine()
        self.history_service = HistoryService()
        self.risk_engine = RiskEngine()
        self.recommendation_engine = RecommendationEngine()
        self.severity_aggregator = SeverityAggregator()
        self.metadata_generator = ScanMetadataGenerator()
        self.report_service = ReportService()

    def full_scan(
        self,
        target: str,
        scan_type: str = "quick"
    ):
        try:
            # raise Exception("Testing failure")
            start_time = time.time()

            # NMAP SCAN
            nmap_start = time.time()

            nmap_results = self.nmap_service.scan_target(
                target,
                scan_type
            )

            print(
                    "NMAP TIME:",
                    round(time.time() - nmap_start, 2),
                    "seconds"
                )

            services = []
            open_ports = []
            ip_address = None

            if nmap_results.get("hosts"):

                host = nmap_results["hosts"][0]

                ip_address = host.get("ip")

                for port_info in host.get("ports", []):

                    open_ports.append(port_info["port"])

                    services.append(port_info)

            # WEB SECURITY CHECKS
            # WEB SECURITY CHECKS
            web_start = time.time()

            web_results = self.web_scanner.scan(target)

            print(
                "WEB SCAN TIME:",
                round(time.time() - web_start, 2),
                "seconds"
            )

            # SSL ANALYSIS
            # SSL ANALYSIS
            ssl_start = time.time()

            ssl_results = analyze_ssl(target)

            print(
                "SSL TIME:",
                round(time.time() - ssl_start, 2),
                "seconds"
            )
            # VULNERABILITY MATCHING
            vuln_start = time.time()

            vulnerabilities = self.vulnerability_engine.analyze(
                services
            )

            print(
                "VULNERABILITY ENGINE TIME:",
                round(time.time() - vuln_start, 2),
                "seconds"
            )

            # SEVERITY AGGREGATION
            severity_summary = self.severity_aggregator.aggregate(
                web_results, vulnerabilities, ssl_results
            )

            # RISK SCORE
            risk_start = time.time()

            risk_results = self.risk_engine.calculate(
                severity_summary,
                len(open_ports),
                ssl_results.get("grade")
            )

            print(
                "RISK ENGINE TIME:",
                round(time.time() - risk_start, 2),
                "seconds"
            )

            # RECOMMENDATIONS
            recommendations = self.recommendation_engine.generate(
                web_results, vulnerabilities, ssl_results
            )

            # METADATA
           # METADATA
            duration = round(time.time() - start_time,2)

            metadata = self.metadata_generator.create(duration)

            metadata["scan_type"] = scan_type

            # FINAL REPORT
            report = {
                "scan_metadata": metadata,
                "target": target,
                "network": {"ip": ip_address, "open_ports": open_ports},
                "services": services,
                "web_checks": web_results,
                "ssl_analysis": ssl_results,
                "vulnerabilities": vulnerabilities,
                "recommendations": recommendations,
                "severity_summary": severity_summary,
                "summary": {
                    "open_port_count": len(open_ports),
                    "vulnerability_count": len(vulnerabilities),
                    "web_issue_count": len(web_results),
                    "ssl_grade": ssl_results.get("grade"),
                    "risk_score": risk_results.get("risk_score"),
                    "risk_level": risk_results.get("risk_level"),
                },
            }
            print("\n===== SCAN SUMMARY =====")
            print("Target:", target)
            print("Vulnerabilities:", len(vulnerabilities))
            print("Risk Score:", risk_results.get("risk_score"))
            print("Risk Level:", risk_results.get("risk_level"))
            print("========================\n")
            # SAVE SUCCESSFUL SCAN
            print("STEP 8: Save Scan")
            self.history_service.save_scan(report, "completed")

            print("STEP 9: Save Report")
            self.report_service.save_report(report)
            print("STEP 10: Return")

            print(
                "\nTOTAL SCAN TIME:",
                round(time.time() - start_time, 2),
                "seconds\n"
            )

            return report

        except Exception as e:
            failed_report = {
                "scan_metadata": {"scan_id": str(uuid.uuid4())},
                "target": target,
                "network": {"ip": None},
                "summary": {
                    "risk_score": 0,
                    "risk_level": "Unknown",
                    "ssl_grade": "N/A",
                    "open_port_count": 0,
                    "vulnerability_count": 0,
                },
            }
            try:
                self.history_service.save_scan(failed_report, "failed")
            except Exception:
                pass

            raise
