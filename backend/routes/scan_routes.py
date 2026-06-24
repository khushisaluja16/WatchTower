from fastapi import APIRouter
from services.scan_service import ScanService
from database import supabase

router = APIRouter(
    prefix="/scan",
    tags=["Scan"]
)


@router.get("/run")
def run_scan(
    target: str,
    scan_type: str = "quick"
):

    scanner = ScanService()

    result = scanner.full_scan(
        target,
        scan_type
    )

    return result


@router.get("/report/{scan_uuid}")
def get_report(scan_uuid: str):

    result = (
        supabase
        .table("scan_reports")
        .select("*")
        .eq("scan_uuid", scan_uuid)
        .single()
        .execute()
    )

    return result.data