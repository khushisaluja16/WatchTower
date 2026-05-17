from fastapi import APIRouter
from models.ssl_models import SSLScanRequest, SSLScanResponse
from services.ssl_service import run_ssl_scan_and_save

# APIRouter is like a mini FastAPI app
# Think of it as: "these are the SSL-related routes"
# main.py will collect all routers and plug them in
router = APIRouter(prefix="/scan", tags=["SSL"])


@router.post("/ssl", response_model=SSLScanResponse)
async def run_ssl_scan(request: SSLScanRequest):
    results = await run_ssl_scan_and_save(
        target=request.target,
        port=request.port,
        scan_id=request.scan_id
    )
    return SSLScanResponse(**results)


@router.get("/ssl/history/{hostname}", response_model=list[SSLScanResponse])
async def get_ssl_history(hostname: str):
    from database import supabase
    response = (
        supabase.table("ssl_analysis")
        .select("*")
        .eq("hostname", hostname)
        .order("scanned_at", desc=True)
        .limit(10)
        .execute()
    )
    return response.data