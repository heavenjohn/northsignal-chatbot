import { useState } from "react";
import Sidebar from "../admin/admin-sidebar"; // Import Sidebar
import Navbar from "../admin/admin-navbar"; // Import Navbar
import DashboardCard from "../admin/admin-dasbroadcard"; // Corrected import path
import { FaUsers } from "react-icons/fa"; // Corrected import for FontAwesome icon

const Dashboard = () => {
  // Define the state for the dashboard title
  const [title, setTitle] = useState("Dashboard");

  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <Sidebar setTitle={setTitle} />
      
      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {/* Navbar Component */}
        <Navbar title={title} />
        
        <div className="flex-1">
          <div className="p-6">
            {/* Grid Layout for Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Example Dashboard Card */}
              <DashboardCard title="Users" icon={<FaUsers />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
