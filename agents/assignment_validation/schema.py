from pydantic import BaseModel, Field


class AssignmentValidationResponse(BaseModel):

    is_valid: bool = Field(
        description="Whether the recommended team assignment is valid"
    )

    final_team: str = Field(
        description="Final approved team"
    )

    confidence: int = Field(
        ge=0,
        le=100,
        description="Confidence score"
    )

    reason: str = Field(
        description="Reason for validation decision"
    )

    recommendation: str = Field(
        description="Suggested next action"
    )