import apiClient from "../api/api";
import type { Bug, TriageResult } from "../types";

/* ==========================================
   Bug Service
========================================== */

export const bugService = {
  // ----------------------------
  // AI Bug Triage
  // ----------------------------
  async triageBug(
    bug: Bug
  ): Promise<TriageResult> {
    const response = await apiClient.post(
      "/triage",
      bug
    );

    return response.data;
  },

  // ----------------------------
  // Get All Bugs
  // ----------------------------
  async getAllBugs(): Promise<Bug[]> {
    const response = await apiClient.get("/bugs");

    return response.data;
  },

  // ----------------------------
  // Get Bug By ID
  // ----------------------------
  async getBugById(
    bugId: number
  ): Promise<Bug> {
    const response = await apiClient.get(
      `/bugs/${bugId}`
    );

    return response.data;
  },

  // ----------------------------
  // Update Bug Status
  // ----------------------------
  async updateBugStatus(
    bugId: number,
    status: string
  ): Promise<Bug> {
    const response = await apiClient.put(
      `/bugs/${bugId}/status`,
      {
        status,
      }
    );

    return response.data;
  },

  // ----------------------------
  // Update Assigned Team
  // ----------------------------
  async updateBugTeam(
    bugId: number,
    team: string
  ): Promise<Bug> {
    const response = await apiClient.put(
      `/bugs/${bugId}/team`,
      {
        team,
      }
    );

    return response.data;
  },

  // ----------------------------
  // Delete Bug
  // ----------------------------
  async deleteBug(
    bugId: number
  ) {
    const response = await apiClient.delete(
      `/bugs/${bugId}`
    );

    return response.data;
  },

  // ----------------------------
  // Dashboard Summary
  // ----------------------------
  async getDashboardSummary() {
    const response = await apiClient.get(
      "/dashboard/summary"
    );

    return response.data;
  },

  // ----------------------------
  // Team Summary
  // ----------------------------
  async getTeamSummary() {
    const response = await apiClient.get(
      "/dashboard/team-summary"
    );

    return response.data;
  },

  // ----------------------------
  // Severity Summary
  // ----------------------------
  async getSeveritySummary() {
    const response = await apiClient.get(
      "/dashboard/severity-summary"
    );

    return response.data;
  },

  // ----------------------------
  // Status Summary
  // ----------------------------
  async getStatusSummary() {
    const response = await apiClient.get(
      "/dashboard/status-summary"
    );

    return response.data;
  },

  // ----------------------------
  // Priority Summary
  // ----------------------------
  async getPrioritySummary() {
    const response = await apiClient.get(
      "/dashboard/priority-summary"
    );

    return response.data;
  },

  // ----------------------------
  // Dashboard Analytics
  // ----------------------------
  async getDashboardAnalytics() {
    const response = await apiClient.get(
      "/dashboard/analytics"
    );

    return response.data;
  },
};