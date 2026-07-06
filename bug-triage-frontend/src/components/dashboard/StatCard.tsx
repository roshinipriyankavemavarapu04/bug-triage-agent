import "./StatCard.css";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
  subtitle?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  color,
  subtitle,
}: StatCardProps) => {
  return (
    <div className="stat-card">
      <div
        className="stat-icon"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>

      <div className="stat-content">
        <h4>{title}</h4>

        <h2>{value}</h2>

        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
};

export default StatCard;