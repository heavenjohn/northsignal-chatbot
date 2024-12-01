import { useState} from "react";
import Sidebar from "../admin/admin-sidebar"; // Import Sidebar
import Navbar from "../admin/admin-navbar"; // Import Navbar
// Import DashboardCard if needed
// import DashboardCard from "../admin/admin-dashboardcard"; 

const Dashboard = () => {
  // Define the state for title in Dashboard
  const [title, setTitle] = useState("Dashboard");

  return (
    <div className="flex h-screen">
      {/* Pass setTitle to Sidebar */}
      <Sidebar setTitle={setTitle} />
      <div className="flex-1 p-6">
        {/* Pass title to Navbar */}
        <Navbar title={title} />
        <div className="flex-1">
          <div className="p-6">
            {/* Example grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Add your Dashboard cards here */}
              {/* Uncomment and use the DashboardCard if needed */}
              {/* <DashboardCard title="Users" icon={<FaUsers />} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
