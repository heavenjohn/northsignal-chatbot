import { useState, useEffect } from "react";
import { db, auth } from "../Firebase/firebaseConfig"; // Firebase configuration
import { collection, addDoc } from "firebase/firestore"; // Firestore functions
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase Authentication
import Sidebar from "./sidebar"; // Sidebar component
import { FaUser, FaEnvelope } from "react-icons/fa"; // Only used icons
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminRegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    document.title = "Admin Registration";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation checks
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!firstName || !lastName || !email || !contactNumber || !address || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add admin details to Firestore
      await addDoc(collection(db, "admins"), {
        firstName,
        lastName,
        email,
        contactNumber,
        address,
        role: "Admin",
        createdAt: new Date(),
        uid: user.uid, // Link Firestore record with Authentication user
      });

      toast.success("Admin registered successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setContactNumber("");
      setAddress("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already in use.");
      } else {
        toast.error("Failed to register admin. Please try again.");
      }
      console.error("Error during registration:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isSidebarVisible={isSidebarVisible}
        setIsSidebarVisible={setIsSidebarVisible}
        setPageTitle={(title) => (document.title = title)}
      />

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-6">
        <div className="max-w-4xl w-full mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Add Admin
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <FaUser className="ml-3 text-gray-400" />
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full p-3 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <FaUser className="ml-3 text-gray-400" />
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full p-3 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <FaEnvelope className="ml-3 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 focus:outline-none"
                />
              </div>
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                id="contactNumber"
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            {/* Password and Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className={`w-full p-3 bg-primary text-white rounded-md font-semibold ${
                  loading ? "bg-gray-500 cursor-not-allowed" : "hover:bg-blue-700"
                }`}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register Admin"}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Toast Notification */}
      <ToastContainer />
    </div>
  );
};

export default AdminRegistrationForm;