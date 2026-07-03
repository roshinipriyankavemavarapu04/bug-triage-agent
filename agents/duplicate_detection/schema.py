from typing import Optional

from pydantic import BaseModel, Field


class DuplicateDetectionResponse(BaseModel):

    is_duplicate: bool = Field(
        description="Whether the submitted bug is duplicate."
    )

    master_bug_id: Optional[int] = Field(
        default=None,
        description="Database ID of the duplicate bug."
    )

    similarity_score: int = Field(
        ge=0,
        le=100,
        description="Similarity score."
    )

    reason: str = Field(
        description="Reason for duplicate decision."
    )

    action: str = Field(
        description="Suggested action."
    )