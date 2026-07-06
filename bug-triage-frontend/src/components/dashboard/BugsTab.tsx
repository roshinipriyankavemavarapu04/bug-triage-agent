import React, { useState } from 'react';
import './BugsTab.css';
import {
  FaFilter,
  FaSort,
  FaEye,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';

interface Bug {
  id: number;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  team: string;
  created: string;
}

const BugsTab: React.FC = () => {
  const [bugs] = useState<Bug[]>([
    {
      id: 1,
      title: 'Login API Failure',
      severity: 'Critical',
      priority: 'Critical',
      status: 'Open',
      team: 'Backend',
      created: '2024-07-05',
    },
    {
      id: 2,
      title: 'Dashboard Crash on Load',
      severity: 'High',
      priority: 'High',
      status: 'In Progress',
      team: 'Frontend',
      created: '2024-07-04',
    },
    {
      id: 3,
      title: 'Profile Update Error',
      severity: 'Medium',
      priority: 'Medium',
      status: 'In Progress',
      team: 'Frontend',
      created: '2024-07-03',
    },
    {
      id: 4,
      title: 'Database Connection Timeout',
      severity: 'High',
      priority: 'High',
      status: 'Open',
      team: 'Backend',
      created: '2024-07-02',
    },
    {
      id: 5,
      title: 'Notification Delay',
      severity: 'Low',
      priority: 'Low',
      status: 'Closed',
      team: 'DevOps',
      created: '2024-07-01',
    },
  ]);

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return '#dc2626';
      case 'High':
        return '#f59e0b';
      case 'Medium':
        return '#eab308';
      case 'Low':
        return '#22c55e';
      default:
        return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return '#ef4444';
      case 'In Progress':
        return '#3b82f6';
      case 'Resolved':
        return '#10b981';
      case 'Closed':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="bugs-tab">
      <div className="bugs-header">
        <h2>All Bugs</h2>
        <p>Manage and track all reported bugs</p>
      </div>

      {/* Controls */}
      <div className="bugs-controls">
        <div className="controls-left">
          <div className="filter-group">
            <FaFilter />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="filter-group">
            <FaSort />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="created">Recently Created</option>
              <option value="severity">By Severity</option>
              <option value="priority">By Priority</option>
              <option value="status">By Status</option>
            </select>
          </div>
        </div>

        <div className="controls-right">
          <span className="bug-count">Total: {bugs.length} bugs</span>
        </div>
      </div>

      {/* Bugs Table */}
      <div className="bugs-table-container">
        <table className="bugs-table">
          <thead>
            <tr>
              <th>Bug ID</th>
              <th>Title</th>
              <th>Severity</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Team</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bugs.map((bug) => (
              <tr key={bug.id} className="bug-row">
                <td>
                  <span className="bug-id">#{bug.id}</span>
                </td>
                <td>
                  <div className="bug-title">
                    <span>{bug.title}</span>
                  </div>
                </td>
                <td>
                  <span
                    className="severity-badge"
                    style={{ backgroundColor: getSeverityColor(bug.severity) }}
                  >
                    {bug.severity}
                  </span>
                </td>
                <td>
                  <span className="priority-badge">{bug.priority}</span>
                </td>
                <td>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(bug.status) }}
                  >
                    {bug.status}
                  </span>
                </td>
                <td>
                  <span className="team-badge">{bug.team}</span>
                </td>
                <td>
                  <span className="date">{bug.created}</span>
                </td>
                <td>
                  <div className="actions">
                    <button className="action-btn view" title="View">
                      <FaEye />
                    </button>
                    <button className="action-btn edit" title="Edit">
                      <FaEdit />
                    </button>
                    <button className="action-btn delete" title="Delete">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BugsTab;
