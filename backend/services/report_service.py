from database import supabase


class ReportService:

    def save_report(self, report):

        print("========== SAVING FULL REPORT ==========")

        data = {
            "scan_uuid":
                report["scan_metadata"]["scan_id"],

            "report_json":
                report
        }

        result = (
            supabase
            .table("scan_reports")
            .insert(data)
            .execute()
        )

        print("========== REPORT SAVED ==========")

        return result