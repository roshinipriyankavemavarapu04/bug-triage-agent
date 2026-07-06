import "./DashboardHeader.css";

const DashboardHeader = () => {
  const today = new Date();

  const date = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dashboard-header-new">

      <div>

        <h1>Dashboard</h1>

        <p>
          Welcome back! Here's your AI Bug Triage overview.
        </p>

      </div>

      <div className="dashboard-date">

        <span>{date}</span>

      </div>

    </div>
  );
};

export default DashboardHeader;