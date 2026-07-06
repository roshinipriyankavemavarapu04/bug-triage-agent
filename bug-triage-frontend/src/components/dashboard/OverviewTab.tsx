import React, { useState, useEffect } from 'react';
import './OverviewTab.css';
import StatCard from './StatCard';
import {
  FaBug,
  FaClipboardList,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaChartPie,
} from 'react-icons/fa';

const OverviewTab: React.FC = () => {
  const [stats, setStats] = useState([
    {
      title: 'Total Bugs',
      value: 120,
      color: '#4F46E5',
      icon: <FaClipboardList />,
      subtitle: 'Overall bugs reported',
    },
    {
      title: 'Open Bugs',
      value: 35,
      color: '#EF4444',
      icon: <FaBug />,
      subtitle: 'Awaiting resolution',
    },
    {
      title: 'Critical Bugs',
      value: 9,
      color: '#F59E0B',
      icon: <FaExclamationTriangle />,
      subtitle: 'Immediate attention',
    },
    {
      title: 'Resolved Bugs',
      value: 76,
      color: '#22C55E',
      icon: <FaCheckCircle />,
      subtitle: 'Successfully fixed',
    },
  ]);

  return (
    <div className="overview-tab">
      <div className="overview-header">
        <h2>Overview</h2>
        <p>Monitor your bug tracking system at a glance</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            color={stat.color}
            icon={stat.icon}
            subtitle={stat.subtitle}
          />
        ))}
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="quick-stat-item">
          <div className="stat-icon-small" style={{ backgroundColor: '#60a5fa' }}>
            <FaClock />
          </div>
          <div>
            <h4>Avg. Resolution Time</h4>
            <p>2.5 days</p>
          </div>
        </div>

        <div className="quick-stat-item">
          <div className="stat-icon-small" style={{ backgroundColor: '#10b981' }}>
            <FaChartPie />
          </div>
          <div>
            <h4>Resolution Rate</h4>
            <p>63%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
