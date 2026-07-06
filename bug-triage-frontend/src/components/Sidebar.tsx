import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Bug,
  PlusCircle,
  BarChart3,
  Settings,
  Bot
} from "lucide-react";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      <div className="logo">

        AI Bug Triage

      </div>

      <nav>

        <NavLink to="/dashboard">

          <LayoutDashboard size={20} />

          Dashboard

        </NavLink>

        <NavLink to="/bugs">

          <Bug size={20} />

          Bugs

        </NavLink>

        <NavLink to="/create">

          <PlusCircle size={20} />

          Create Bug

        </NavLink>

        <NavLink to="/analytics">

          <BarChart3 size={20} />

          Analytics

        </NavLink>

        <NavLink to="/settings">

          <Settings size={20} />

          Settings

        </NavLink>

      </nav>

      <div className="sidebar-bottom">

        <Bot size={18} />

        AI Powered

      </div>

    </aside>
  );
};

export default Sidebar;