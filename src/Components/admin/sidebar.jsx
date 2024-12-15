import { useState } from "react";
import { FaTachometerAlt, FaUsers, FaChevronDown, FaBars, FaArrowLeft, FaSignOutAlt, FaRegNewspaper } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const Sidebar = ({ isSidebarVisible, setIsSidebarVisible, setPageTitle }) => {
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signOutHandler = async () => {
    setLoading(true);
    const authInstance = getAuth();
    try {
      await signOut(authInstance);
      localStorage.removeItem("auth");
      navigate("/admin");
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error logging out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside
      className={`${
        isSidebarVisible ? "w-64" : "w-16"
      } bg-blue-900 text-white h-screen flex flex-col transition-all duration-300`}
    >
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

      <nav className="flex-grow overflow-y-auto">
        <ul className="mt-4 space-y-1">
          <li>
            <Link
              to="/admin-dashboard"
              className="flex items-center px-4 py-3 hover:bg-blue-700 rounded-md transition"
              onClick={() => setPageTitle("Dashboard")}
            >
              <FaTachometerAlt className="text-lg" />
              {isSidebarVisible && <span className="ml-4">Dashboard</span>}
            </Link>
          </li>
          <li>
            <div
              className="flex items-center justify-between px-4 py-3 hover:bg-blue-700 rounded-md cursor-pointer transition"
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
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <Link
                    to="/adminList"
                    className="text-sm text-gray-300 hover:text-white transition"
                    onClick={() => setPageTitle("Admin List")}
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
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/newssection"
              className="flex items-center px-4 py-3 hover:bg-blue-700 rounded-md transition"
              onClick={() => setPageTitle("News Section")}
            >
              <FaRegNewspaper className="text-lg" />
              {isSidebarVisible && <span className="ml-4">News Section</span>}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-auto">
        <ul>
          <li
            className="flex items-center px-4 py-3 hover:bg-blue-700 rounded-md transition cursor-pointer"
            onClick={signOutHandler}
          >
            <FaSignOutAlt className="text-lg" />
            {isSidebarVisible && <span className="ml-4">Logout</span>}
            {loading && <span className="ml-2 text-sm">Signing out...</span>}
          </li>
        </ul>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  isSidebarVisible: PropTypes.bool.isRequired,
  setIsSidebarVisible: PropTypes.func.isRequired,
  setPageTitle: PropTypes.func.isRequired,
};

export default Sidebar;
