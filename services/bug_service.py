from backend.database.database import SessionLocal
from backend.database.models import Bug


# -------------------------------
# CREATE
# -------------------------------
def create_bug(**kwargs):

    db = SessionLocal()

    bug = Bug(**kwargs)

    db.add(bug)
    db.commit()
    db.refresh(bug)

    db.close()

    return bug


# -------------------------------
# READ ALL
# -------------------------------
def get_all_bugs():

    db = SessionLocal()

    bugs = db.query(Bug).all()

    db.close()

    return bugs


# -------------------------------
# READ BY ID
# -------------------------------
def get_bug_by_id(bug_id):

    db = SessionLocal()

    bug = db.query(Bug).filter(Bug.id == bug_id).first()

    db.close()

    return bug


# -------------------------------
# UPDATE STATUS
# -------------------------------
def update_bug_status(bug_id, status):

    db = SessionLocal()

    bug = db.query(Bug).filter(Bug.id == bug_id).first()

    if bug:

        bug.status = status

        db.commit()

        db.refresh(bug)

    db.close()

    return bug


# -------------------------------
# UPDATE TEAM
# -------------------------------
def update_bug_team(bug_id, team):

    db = SessionLocal()

    bug = db.query(Bug).filter(Bug.id == bug_id).first()

    if bug:

        bug.final_team = team

        db.commit()

        db.refresh(bug)

    db.close()

    return bug


# -------------------------------
# DELETE
# -------------------------------
def delete_bug(bug_id):

    db = SessionLocal()

    bug = db.query(Bug).filter(Bug.id == bug_id).first()

    if bug:

        db.delete(bug)

        db.commit()

    db.close()

    return bug