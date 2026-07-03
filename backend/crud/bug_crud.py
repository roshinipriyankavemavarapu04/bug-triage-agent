from sqlalchemy.orm import Session

from backend.database.models import Bug


# ----------------------------
# CREATE BUG
# ----------------------------
def create_bug(db: Session, bug_data: dict, ai_result):

    if ai_result["status"] == "Duplicate":
        return None

    bug = Bug(
        title=bug_data["title"],
        description=bug_data["description"],
        environment=bug_data.get("environment"),
        steps=bug_data.get("steps"),

        status="Open",

        severity=ai_result["analysis"].severity,
        priority=ai_result["analysis"].priority,
        category=ai_result["analysis"].category,
        summary=ai_result["analysis"].summary,

        recommended_team=ai_result["team_recommendation"].recommended_team,
        matched_responsibility=ai_result["team_recommendation"].matched_responsibility,
        root_cause=ai_result["team_recommendation"].root_cause,
        team_confidence=ai_result["team_recommendation"].confidence,
        team_reason=ai_result["team_recommendation"].reason,

        is_duplicate=False,
        master_bug_id=None,
        similarity_score=0,

        assignment_valid=ai_result["assignment_validation"].is_valid,
        final_team=ai_result["assignment_validation"].final_team,
        assignment_confidence=ai_result["assignment_validation"].confidence,
        assignment_reason=ai_result["assignment_validation"].reason,
        recommendation=ai_result["assignment_validation"].recommendation,
    )

    db.add(bug)
    db.commit()
    db.refresh(bug)

    return bug


# ----------------------------
# GET ALL BUGS
# ----------------------------
def get_all_bugs(db: Session):

    return db.query(Bug).all()


# ----------------------------
# GET BUG BY ID
# ----------------------------
def get_bug_by_id(db: Session, bug_id: int):

    return db.query(Bug).filter(Bug.id == bug_id).first()


# ----------------------------
# UPDATE BUG
# ----------------------------
def update_bug(db: Session, bug_id: int, bug_data: dict):

    bug = db.query(Bug).filter(Bug.id == bug_id).first()

    if bug is None:
        return None

    for key, value in bug_data.items():

        if hasattr(bug, key):
            setattr(bug, key, value)

    db.commit()
    db.refresh(bug)

    return bug


# ----------------------------
# DELETE BUG
# ----------------------------
def delete_bug(db: Session, bug_id: int):

    bug = db.query(Bug).filter(Bug.id == bug_id).first()

    if bug is None:
        return None

    db.delete(bug)
    db.commit()

    return bug


# ----------------------------
# UPDATE STATUS
# ----------------------------
def update_bug_status(db: Session, bug_id: int, status: str):

    bug = db.query(Bug).filter(Bug.id == bug_id).first()

    if bug is None:
        return None

    bug.status = status

    db.commit()
    db.refresh(bug)

    return bug


# ----------------------------
# UPDATE TEAM
# ----------------------------
def update_bug_team(db: Session, bug_id: int, team: str):

    bug = db.query(Bug).filter(Bug.id == bug_id).first()

    if bug is None:
        return None

    bug.final_team = team

    db.commit()
    db.refresh(bug)

    return bug


# ----------------------------
# DASHBOARD
# ----------------------------
def get_dashboard_data(db: Session):

    bugs = db.query(Bug).all()

    return {
        "total_bugs": len(bugs),
        "open_bugs": len([b for b in bugs if b.status == "Open"]),
        "closed_bugs": len([b for b in bugs if b.status == "Closed"]),
        "duplicate_bugs": len([b for b in bugs if b.is_duplicate]),
        "high_priority": len([b for b in bugs if b.priority == "High"]),
    }