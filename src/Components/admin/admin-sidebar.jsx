import { FaHome, FaUsers, FaCog, FaChartBar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ setTitle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeLink, setActiveLink] = useState('Dashboard');

  // Handle link click and update title
  const handleLinkClick = (title) => {
    setActiveLink(title);
    setTitle(title); // Update the title in the parent component
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`flex ${isSidebarOpen ? 'w-64' : 'w-16'} h-screen bg-gray-800 text-white flex-col transition-all duration-300 ease-in-out`}>
      <div className="p-4 text-xl font-bold text-center bg-gray-900 flex items-center justify-between">
        <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>Admin Portal</span>
        <button className="text-white" onClick={toggleSidebar}>
          {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-4">
        <a
          href="#home"
          className={`flex items-center gap-2 hover:bg-gray-700 p-2 rounded ${activeLink === "Dashboard" ? 'bg-gray-600' : ''}`}
          onClick={() => handleLinkClick("Dashboard")}
        >
          <FaHome />
          {isSidebarOpen && "Dashboard"}
        </a>
        <a
          href="#users"
          className={`flex items-center gap-2 hover:bg-gray-700 p-2 rounded ${activeLink === "Users" ? 'bg-gray-600' : ''}`}
          onClick={() => handleLinkClick("Users")}
        >
          <FaUsers />
          {isSidebarOpen && "Users"}
        </a>
        <a
          href="#settings"
          className={`flex items-center gap-2 hover:bg-gray-700 p-2 rounded ${activeLink === "Settings" ? 'bg-gray-600' : ''}`}
          onClick={() => handleLinkClick("Settings")}
        >
          <FaCog />
          {isSidebarOpen && "Settings"}
        </a>
        <a
          href="#reports"
          className={`flex items-center gap-2 hover:bg-gray-700 p-2 rounded ${activeLink === "Reports" ? 'bg-gray-600' : ''}`}
          onClick={() => handleLinkClick("Reports")}
        >
          <FaChartBar />
          {isSidebarOpen && "Reports"}
        </a>
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  setTitle: PropTypes.func.isRequired,
};

export default Sidebar;
