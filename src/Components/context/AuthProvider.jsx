import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Clean up the subscription on unmount
  }, []);

  const login = () => {
    // Optional: Add additional login logic
  };

  const logout = async () => {
    await auth.signOut();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Add PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
