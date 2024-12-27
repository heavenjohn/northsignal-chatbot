import { useState, useEffect } from "react";
import Sidebar from "../admin/Sidebar"; // Ensure correct relative path and casing
import AdminDashboardCard from "../admin/admin-dasbroadcard"; // Correct import path
import { motion } from "framer-motion"; // Import from Framer Motion

const DashboardLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Toggle sidebar visibility
  const [pageTitle, setPageTitle] = useState("Dashboard"); // Default page title
  const [loading, setLoading] = useState(true); // Loading state

  // Simulate data fetching or setup delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate a 2-second loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-poppins">
      {loading ? (
        // Animated Loading Spinner
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <motion.div
            className="h-16 w-16 border-4 border-t-blue-500 border-gray-300 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
          ></motion.div>
        </div>
      ) : (
        // Main Content After Loading
        <div className="flex flex-grow">
          {/* Sidebar component */}
          <Sidebar
            isSidebarVisible={isSidebarVisible}
            setIsSidebarVisible={setIsSidebarVisible}
            setPageTitle={setPageTitle}
          />

          {/* Main Content */}
          <div
            className={`flex-1 p-6 transition-all duration-300 ease-in-out ${
              isSidebarVisible ? "ml-64" : "ml-16"
            }`}
          >
            {/* Dynamic Page Title */}
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{pageTitle}</h2>

            {/* Welcome Message */}
            {pageTitle === "Dashboard" && (
              <>
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                  <p className="text-gray-700">
                    Welcome to the <strong>{pageTitle}</strong>! Use the
                    navigation menu to explore.
                  </p>
                </div>

                {/* Admin Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <AdminDashboardCard />
                  {/* Add more cards as needed */}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
