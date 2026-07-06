from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from backend.api.routes import router
from backend.api.auth_routes import router as auth_router
app = FastAPI(
    title="AI Bug Triage System"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)
app.include_router(auth_router)