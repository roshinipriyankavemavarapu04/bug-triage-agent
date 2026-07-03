from pydantic import BaseModel, Field


class DuplicateDetectionResponse(BaseModel):

    is_duplicate: bool = Field(
        description="Whether the bug is a duplicate."
    )

    master_bug_id: str = Field(
        description="Existing bug ID if duplicate, otherwise 'None'."
    )

    similarity_score: int = Field(
        ge=0,
        le=100,
        description="Similarity score between the new bug and the matched bug."
    )

    reason: str = Field(
        description="Reason why the bug is considered duplicate or unique."
    )

    action: str = Field(
        description="Suggested action. Either 'Link to existing bug' or 'Create new bug'."
    )