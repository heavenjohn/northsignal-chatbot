// import DashboardCard from "../admin/admin-dashboardcard"; // Fix the typo in the import path
// import { FaUsers } from "react-icons/fa";
import Sidebar from "../admin/admin-sidebar";
import Navbar from "../admin/admin-navbar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
