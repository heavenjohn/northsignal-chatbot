import { useState } from "react";
import { FaCamera, FaSave, FaTimes } from "react-icons/fa"; // Import Icons for UI
import { updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth, storage } from "../Firebase/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import PropTypes from 'prop-types'; // Import PropTypes

const ManageAccountModal = ({ isOpen, onClose }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReauthenticate = async () => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, password);
    try {
      await reauthenticateWithCredential(user, credential);
      return true;
    } catch {
      setError("Incorrect password.");
      return false;
    }
  };

  const handleUpdateEmail = async () => {
    if (!email) return setError("Email is required.");
    const isReauthenticated = await handleReauthenticate();
    if (isReauthenticated) {
      try {
        await updateEmail(auth.currentUser, email);
        setSuccess("Email updated successfully.");
      } catch {
        setError("Failed to update email.");
      }
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword !== confirmPassword) return setError("Passwords do not match.");
    const isReauthenticated = await handleReauthenticate();
    if (isReauthenticated) {
      try {
        await updatePassword(auth.currentUser, newPassword);
        setSuccess("Password updated successfully.");
      } catch {
        setError("Failed to update password.");
      }
    }
  };

  const handleProfilePicChange = async () => {
    if (!profilePic) return setError("Profile picture is required.");
    const user = auth.currentUser;
    const storageRef = ref(storage, `profile_pics/${user.uid}`);
    try {
      await uploadBytes(storageRef, profilePic);
      setSuccess("Profile picture updated successfully.");
    } catch {
      setError("Failed to upload profile picture.");
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 z-10 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        {/* Close Icon */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
          <FaTimes className="text-xl" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Manage Account</h2>

        {/* Error and Success Messages */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        {/* Profile Picture */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Profile Picture</label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleProfilePicChange}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaCamera />
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter first name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter last name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Contact Number</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter contact number"
          />
        </div>

        {/* Password and Confirm Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Current Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter current password"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter new password"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Confirm new password"
          />
        </div>

        {/* Save Changes Button */}
        <button
          onClick={() => {
            handleUpdateEmail();
            handleUpdatePassword();
          }}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full mt-4"
        >
          <FaSave className="inline-block mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  ) : null;
};

// Prop validation
ManageAccountModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ManageAccountModal;
