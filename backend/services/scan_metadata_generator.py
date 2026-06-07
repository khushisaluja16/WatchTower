import uuid

from datetime import datetime


class ScanMetadataGenerator:

    def create(
        self,
        duration
    ):

        return {

            "scan_id":
                str(
                    uuid.uuid4()
                ),

            "scan_date":
                datetime.utcnow()
                .isoformat(),

            "duration_seconds":
                duration
        }