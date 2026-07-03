# from services.bug_service import create_bug

# bug = create_bug(

#     title="Testing DB",
#     description="Testing SQLAlchemy",
#     environment="QA",
#     steps="Click Login",

#     status="New",

#     severity="High",
#     priority="High",
#     category="Functional",
#     summary="Testing Summary",

#     recommended_team="Backend Team",
#     matched_responsibility="API",
#     root_cause="Null pointer",
#     team_confidence=95,
#     team_reason="Backend issue",

#     is_duplicate=False,
#     master_bug_id=None,
#     similarity_score=None,

#     assignment_valid=True,
#     final_team="Backend Team",
#     assignment_confidence=96,
#     assignment_reason="Correct Team",
#     recommendation="Proceed"
# )

# print(bug.id)

# =======================
# from services.bug_service import get_all_bugs

# bugs = get_all_bugs()

# for bug in bugs:
#     print(bug.id, bug.title)
# =====================

# from services.bug_service import get_bug_by_id

# bug = get_bug_by_id(1)

# print(bug.title)
# ======================
# from services.bug_service import update_bug_status

# bug = update_bug_status(1, "Resolved")

# print(bug.status)
# =====================
# 
# ================
# from services.bug_service import delete_bug

# delete_bug(1)

# print("Deleted")