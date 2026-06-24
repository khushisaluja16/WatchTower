from database import supabase


class HistoryService:

    def save_scan(self, report, status="completed"):

        data = {
            "scan_uuid": report["scan_metadata"]["scan_id"],
            "target": report["target"],
            "target_url": report["target"],
            "ip_address": report["network"]["ip"],
            "risk_score": report["summary"]["risk_score"],
            "risk_level": report["summary"]["risk_level"],
            "ssl_grade": report["summary"]["ssl_grade"],
            "open_port_count": report["summary"]["open_port_count"],
            "vulnerability_count": report["summary"]["vulnerability_count"],
            "status": status
        }

        return (
            supabase
            .table("scans")
            .insert(data)
            .execute()
        )