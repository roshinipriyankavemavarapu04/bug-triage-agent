import { useState } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardTabs from "../components/dashboard/DashboardTabs";
import OverviewTab from "../components/dashboard/OverviewTab";
import AnalyticsTab from "../components/dashboard/AnalyticsTab";
import BugsTab from "../components/dashboard/BugsTab";
import SettingsTab from "../components/dashboard/SettingsTab";

import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: "📊",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: "📈",
    },
    {
      id: "bugs",
      label: "All Bugs",
      icon: "🐛",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙️",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;

      case "analytics":
        return <AnalyticsTab />;

      case "bugs":
        return <BugsTab />;

      case "settings":
        return <SettingsTab />;

      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="dashboard">
      <DashboardHeader />

      <DashboardTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {renderTabContent()}
      </DashboardTabs>
    </div>
  );
};

export default Dashboard;