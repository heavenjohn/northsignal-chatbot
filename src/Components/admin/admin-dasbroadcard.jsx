import { useEffect, useState } from "react";
import { FaUserShield } from "react-icons/fa"; // Example Icon
import { db } from "../Firebase/firebaseConfig"; // Firebase config
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // For navigation

const AdminDashboardCard = () => {
  const [adminCount, setAdminCount] = useState(0);
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    const fetchAdminCount = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "admins"));
        setAdminCount(querySnapshot.size); // Get the total number of documents
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminCount();
  }, []);

  // Handle click event
  const handleClick = () => {
    navigate("/adminList"); // Navigate to the admins page
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between w-full hover:shadow-xl transition-shadow duration-200 focus:outline-none"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Total Admins</h3>
        <p className="text-3xl font-bold text-blue-500">{adminCount}</p>
      </div>
      <div className="p-4 bg-blue-100 rounded-full">
        <FaUserShield className="text-primary text-3xl" />
      </div>
    </button>
  );
};

export default AdminDashboardCard;
