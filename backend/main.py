from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.ssl_routes import router as ssl_router
from routes.scan_routes import router as scan_router

app = FastAPI(title="WatchTower API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "WatchTower API is running"}

app.include_router(ssl_router)
app.include_router(scan_router)