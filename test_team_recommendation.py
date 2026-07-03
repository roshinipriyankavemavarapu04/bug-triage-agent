from agents.team_recommendation import TeamRecommendationAgent

bug = {
    "title": "Login API throws HTTP 500",
    "description": (
        "When a user logs in with an expired JWT token, "
        "the backend throws a NullPointerException."
    ),
    "category": "Backend",
    "severity": "Critical",
    "priority": "High"
}

agent = TeamRecommendationAgent()

response = agent.recommend_team(bug)

print("\n===== TEAM RECOMMENDATION =====\n")
print(response)