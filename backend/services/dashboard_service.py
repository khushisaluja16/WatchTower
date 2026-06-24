from collections import defaultdict
from database import supabase


class DashboardService:

    def get_stats(self):

        scans = (
            supabase
            .table("scans")
            .select("*")
            .execute()
            .data
        )

        total_scans = len(scans)

        critical_issues = 0
        vulnerable_assets = 0
        total_vulnerabilities = 0

        risk_distribution = {
            "Critical": 0,
            "High": 0,
            "Medium": 0,
            "Low": 0
        }

        recent_scans = []

        trend = defaultdict(int)

        for scan in scans:

            vuln_count = scan.get("vulnerability_count") or 0
            risk_level = scan.get("risk_level") or "Low"
            created_at = scan.get("created_at")

            total_vulnerabilities += vuln_count

            if risk_level in risk_distribution:
                risk_distribution[risk_level] += 1

            if risk_level in ["High", "Critical"]:
                vulnerable_assets += 1

            recent_scans.append({
                "scan_uuid": scan.get("scan_uuid"),
                "target": scan.get("target"),
                "vulnerability_count": vuln_count,
                "risk_level": risk_level,
                "created_at": created_at
            })

            # Build chart data
            if created_at:
                day = created_at[:10]  # YYYY-MM-DD
                trend[day] += 1

        critical_issues = risk_distribution["Critical"]

        # Latest scans first
        recent_scans = sorted(
            recent_scans,
            key=lambda x: x.get("created_at") or "",
            reverse=True
        )[:10]

        # Convert trend to chart format
        vulnerability_trend = []

        for day in sorted(trend.keys()):
            vulnerability_trend.append({
                "label": day,
                "value": trend[day],
                "color": "#60a5fa"
            })

        return {
            "total_scans": total_scans,
            "critical_issues": critical_issues,
            "vulnerable_assets": vulnerable_assets,
            "total_vulnerabilities": total_vulnerabilities,
            "risk_distribution": risk_distribution,
            "recent_scans": recent_scans,
            "vulnerability_trend": vulnerability_trend
        }