import { useState, useEffect } from "react";
import Sidebar from "../admin/sidebar"; // Ensure the correct relative path and casing
import AdminDashboardCard from "../admin/admin-dasbroadcard";
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
          {/* Sidebar Component */}
          <Sidebar
            isSidebarVisible={isSidebarVisible}
            setIsSidebarVisible={setIsSidebarVisible}
            setPageTitle={setPageTitle}
          />

          {/* Main Content Area */}
          <main className="flex-grow bg-white p-6">
            {/* Dynamic Page Title */}
            <h2 className="text-2xl font-bold mb-4">{pageTitle}</h2>

            {/* Welcome Message */}
            {pageTitle === "Dashboard" && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
                  <p>
                    Welcome to the <strong>{pageTitle}</strong>! Use the navigation menu to explore.
                  </p>
                </div>

                {/* Admin Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <AdminDashboardCard />
                  {/* Add more cards as needed */}
                </div>
              </>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
