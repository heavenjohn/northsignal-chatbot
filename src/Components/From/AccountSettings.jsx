import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider"; 
import { updateProfile, updateEmail, updatePassword } from "firebase/auth"; 
import { auth } from "../Firebase/firebaseConfig"; 
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"; 
import PropTypes from "prop-types"; 

const AccountSettingsModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName || "");
      setMiddleName(currentUser.middleName || "");
      setLastName(currentUser.lastName || "");
      setEmail(currentUser.email || "");
    }
  }, [currentUser]);

//   const handleAvatarChange = (e) => {
//     setAvatar(e.target.files[0]);
//   };

  const reauthenticateUser = async () => {
    const user = auth.currentUser;
    const credentials = EmailAuthProvider.credential(
      user.email, 
      prompt("Enter your password for reauthentication")
    );
    try {
      await reauthenticateWithCredential(user, credentials);
      return true;
    } catch (err) {
      setError("Reauthentication failed. " + err.message);
      return false;
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (currentUser) {
        const reauthenticated = await reauthenticateUser();
        if (!reauthenticated) return;

        if (firstName !== currentUser.firstName || middleName !== currentUser.middleName || lastName !== currentUser.lastName) {
          await updateProfile(auth.currentUser, {
            displayName: `${firstName} ${middleName} ${lastName}`,
          });
        }

        if (email !== currentUser.email) {
          await updateEmail(auth.currentUser, email);
        }
        if (password) {
          await updatePassword(auth.currentUser, password);
        }
        // if (avatar) {
        //   // Handle avatar upload (e.g., upload to Firebase Storage and update profile)
        // }

        setSuccess("Profile updated successfully!");
      }
    } catch (err) {
      setError("Failed to update profile. " + err.message);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 ${isOpen ? "flex" : "hidden"} justify-center items-center z-50`}>
      <div className="bg-white p-8 rounded-lg w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Manage Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Middle Name</label>
            <input
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Leave blank to keep current password"
            />
          </div>
          {/* <div>
            <label className="block font-medium mb-1">Avatar</label>
            <input
              type="file"
              onChange={handleAvatarChange}
              className="w-full p-2 border rounded"
            />
          </div> */}
          <div className="mt-4">
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AccountSettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AccountSettingsModal;
