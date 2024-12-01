import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap the application and provide authentication state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('auth') === 'true'  // Check if user is authenticated on page load
  );

  // Login function to set the user as authenticated
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('auth', 'true');  // Store authentication in localStorage
  };

  // Logout function to remove the authentication state
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth');  // Remove authentication from localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Prop validation for `children` prop
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,  // Validate that children is required
};

// useAuth hook to access authentication state and actions
export const useAuth = () => useContext(AuthContext);
