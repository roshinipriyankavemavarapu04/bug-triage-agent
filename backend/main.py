from fastapi import FastAPI

from backend.api.routes import router
from backend.api.auth_routes import router as auth_router
app = FastAPI(
    title="AI Bug Triage System"
)

app.include_router(router)
app.include_router(auth_router)