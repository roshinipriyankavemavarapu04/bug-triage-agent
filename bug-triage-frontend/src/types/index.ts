export interface User {
  id?: number;
  username: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface Bug {
  id?: number;
  title: string;
  description: string;
  environment?: string;
  steps?: string;
  status?: string;
  severity?: string;
  priority?: string;
  team?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BugResponse {
  id: number;
  title: string;
  description: string;
  environment?: string;
  steps?: string;
  status: string;
  severity: string;
  priority: string;
  team: string;
  created_at: string;
  updated_at: string;
}

export interface TriageResult {
  status: string;
  severity: string;
  priority: string;
  team: string;
  reasoning?: string;
}

export interface DashboardSummary {
  total_bugs: number;
  open_bugs: number;
  in_progress_bugs: number;
  closed_bugs: number;
}

export interface TeamSummary {
  [key: string]: number;
}

export interface SeveritySummary {
  [key: string]: number;
}
export interface StatusSummary {
  [key: string]: number;
}

export interface PrioritySummary {
  [key: string]: number;
}

export interface DashboardAnalytics {
  summary: DashboardSummary;
  team_summary: TeamSummary;
  severity_summary: SeveritySummary;
  status_summary: StatusSummary;
  priority_summary: PrioritySummary;
}