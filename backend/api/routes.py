from fastapi import APIRouter, HTTPException

from orchestrator import BugTriageOrchestrator

from backend.database.database import SessionLocal

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
    delete_bug
)

router = APIRouter()

orchestrator = BugTriageOrchestrator()


# -------------------------------------------------
# AI TRIAGE
# -------------------------------------------------

@router.post("/triage")
def triage_bug(bug: BugRequest):

    db = SessionLocal()

    try:

        bug_data = bug.model_dump()

        # Fetch all existing bugs from database
        existing_bugs = get_all_bugs(db)

        # Send both new bug and existing bugs to orchestrator
        result = orchestrator.process_bug(
            bug_data,
            existing_bugs
        )

        # Save only if NOT duplicate
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
def get_bugs():

    db = SessionLocal()

    try:
        return get_all_bugs(db)

    finally:
        db.close()


# -------------------------------------------------
# GET BUG BY ID
# -------------------------------------------------

@router.get("/bugs/{bug_id}")
def get_bug(bug_id: int):

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
    status_update: StatusUpdate
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
    team_update: TeamUpdate
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
def delete(bug_id: int):

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