from agents.bug_analysis import BugAnalysisAgent
from agents.team_recommendation import TeamRecommendationAgent
from agents.duplicate_detection import DuplicateDetectionAgent
from agents.assignment_validation import AssignmentValidationAgent


class BugTriageOrchestrator:

    def __init__(self):

        self.duplicate_agent = DuplicateDetectionAgent()

        self.analysis_agent = BugAnalysisAgent()

        self.team_agent = TeamRecommendationAgent()

        self.validation_agent = AssignmentValidationAgent()


    def process_bug(
        self,
        bug,
        existing_bugs
    ):

        # ==========================================
        # STEP 1 : DUPLICATE DETECTION
        # ==========================================

        print("\n===== STEP 1 : DUPLICATE DETECTION =====")

        duplicate_result = self.duplicate_agent.detect_duplicate(
            bug,
            existing_bugs
        )

        print(duplicate_result)

        if duplicate_result.is_duplicate:

            return {

                "status": "Duplicate",

                "duplicate_details": duplicate_result

            }

        # ==========================================
        # STEP 2 : BUG ANALYSIS
        # ==========================================

        print("\n===== STEP 2 : BUG ANALYSIS =====")

        analysis_result = self.analysis_agent.analyze_bug(bug)

        print(analysis_result)

        # ==========================================
        # STEP 3 : TEAM RECOMMENDATION
        # ==========================================

        print("\n===== STEP 3 : TEAM RECOMMENDATION =====")

        team_result = self.team_agent.recommend_team({

            **bug,

            "category": analysis_result.category,

            "severity": analysis_result.severity,

            "priority": analysis_result.priority

        })

        print(team_result)

        # ==========================================
        # STEP 4 : ASSIGNMENT VALIDATION
        # ==========================================

        print("\n===== STEP 4 : ASSIGNMENT VALIDATION =====")

        validation_result = self.validation_agent.validate_assignment({

            **bug,

            "recommended_team": team_result.recommended_team,

            "matched_responsibility": team_result.matched_responsibility,

            "root_cause": team_result.root_cause

        })

        print(validation_result)

        # ==========================================
        # FINAL RESPONSE
        # ==========================================

        result = {

            "status": "New Bug",

            "analysis": analysis_result,

            "team_recommendation": team_result,

            "assignment_validation": validation_result

        }

        return result