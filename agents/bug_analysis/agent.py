import json

# from cerebras.cloud.sdk import Cerebras

# from config import CEREBRAS_API_KEY
from google import genai
from config import GEMINI_API_KEY

from .prompt import SYSTEM_PROMPT
from .schema import BugAnalysisResponse


class BugAnalysisAgent:

    def __init__(self):

        self.system_prompt = SYSTEM_PROMPT

        self.client = genai.Client(
            api_key=GEMINI_API_KEY
        )

    def analyze_bug(self, bug):

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

Environment:
{bug_data.get("environment", "")}

Steps:
{bug_data.get("steps", "")}
"""

    def _invoke_llm(self, prompt):
        response = self.client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
                self.system_prompt,
                prompt
            ]
        )
        return response.text


    def _parse_response(self, response):

        response = response.replace("```json", "")
        response = response.replace("```", "")
        response = response.strip()

        data = json.loads(response)

        return BugAnalysisResponse(**data)