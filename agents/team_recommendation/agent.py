import json

from google import genai

from config import GEMINI_API_KEY
from .prompt import SYSTEM_PROMPT
from .schema import TeamRecommendationResponse


class TeamRecommendationAgent:

    def __init__(self):

        self.client = genai.Client(
            api_key=GEMINI_API_KEY
        )

        self.system_prompt = SYSTEM_PROMPT

    def recommend_team(self, bug_data):

        prompt = self._build_prompt(bug_data)

        response = self._invoke_llm(prompt)

        result = self._parse_response(response)

        return result

    def _build_prompt(self, bug_data):

        return f"""
Bug Title:
{bug_data['title']}

Description:
{bug_data['description']}

Category:
{bug_data['category']}

Severity:
{bug_data['severity']}

Priority:
{bug_data['priority']}
"""

    def _invoke_llm(self, prompt):

        full_prompt = f"""
            {self.system_prompt}

            IMPORTANT:

            Return ONLY valid JSON.

            The JSON MUST contain EXACTLY this structure:

            {{
                "recommended_team": "",
                "matched_responsibility": "",
                "root_cause": "",
                "confidence": 0,
                "reason": ""
            }}

            Do not omit any field.
            Do not use markdown.
            Do not explain.

            {prompt}
            """

        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=full_prompt
        )

        return response.text

    def _parse_response(self, response):

        print("\n===== RAW GEMINI RESPONSE =====")
        print(response)

        response = response.replace("```json", "")
        response = response.replace("```", "")
        response = response.strip()

        data = json.loads(response)
        print("Gemini response -----------")
        print(response)
        return TeamRecommendationResponse(**data)