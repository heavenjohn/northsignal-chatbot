import { useState } from "react";
import Sidebar from "../admin/sidebar"; // Ensure the correct relative path and casing

const DashboardLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Toggle sidebar visibility
  const [pageTitle, setPageTitle] = useState("Dashboard"); // Default page title

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-poppins">
      {/* Sidebar and Main Content Container */}
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

          {/* Welcome Message (Rendered Only on Dashboard) */}
          {pageTitle === "Dashboard" && (
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <p>
                Welcome to the <strong>{pageTitle}</strong>! Use the navigation menu to explore.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
