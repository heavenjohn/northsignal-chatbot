import { useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider"; 
import { signOut } from "firebase/auth"; 
import { auth } from "../Firebase/firebaseConfig"; 
import AccountSettingsModal from "../From/AccountSettings"; // Import the modal component

const Navbar = ({ title }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const { currentUser } = useAuth(); // Fetch current user

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const openModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="bg-white shadow p-4 flex items-center justify-between">
      <Link to="/admin-dashboard" className="text-lg font-bold">
        {title}
      </Link>
      <div className="flex items-center gap-4 relative">
        <FaBell className="text-gray-600 text-xl cursor-pointer" />
        <div className="relative">
          <FaUserCircle
            className="text-gray-600 text-2xl cursor-pointer"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
              <ul className="text-sm">
                {currentUser && (
                  <li className="px-4 py-2 text-gray-700">
                    <strong>{currentUser.displayName || currentUser.email}</strong>
                  </li>
                )}
                <li>
                  <button
                    onClick={openModal}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Manage Account
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <AccountSettingsModal isOpen={isModalOpen} onClose={closeModal} /> {/* Modal component */}
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
