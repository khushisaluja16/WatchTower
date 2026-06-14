import time

from services.nmap_service import NmapService
from services.web_scanner import WebScanner
from services.vulnerability_engine import VulnerabilityEngine
from services.ssl_analyzer import analyze_ssl

from services.risk_engine import RiskEngine
from services.Engine.recommendation_engine import RecommendationEngine
from services.severity_aggregator import SeverityAggregator
from services.scan_metadata_generator import ScanMetadataGenerator


class ScanService:

    def __init__(self):

        self.nmap_service = NmapService()
        self.web_scanner = WebScanner()
        self.vulnerability_engine = VulnerabilityEngine()

        self.risk_engine = RiskEngine()
        self.recommendation_engine = RecommendationEngine()
        self.severity_aggregator = SeverityAggregator()
        self.metadata_generator = ScanMetadataGenerator()

    def full_scan(self, target: str):

        # START TIMER
        start_time = time.time()

        # NMAP SCAN
        nmap_results = self.nmap_service.scan_target(
            target
        )

        services = []
        open_ports = []
        ip_address = None

        if nmap_results.get("hosts"):

            host = nmap_results["hosts"][0]

            ip_address = host.get("ip")

            for port_info in host.get(
                "ports",
                []
            ):

                open_ports.append(
                    port_info["port"]
                )

                services.append(
                    port_info
                )

        # WEB SECURITY CHECKS

        web_results = self.web_scanner.scan(
            target
        )
        # SSL ANALYSIS

        ssl_results = analyze_ssl(
            target
        )

        # VULNERABILITY MATCHING

        vulnerabilities = (
            self.vulnerability_engine.analyze(
                services
            )
        )

        # SEVERITY AGGREGATION

        severity_summary = (
            self.severity_aggregator.aggregate(
                web_results,
                vulnerabilities,
                ssl_results
            )
        )

        # RISK SCORE CALCULATION

        risk_results = (
            self.risk_engine.calculate(
                severity_summary,
                len(open_ports),
                ssl_results.get("grade")
            )
        )

        # RECOMMENDATIONS

        recommendations = (
            self.recommendation_engine.generate(
                web_results,
                vulnerabilities,
                ssl_results
            )
        )

        # METADATA

        duration = round(
            time.time() - start_time,
            2
        )

        metadata = (
            self.metadata_generator.create(
                duration
            )
        )

        # FINAL REPORT

        report = {

            "scan_metadata": metadata,

            "target": target,

            "network": {
                "ip": ip_address,
                "open_ports": open_ports
            },

            "services": services,

            "web_checks": web_results,

            "ssl_analysis": ssl_results,

            "vulnerabilities": vulnerabilities,

            "recommendations": recommendations,

            "severity_summary": severity_summary,

            "summary": {

                "open_port_count":
                    len(open_ports),

                "vulnerability_count":
                    len(vulnerabilities),

                "web_issue_count":
                    len(web_results),

                "ssl_grade":
                    ssl_results.get(
                        "grade"
                    ),

                "risk_score":
                    risk_results.get(
                        "risk_score"
                    ),

                "risk_level":
                    risk_results.get(
                        "risk_level"
                    )
            }
        }

        return report