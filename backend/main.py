from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.ssl_routes import router as ssl_router

app = FastAPI(title="WatchTower API", version="1.0.0")

# Allows the React frontend (port 5173) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Your root endpoint
@app.get("/")
def root():
    return {"message": "WatchTower API is running"}

# Register SSL routes
# All routes in ssl_routes.py are now active
app.include_router(ssl_router)

# When teammate 1 finishes, he adds one line here:
# from routes.scan_routes import router as scan_router
# app.include_router(scan_router)