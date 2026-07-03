from pydantic import BaseModel, Field

class TeamRecommendationResponse(BaseModel):

    recommended_team: str = Field(
        description="Recommended engineering team"
    )

    matched_responsibility: str = Field(
        description="The responsibility that best matches the reported bug"
    )

    root_cause: str = Field(
        description="The most probable underlying cause of the bug"
    )

    confidence: int = Field(
        ge=0,
        le=100,
        description="Confidence score (0-100) for the recommendation"
    )

    reason: str = Field(
        description="Explanation for why the team was recommended"
    )