from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    DateTime
)

from sqlalchemy.sql import func

from .database import Base


# ======================================================
# BUG TABLE
# ======================================================

class Bug(Base):
    __tablename__ = "bugs"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    environment = Column(String(100))
    steps = Column(Text)

    status = Column(String(50), default="Open")

    severity = Column(String(50))
    priority = Column(String(50))
    category = Column(String(100))
    summary = Column(Text)

    recommended_team = Column(String(100))
    matched_responsibility = Column(Text)
    root_cause = Column(Text)
    team_confidence = Column(Integer)
    team_reason = Column(Text)

    is_duplicate = Column(Boolean, default=False)
    master_bug_id = Column(String(100))
    similarity_score = Column(Integer)

    assignment_valid = Column(Boolean)
    final_team = Column(String(100))
    assignment_confidence = Column(Integer)
    assignment_reason = Column(Text)
    recommendation = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )


# ======================================================
# USER TABLE
# ======================================================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(
        String(100),
        unique=True,
        nullable=False
    )

    email = Column(
        String(255),
        unique=True,
        nullable=False
    )

    password = Column(
        String(255),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )