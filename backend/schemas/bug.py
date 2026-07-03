from pydantic import BaseModel


class BugCreate(BaseModel):
    title: str
    description: str
    environment: str
    steps: str


class BugResponse(BugCreate):

    id: int

    status: str

    severity: str | None = None
    priority: str | None = None
    category: str | None = None
    summary: str | None = None

    recommended_team: str | None = None
    matched_responsibility: str | None = None
    root_cause: str | None = None
    team_confidence: int | None = None
    team_reason: str | None = None

    is_duplicate: bool | None = None
    master_bug_id: str | None = None
    similarity_score: int | None = None

    assignment_valid: bool | None = None
    final_team: str | None = None
    assignment_confidence: int | None = None
    assignment_reason: str | None = None
    recommendation: str | None = None

    class Config:
        from_attributes = True