class RecommendationEngine:

    def generate(
        self,
        web_checks,
        vulnerabilities,
        ssl_analysis
    ):

        recommendations = []

        for finding in web_checks:

            if (
                finding.get("type")
                ==
                "Missing Security Header"
            ):

                header = finding.get(
                    "header"
                )

                recommendations.append(
                    {
                        "priority": "High",
                        "title":
                            f"Enable {header}",
                        "description":
                            f"Configure {header} security header."
                    }
                )

        if not ssl_analysis.get(
            "hsts_enabled"
        ):

            recommendations.append(
                {
                    "priority": "Medium",
                    "title":
                        "Enable HSTS",
                    "description":
                        "Enable Strict Transport Security."
                }
            )

        for vuln in vulnerabilities:

            recommendations.append(
                {
                    "priority":
                        vuln.get(
                            "severity",
                            "Medium"
                        ),

                    "title":
                        vuln.get(
                            "cve"
                        ),

                    "description":
                        vuln.get(
                            "recommendation",
                            "Patch software."
                        )
                }
            )

        return recommendations