import { useState } from "react";
import { FaChartLine, FaUsers } from "react-icons/fa";

import "./AnalyticsTab.css";

interface BugTrendData {
  date: string;
  count: number;
}

interface TeamStats {
  team: string;
  bugs: number;
  resolved: number;
  pending: number;
}

const AnalyticsTab = () => {
  const [bugTrends] = useState<BugTrendData[]>([
    { date: "Mon", count: 25 },
    { date: "Tue", count: 32 },
    { date: "Wed", count: 28 },
    { date: "Thu", count: 35 },
    { date: "Fri", count: 30 },
    { date: "Sat", count: 22 },
    { date: "Sun", count: 18 },
  ]);

  const [teamStats] = useState<TeamStats[]>([
    {
      team: "Backend",
      bugs: 45,
      resolved: 28,
      pending: 17,
    },
    {
      team: "Frontend",
      bugs: 38,
      resolved: 24,
      pending: 14,
    },
    {
      team: "DevOps",
      bugs: 22,
      resolved: 18,
      pending: 4,
    },
    {
      team: "QA",
      bugs: 15,
      resolved: 6,
      pending: 9,
    },
  ]);

  const maxBugCount = Math.max(
    ...bugTrends.map((trend) => trend.count)
  );

  return (
    <div className="analytics-tab">
      <div className="analytics-header">
        <h2>Analytics & Insights</h2>
        <p>
          Detailed analysis of your bug tracking
          metrics
        </p>
      </div>

      {/* Weekly Trends */}

      <div className="analytics-section">
        <div className="section-header">
          <FaChartLine />

          <h3>Weekly Bug Trends</h3>
        </div>

        <div className="trend-chart">
          {bugTrends.map((trend, index) => (
            <div
              key={index}
              className="trend-bar-container"
            >
              <div className="trend-bar-wrapper">
                <div
                  className="trend-bar"
                  style={{
                    height: `${
                      (trend.count / maxBugCount) *
                      200
                    }px`,
                  }}
                />
              </div>

              <span className="trend-label">
                {trend.date}
              </span>

              <span className="trend-value">
                {trend.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Team Performance */}

      <div className="analytics-section">
        <div className="section-header">
          <FaUsers />

          <h3>Team Performance</h3>
        </div>

        <div className="team-stats-grid">
          {teamStats.map((stat, index) => (
            <div
              key={index}
              className="team-stat-card"
            >
              <div className="team-header">
                <h4>{stat.team}</h4>

                <span className="total-badges">
                  {stat.bugs} Bugs
                </span>
              </div>

              <div className="team-progress">
                <div className="progress-item">
                  <div className="progress-label">
                    <span>Resolved</span>

                    <span className="progress-percent">
                      {Math.round(
                        (stat.resolved /
                          stat.bugs) *
                          100
                      )}
                      %
                    </span>
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress-fill resolved"
                      style={{
                        width: `${
                          (stat.resolved /
                            stat.bugs) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="progress-item">
                  <div className="progress-label">
                    <span>Pending</span>

                    <span className="progress-percent">
                      {Math.round(
                        (stat.pending /
                          stat.bugs) *
                          100
                      )}
                      %
                    </span>
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress-fill pending"
                      style={{
                        width: `${
                          (stat.pending /
                            stat.bugs) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics */}

      <div className="analytics-section">
        <div className="section-header">
          <FaChartLine />

          <h3>Key Metrics</h3>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value">
              63%
            </div>

            <div className="metric-label">
              Resolution Rate
            </div>

            <div className="metric-change positive">
              ↑ 5% from last week
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-value">
              2.5d
            </div>

            <div className="metric-label">
              Avg Resolution Time
            </div>

            <div className="metric-change positive">
              ↓ 8 Hours Improvement
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-value">
              8.5
            </div>

            <div className="metric-label">
              Team Efficiency Score
            </div>

            <div className="metric-change positive">
              ↑ 0.3 Points
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-value">
              120
            </div>

            <div className="metric-label">
              Total Bugs Tracked
            </div>

            <div className="metric-change neutral">
              → Stable
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;