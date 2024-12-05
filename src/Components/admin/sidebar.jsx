import { useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaCog,
  FaChevronDown,
  FaBars,
  FaArrowLeft,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { signOut } from "firebase/auth"; // Import signOut from Firebase
import { auth } from "../Firebase/firebaseConfig"; // Firebase auth configuration
import PropTypes from "prop-types"; // Import PropTypes for validation

const Sidebar = ({ isSidebarVisible, setIsSidebarVisible, setPageTitle }) => {
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);

  // Sign-out function
  const signOutHandler = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      localStorage.removeItem("auth"); // Clear the authentication token or session
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <aside
      className={`${
        isSidebarVisible ? "w-64" : "w-16"
      } bg-blue-900 text-white flex flex-col transition-all duration-300`}
    >
      {/* Sidebar Toggle */}
      <div className="flex items-center justify-between h-16 px-4 bg-blue-800 shadow">
        {isSidebarVisible && (
          <h1 className="text-lg font-semibold whitespace-nowrap">Dashboard</h1>
        )}
        <button
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          className="text-white p-2 rounded-full hover:bg-blue-700 transition"
          title={isSidebarVisible ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isSidebarVisible ? <FaArrowLeft /> : <FaBars />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow">
        <ul className="mt-4 space-y-1">
          {/* Dashboard Link */}
          <li
            className="flex items-center px-4 py-3 hover:bg-blue-700 rounded-md transition"
            onClick={() => setPageTitle("Dashboard")}
          >
            <Link to="/admin-dashboard" className="flex items-center">
              <FaTachometerAlt className="text-lg" />
              {isSidebarVisible && <span className="ml-4">Dashboard</span>}
            </Link>
          </li>

          {/* Admin Dropdown */}
          <li className="px-4 py-3">
            <div
              className="flex items-center justify-between hover:bg-blue-700 rounded-md px-2 py-2 cursor-pointer transition"
              onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
            >
              <div className="flex items-center">
                <FaUsers className="text-lg" />
                {isSidebarVisible && <span className="ml-4">Admin</span>}
              </div>
              {isSidebarVisible && (
                <FaChevronDown
                  className={`transform transition-transform ${
                    isAdminDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>
            {isAdminDropdownOpen && isSidebarVisible && (
              <ul className="ml-6 mt-2 space-y-2">
                <li>
                  <Link
                    to="/adminList"
                    className="text-sm text-gray-300 hover:text-white transition"
                    onClick={() => setPageTitle("Adminlist")}
                  >
                    Admin List
                  </Link>
                </li>
                <li>
                  <Link
                    to="/addAdmin"
                    className="text-sm text-gray-300 hover:text-white transition"
                    onClick={() => setPageTitle("Add Admin")}
                  >
                    Add Admin
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/edit-admin"
                    className="text-sm text-gray-300 hover:text-white transition"
                    onClick={() => setPageTitle("Edit Admin")}
                  >
                    Edit Admin
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Settings Link */}
          <li
            className="flex items-center px-4 py-3 hover:bg-blue-700 rounded-md transition"
            onClick={() => setPageTitle("Settings")}
          >
            <Link to="/admin/settings" className="flex items-center">
              <FaCog className="text-lg" />
              {isSidebarVisible && <span className="ml-4">Settings</span>}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Manage Account and Logout */}
      <div className="mt-auto">
        <ul className="space-y-1">
          {/* Manage Account Link */}
          <li className="flex items-center px-4 py-3 hover:bg-blue-700 rounded-md transition">
            <Link
              to="/admin/manage-account"
              className="flex items-center"
              onClick={() => setPageTitle("Manage Account")}
            >
              <FaUserCircle className="text-lg" />
              {isSidebarVisible && <span className="ml-4">Manage Account</span>}
            </Link>
          </li>

          {/* Logout Button */}
          <li
            className="flex items-center px-4 py-3 hover:bg-blue-700 rounded-md transition cursor-pointer"
            onClick={signOutHandler}
          >
            <FaSignOutAlt className="text-lg" />
            {isSidebarVisible && <span className="ml-4">Logout</span>}
          </li>
        </ul>
      </div>
    </aside>
  );
};

// Prop Types validation
Sidebar.propTypes = {
  isSidebarVisible: PropTypes.bool.isRequired,
  setIsSidebarVisible: PropTypes.func.isRequired,
  setPageTitle: PropTypes.func.isRequired,
};

export default Sidebar;
