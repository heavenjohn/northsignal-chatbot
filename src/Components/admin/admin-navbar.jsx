import { FaBell, FaUserCircle } from "react-icons/fa";
import PropTypes from "prop-types"; // Import PropTypes
import { Link } from "react-router-dom"; // Import Link for routing

const Navbar = ({ title }) => {
  return (
    <div className="bg-white shadow p-4 flex items-center justify-between">
      {/* Make the title clickable and navigate to the dashboard route */}
      <Link to="/dashboard" className="text-lg font-bold">
        {title}
      </Link>
      <div className="flex items-center gap-4">
        {/* Bell icon */}
        <FaBell className="text-gray-600 text-xl cursor-pointer" />
        {/* User profile icon */}
        <FaUserCircle className="text-gray-600 text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

// Prop validation using PropTypes
Navbar.propTypes = {
  title: PropTypes.string.isRequired, // Validate that title is a required string
};

export default Navbar;
