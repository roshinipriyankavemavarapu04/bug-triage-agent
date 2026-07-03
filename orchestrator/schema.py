from pydantic import BaseModel

class BugTriageResult(BaseModel):
    status: str
    analysis: dict | None = None
    team_recommendation: dict | None = None
    assignment_validation: dict | None = None
    duplicate_details: dict | None = None
    category:str | None = None