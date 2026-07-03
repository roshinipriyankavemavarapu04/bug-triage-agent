# from orchestrator import BugTriageOrchestrator


# bug = {

#     "title": "In LLm the button is not working",

#     "description": (
#         "The submit button on the checkout page is unresponsive when clicked. "
#     ),

#     "environment": "qa",

#     "steps": (
#         "1.Login\n"
#         "2.Use expired token\n"
#         "3.Click Login"
#     )

# }


# orchestrator = BugTriageOrchestrator()

# response = orchestrator.process_bug(bug)

# print("\n================ FINAL OUTPUT ================\n")

# print(response)
from orchestrator import BugTriageOrchestrator


bug = {

    "title": "Dashboard charts do not load after selecting a date range",

    "description": (
        "The analytics dashboard remains blank after selecting a custom date "
        "range. No charts or graphs are displayed, although the page loads "
        "without any error message."
    ),

    "environment": "QA",

    "steps": (
        "1. Login with a valid user account\n"
        "2. Navigate to the Analytics Dashboard\n"
        "3. Select a custom date range\n"
        "4. Click Apply\n"
        "5. Observe that the charts do not load"
    )

}


orchestrator = BugTriageOrchestrator()

response = orchestrator.process_bug(bug)

print("\n================ FINAL OUTPUT ================\n")

print(response)