from agents.bug_analysis.agent import BugAnalysisAgent


bug = {
    "title": "Login API throws 500 error",
    "description": (
        "When the user logs in with an expired JWT token, "
        "the backend throws a NullPointerException and returns HTTP 500."
    ),
    "environment": "QA Environment",
    "steps": (
        "1. Login with expired token\n"
        "2. Click Login\n"
        "3. Observe server response"
    )
}

agent = BugAnalysisAgent()

response = agent.analyze_bug(bug)

print("\n====== AI RESPONSE ======\n")
print(response)