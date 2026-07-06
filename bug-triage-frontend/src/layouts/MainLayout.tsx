import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "./MainLayout.css";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="layout">

      <Sidebar />

      <div className="main-container">

        <Navbar />

        <main className="page-content">

          {children}

        </main>

      </div>

    </div>
  );
};

export default MainLayout;