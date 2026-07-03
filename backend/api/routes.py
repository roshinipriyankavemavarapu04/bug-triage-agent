from fastapi import APIRouter, HTTPException, Depends

from orchestrator import BugTriageOrchestrator

from backend.database.database import SessionLocal
from backend.database.models import User
from backend.auth.auth_dependency import get_current_user

from backend.schemas.bug_schema import (
    BugRequest,
    StatusUpdate,
    TeamUpdate
)

from backend.crud.bug_crud import (
    create_bug,
    get_all_bugs,
    get_bug_by_id,
    update_bug_status,
    update_bug_team,
    delete_bug,
    get_dashboard_summary,
    get_team_summary,
    get_severity_summary,
    get_status_summary,
    get_priority_summary,
    get_dashboard_analytics
)

router = APIRouter()

orchestrator = BugTriageOrchestrator()


# -------------------------------------------------
# AI TRIAGE
# -------------------------------------------------

@router.post("/triage")
def triage_bug(
    bug: BugRequest,
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    try:

        bug_data = bug.model_dump()

        result = orchestrator.process_bug(
            bug_data,
            db
        )

        if result["status"] != "Duplicate":

            create_bug(
                db=db,
                bug_data=bug_data,
                ai_result=result
            )

        return result

    finally:
        db.close()


# -------------------------------------------------
# GET ALL BUGS
# -------------------------------------------------

@router.get("/bugs")
def get_bugs(
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    try:
        return get_all_bugs(db)

    finally:
        db.close()


# -------------------------------------------------
# GET BUG BY ID
# -------------------------------------------------

@router.get("/bugs/{bug_id}")
def get_bug(
    bug_id: int,
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    try:

        bug = get_bug_by_id(db, bug_id)

        if bug is None:

            raise HTTPException(
                status_code=404,
                detail="Bug not found"
            )

        return bug

    finally:
        db.close()


# -------------------------------------------------
# UPDATE STATUS
# -------------------------------------------------

@router.put("/bugs/{bug_id}/status")
def update_status(
    bug_id: int,
    status_update: StatusUpdate,
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    try:

        bug = update_bug_status(
            db,
            bug_id,
            status_update.status
        )

        if bug is None:

            raise HTTPException(
                status_code=404,
                detail="Bug not found"
            )

        return bug

    finally:
        db.close()


# -------------------------------------------------
# UPDATE TEAM
# -------------------------------------------------

@router.put("/bugs/{bug_id}/team")
def update_team(
    bug_id: int,
    team_update: TeamUpdate,
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    try:

        bug = update_bug_team(
            db,
            bug_id,
            team_update.team
        )

        if bug is None:

            raise HTTPException(
                status_code=404,
                detail="Bug not found"
            )

        return bug

    finally:
        db.close()


# -------------------------------------------------
# DELETE BUG
# -------------------------------------------------

@router.delete("/bugs/{bug_id}")
def delete(
    bug_id: int,
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    try:

        bug = delete_bug(db, bug_id)

        if bug is None:

            raise HTTPException(
                status_code=404,
                detail="Bug not found"
            )

        return {
            "message": "Bug deleted successfully"
        }

    finally:
        db.close()


# -------------------------------------------------
# DASHBOARD SUMMARY
# -------------------------------------------------

@router.get("/dashboard/summary")
def dashboard_summary(
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    try:
        return get_dashboard_summary(db)

    finally:
        db.close()


# -------------------------------------------------
# TEAM SUMMARY
# -------------------------------------------------

@router.get("/dashboard/team-summary")
def team_summary(
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    try:
        return get_team_summary(db)

    finally:
        db.close()


# -------------------------------------------------
# SEVERITY SUMMARY
# -------------------------------------------------

@router.get("/dashboard/severity-summary")
def severity_summary(
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    try:
        return get_severity_summary(db)

    finally:
        db.close()


# -------------------------------------------------
# STATUS SUMMARY
# -------------------------------------------------

@router.get("/dashboard/status-summary")
def status_summary(
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    try:
        return get_status_summary(db)

    finally:
        db.close()


# -------------------------------------------------
# PRIORITY SUMMARY
# -------------------------------------------------

@router.get("/dashboard/priority-summary")
def priority_summary(
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    try:
        return get_priority_summary(db)

    finally:
        db.close()


# -------------------------------------------------
# DASHBOARD ANALYTICS
# -------------------------------------------------

@router.get("/dashboard/analytics")
def dashboard_analytics(
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    try:
        return get_dashboard_analytics(db)

    finally:
        db.close()