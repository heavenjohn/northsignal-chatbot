import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../Firebase/firebaseConfig"; // Import Firebase Firestore
import Sidebar from "../admin/admin-sidebar";
import Navbar from "../admin/admin-navbar";
import DashboardCard from "../admin/admin-dashboardcard";
import { FaUsers, FaDollarSign, FaShoppingCart } from "react-icons/fa";

const Dashboard = () => {
  const [title, setTitle] = useState("Dashboard");
  const [dashboardData, setDashboardData] = useState([
    { title: "Users", value: "Loading...", icon: FaUsers, color: "bg-blue-500" },
    { title: "Revenue", value: "Loading...", icon: FaDollarSign, color: "bg-green-500" },
    { title: "Orders", value: "Loading...", icon: FaShoppingCart, color: "bg-yellow-500" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        const revenueSnapshot = await getDocs(collection(db, "revenue"));

        // Update dashboard data with values from Firebase
        setDashboardData([
          { title: "Users", value: usersSnapshot.size.toString(), icon: FaUsers, color: "bg-blue-500" },
          { title: "Revenue", value: `$${revenueSnapshot.docs[0].data().total}`, icon: FaDollarSign, color: "bg-green-500" },
          { title: "Orders", value: ordersSnapshot.size.toString(), icon: FaShoppingCart, color: "bg-yellow-500" },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white fixed h-full">
        <Sidebar setTitle={setTitle} />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 bg-gray-100">
        {/* Navbar */}
        <div className="bg-white shadow-md">
          <Navbar title={title} />
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData.map((data, index) => (
              <DashboardCard
                key={index}
                title={data.title}
                value={data.value}
                icon={data.icon}
                color={data.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
