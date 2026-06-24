from fastapi import APIRouter
from services.dashboard_service import DashboardService

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

dashboard_service = DashboardService()


@router.get("/stats")
def get_dashboard_stats():

    return dashboard_service.get_stats()