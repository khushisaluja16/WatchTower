from fastapi import APIRouter
from services.scan_service import ScanService

router = APIRouter(
    prefix="/scan",
    tags=["Scan"]
)

@router.get("/run")
def run_scan(target: str):
    
    scanner = ScanService()
    
    result = scanner.full_scan(target)
    
    return result

