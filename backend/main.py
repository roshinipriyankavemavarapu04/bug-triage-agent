from fastapi import FastAPI

from backend.api.routes import router

app = FastAPI(
    title="AI Bug Triage System"
)

app.include_router(router)