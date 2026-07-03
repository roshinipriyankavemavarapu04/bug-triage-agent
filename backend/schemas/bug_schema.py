from pydantic import BaseModel
from typing import Optional


class BugRequest(BaseModel):
    title: str
    description: str
    environment: Optional[str] = None
    steps: Optional[str] = None


class StatusUpdate(BaseModel):
    status: str


class TeamUpdate(BaseModel):
    team: str