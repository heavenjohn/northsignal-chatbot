import { useState } from "react";
import { db } from "../Firebase/firebaseConfig"; // Firebase configuration
import { collection, addDoc } from "firebase/firestore"; // Firestore functions
import Sidebar from "./sidebar"; // Sidebar component
import { FaUser, FaEnvelope, FaPhone, FaPhotoVideo, FaLock } from "react-icons/fa"; // Icons from react-icons

const AdminRegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [photo, setPhoto] = useState(null); // Photo file
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar visibility
  const [setPageTitle] = useState("Admin Registration");

  // Function to handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Check if all required fields are filled
    if (!firstName || !lastName || !email || !contactNumber || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      // Add new admin to Firestore
      await addDoc(collection(db, "admins"), {
        firstName,
        lastName,
        email,
        contactNumber,
        role: "Admin", // Hardcoded as Admin
        photoURL: photo ? URL.createObjectURL(photo) : null, // Simulate uploading photo
        createdAt: new Date(),
      });

      // Set success message
      setSuccess(true);
      // Reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setContactNumber("");
      setPassword("");
      setConfirmPassword("");
      setPhoto(null);

      // Auto-hide success message after 4 seconds
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError("Failed to register admin. Please try again.");
      setTimeout(() => setError(null), 4000); // Auto-hide error after 4 seconds
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
    } else {
      setError("Please upload a valid image file.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isSidebarVisible={isSidebarVisible}
        setIsSidebarVisible={setIsSidebarVisible}
        setPageTitle={setPageTitle}
      />

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-6">
        <div className="max-w-4xl w-full mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Add Admin
          </h2>

          {/* Error or Success Notification with fade-in/fade-out animation */}
          {error && (
            <p className="text-red-500 text-sm mb-4 animate-fade-in">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-sm mb-4 animate-fade-in">
              Admin registered successfully!
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <FaUser className="ml-3 text-gray-400" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full p-3 mt-2 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <FaUser className="ml-3 text-gray-400" />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full p-3 mt-2 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Email and Contact Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <FaEnvelope className="ml-3 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 mt-2 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <FaPhone className="ml-3 text-gray-400" />
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                    className="w-full p-3 mt-2 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Photo
              </label>
              <div className="flex items-center border border-gray-300 rounded-md p-3">
                <FaPhotoVideo className="text-gray-400 mr-3" />
                <input
                  type="file"
                  onChange={handlePhotoChange}
                  accept="image/*"
                  className="w-full focus:outline-none"
                />
              </div>
              {photo && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Preview"
                    className="h-24 w-24 rounded-full object-cover mx-auto"
                  />
                </div>
              )}
            </div>

            {/* Password and Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <FaLock className="ml-3 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 mt-2 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <FaLock className="ml-3 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-3 mt-2 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className={`w-full p-3 bg-blue-600 text-white rounded-md font-semibold transition-colors ${
                  loading ? "bg-gray-500 cursor-not-allowed" : "hover:bg-blue-700"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 0116 0A8 8 0 014 12z"
                      ></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminRegistrationForm;
