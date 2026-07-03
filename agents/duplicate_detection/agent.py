import json

from google import genai

from config import GEMINI_API_KEY

from .prompt import SYSTEM_PROMPT
from .schema import DuplicateDetectionResponse


class DuplicateDetectionAgent:

    def __init__(self):

        self.client = genai.Client(
            api_key=GEMINI_API_KEY
        )

        self.system_prompt = SYSTEM_PROMPT

    def detect_duplicate(
        self,
        new_bug,
        existing_bugs
    ):

        prompt = self._build_prompt(
            new_bug,
            existing_bugs
        )

        response = self._invoke_llm(prompt)

        result = self._parse_response(response)

        return result

    def _build_prompt(
        self,
        new_bug,
        existing_bugs
    ):

        return f"""
Existing Bugs:

{json.dumps(existing_bugs, indent=2)}

New Bug:

{json.dumps(new_bug, indent=2)}
"""

    def _invoke_llm(self, prompt):

        full_prompt = f"""
{self.system_prompt}

IMPORTANT:
- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT wrap the JSON inside ```json.
- Do NOT add explanations.

{prompt}
"""

        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=full_prompt
        )

        return response.text

    def _parse_response(self, response):

        # Remove markdown if present
        response = response.replace("```json", "")
        response = response.replace("```", "")
        response = response.strip()

        # Convert JSON string to Python dictionary
        data = json.loads(response)

        # -------------------------------
        # Handle "None" returned as string
        # -------------------------------
        if data.get("master_bug_id") == "None":
            data["master_bug_id"] = None

        # -------------------------------
        # Handle BUG-101 style IDs
        # -------------------------------
        if isinstance(data.get("master_bug_id"), str):

            value = data["master_bug_id"]

            if value.startswith("BUG-"):

                number = value.replace("BUG-", "")

                if number.isdigit():
                    data["master_bug_id"] = int(number)

        # -------------------------------
        # Handle numeric strings ("2")
        # -------------------------------
        if isinstance(data.get("master_bug_id"), str):

            if data["master_bug_id"].isdigit():
                data["master_bug_id"] = int(data["master_bug_id"])

        return DuplicateDetectionResponse(**data)