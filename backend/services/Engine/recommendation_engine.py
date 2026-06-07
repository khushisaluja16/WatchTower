class RecommendationEngine:

    def __init__(self):

        self.header_rules = {

            "Content-Security-Policy": {
                "title": "Enable Content Security Policy",
                "category": "Web Security",
                "impact": "High",
                "effort": "Medium",
                "affected_component": "Web Server",
                "recommendation_type": "Configuration",
                "description":
                    "Add a Content-Security-Policy header to reduce XSS attack risks."
            },

            "Strict-Transport-Security": {
                "title": "Enable HSTS",
                "category": "Transport Security",
                "impact": "High",
                "effort": "Low",
                "affected_component": "Web Server",
                "recommendation_type": "Configuration",
                "description":
                    "Force browsers to communicate only over HTTPS."
            },

            "X-Frame-Options": {
                "title": "Enable X-Frame-Options",
                "category": "Web Security",
                "impact": "Medium",
                "effort": "Low",
                "affected_component": "Web Server",
                "recommendation_type": "Configuration",
                "description":
                    "Prevent clickjacking attacks by restricting iframe usage."
            },

            "X-Content-Type-Options": {
                "title": "Enable X-Content-Type-Options",
                "category": "Web Security",
                "impact": "Medium",
                "effort": "Low",
                "affected_component": "Web Server",
                "recommendation_type": "Configuration",
                "description":
                    "Prevent MIME type sniffing attacks."
            }
        }

    def _calculate_score(
        self,
        severity,
        impact,
        effort
    ):

        severity_score = {
            "Critical": 100,
            "High": 75,
            "Medium": 50,
            "Low": 25,
            "Info": 10
        }

        impact_score = {
            "High": 30,
            "Medium": 20,
            "Low": 10
        }

        effort_penalty = {
            "Low": 0,
            "Medium": -5,
            "High": -10
        }

        score = (
            severity_score.get(
                severity,
                25
            )
            +
            impact_score.get(
                impact,
                10
            )
            +
            effort_penalty.get(
                effort,
                0
            )
        )

        return max(
            score,
            0
        )

    def _priority_from_score(
        self,
        score
    ):

        if score >= 110:
            return "Critical"

        if score >= 85:
            return "High"

        if score >= 60:
            return "Medium"

        return "Low"

    def generate(
        self,
        web_checks,
        vulnerabilities,
        ssl_analysis
    ):

        recommendations = []

        recommendation_counter = 1
        # WEB SECURITY FINDINGS

        for finding in web_checks:

            if (
                finding.get("type")
                ==
                "Missing Security Header"
            ):

                header = finding.get(
                    "header"
                )

                rule = self.header_rules.get(
                    header
                )

                if not rule:
                    continue

                score = self._calculate_score(
                    severity="Medium",
                    impact=rule["impact"],
                    effort=rule["effort"]
                )

                recommendations.append({

                    "id":
                        f"REC-{recommendation_counter:03}",

                    "title":
                        rule["title"],

                    "description":
                        rule["description"],

                    "category":
                        rule["category"],

                    "priority":
                        self._priority_from_score(
                            score
                        ),

                    "score":
                        score,

                    "impact":
                        rule["impact"],

                    "effort":
                        rule["effort"],

                    "affected_component":
                        rule["affected_component"],

                    "recommendation_type":
                        rule["recommendation_type"],

                    "related_findings": [
                        header
                    ]
                })

                recommendation_counter += 1

        # SSL FINDINGS
        if not ssl_analysis.get(
            "hsts_enabled"
        ):

            score = self._calculate_score(
                severity="Medium",
                impact="High",
                effort="Low"
            )

            recommendations.append({

                "id":
                    f"REC-{recommendation_counter:03}",

                "title":
                    "Enable HSTS",

                "description":
                    "Configure Strict-Transport-Security header to enforce HTTPS.",

                "category":
                    "SSL/TLS",

                "priority":
                    self._priority_from_score(
                        score
                    ),

                "score":
                    score,

                "impact":
                    "High",

                "effort":
                    "Low",

                "affected_component":
                    "HTTPS Service",

                "recommendation_type":
                    "Configuration",

                "related_findings": [
                    "HSTS Not Enabled"
                ]
            })

            recommendation_counter += 1

        # VULNERABILITIES
        for vuln in vulnerabilities:

            severity = vuln.get(
                "severity",
                "Medium"
            )

            score = self._calculate_score(
                severity=severity,
                impact="High",
                effort="Medium"
            )

            recommendations.append({

                "id":
                    f"REC-{recommendation_counter:03}",

                "title":
                    f"Patch {vuln.get('cve')}",

                "description":
                    vuln.get(
                        "recommendation",
                        "Apply vendor security updates."
                    ),

                "category":
                    "Vulnerability Management",

                "priority":
                    self._priority_from_score(
                        score
                    ),

                "score":
                    score,

                "impact":
                    "High",

                "effort":
                    "Medium",

                "affected_component":
                    vuln.get(
                        "cve",
                        "Unknown Service"
                    ),

                "recommendation_type":
                    "Patch Management",

                "related_findings": [
                    vuln.get(
                        "cve"
                    )
                ]
            })

            recommendation_counter += 1

        # SORT BY SCORE

        recommendations.sort(
            key=lambda x: x["score"],
            reverse=True
        )

        return recommendations