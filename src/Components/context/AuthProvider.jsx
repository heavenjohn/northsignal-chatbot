import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { onAuthStateChanged, signOut } from "firebase/auth"; // Add signOut import
import { auth } from "../Firebase/firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check user authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);  // Set the current user when auth state changes
      setLoading(false); // Set loading to false after the auth state is determined
    }, (error) => {
      console.error("Error checking auth state", error); // Log errors if any
      setLoading(false); // Set loading to false even in case of errors
    });

    return unsubscribe; // Clean up the listener on component unmount
  }, []);

  // Optional login function (can be used for custom login logic)
  const login = async () => {
    // Optional: Implement login logic (e.g., email/password or OAuth login)
    console.log("Login function called"); // Placeholder for future implementation
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth); // Firebase logout
      setCurrentUser(null); // Clear currentUser state
    } catch (error) {
      console.error("Error logging out", error); // Handle logout errors
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {!loading && children} {/* Only render children once loading is false */}
    </AuthContext.Provider>
  );
};

// PropTypes validation to ensure that children is a valid React node
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
