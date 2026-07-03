import json

from google import genai

from config import GEMINI_API_KEY

from .prompt import SYSTEM_PROMPT
from .schema import AssignmentValidationResponse


class AssignmentValidationAgent:

    def __init__(self):

        self.system_prompt = SYSTEM_PROMPT

        self.client = genai.Client(
            api_key=GEMINI_API_KEY
        )

    def validate_assignment(self, bug):

        prompt = self._build_prompt(bug)

        response = self._invoke_llm(prompt)

        result = self._parse_response(response)

        return result

    def _build_prompt(self, bug_data):

        return f"""
Bug Title:
{bug_data["title"]}

Description:
{bug_data["description"]}

Recommended Team:
{bug_data["recommended_team"]}

Matched Responsibility:
{bug_data["matched_responsibility"]}

Root Cause:
{bug_data["root_cause"]}
"""

    def _invoke_llm(self, prompt):

        full_prompt = f"""
{self.system_prompt}

IMPORTANT:
- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT wrap the JSON in ```json.
- Do NOT add explanations.

{prompt}
"""

        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=full_prompt
        )

        return response.text

    def _parse_response(self, response):

        response = response.replace("```json", "")
        response = response.replace("```", "")
        response = response.strip()

        data = json.loads(response)

        return AssignmentValidationResponse(**data)


# import json

# from google import genai
# from config import GEMINI_API_KEY

# from .prompt import SYSTEM_PROMPT
# from .schema import AssignmentValidationResponse


# class AssignmentValidationAgent:

#     def __init__(self):

#         self.system_prompt = SYSTEM_PROMPT

#         self.client = genai.Client(
#             api_key=GEMINI_API_KEY
#         )

#     def validate_assignment(self, bug):

#         # Temporary Mock Response

#         return AssignmentValidationResponse(
#             is_valid=True,
#             final_team=bug["recommended_team"],
#             confidence=95,
#             reason="Mock response used while building backend.",
#             recommendation="Proceed with assignment."
#         )