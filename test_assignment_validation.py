from agents.assignment_validation import (
    AssignmentValidationAgent
)


bug = {

    "title": "Login API throws HTTP 500",

    "description": (
        "Expired JWT token causes NullPointerException."
    ),

    "category": "Backend",

    "severity": "Critical",

    "priority": "High"
}


team_recommendation = {

    "recommended_team": "Backend Team",

    "matched_responsibility": "Server-side exceptions",

    "confidence": 85,

    "root_cause": "Expired JWT Token"
}


agent = AssignmentValidationAgent()

response = agent.validate_assignment(
    bug,
    team_recommendation
)

print("\n===== ASSIGNMENT VALIDATION =====\n")

print(response)