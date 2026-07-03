from agents.duplicate_detection import DuplicateDetectionAgent


new_bug = {

    "title": "Submit button is not working on the checkout page",

    "description": (
        "there is a bug checkout page submit button is not working."
    )

}


agent = DuplicateDetectionAgent()

response = agent.detect_duplicate(new_bug)

print("\n===== DUPLICATE DETECTION =====\n")

print(response)