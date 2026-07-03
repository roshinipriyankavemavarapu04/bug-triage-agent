EXISTING_BUGS = [
    {
        "bug_id": "BUG-101",
        "title": "Login API throws HTTP 500",
        "description": "Expired JWT token causes NullPointerException."
    },
    {
        "bug_id": "BUG-102",
        "title": "Profile page crashes",
        "description": "Uploading a large PNG causes browser crash."
    },
    {
        "bug_id": "BUG-103",
        "title": "SQL timeout while fetching orders",
        "description": "Database query takes more than 30 seconds."
    }
]
def get_existing_bugs():
    return EXISTING_BUGS