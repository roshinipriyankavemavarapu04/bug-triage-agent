from pydantic import BaseModel, Field


class BugAnalysisResponse(BaseModel):
    """
    Standard response returned by the Bug Analysis Agent.
    """

    severity: str = Field(
        description="Severity level of the bug"
    )

    priority: str = Field(
        description="Priority level of the bug"
    )

    category: str = Field(
        description="Functional category of the bug"
    )

    summary: str = Field(
        description="Short summary of the bug"
    )