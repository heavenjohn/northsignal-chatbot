import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider"; // Import the useAuth hook
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth(); // Get currentUser and loading from AuthContext

  // If loading is true, we return null or a loading indicator (optional)
  if (loading) {
    return null; // Or you can return a loading spinner component here
  }

  // If there's no user, redirect to the login page ("/admin" or "/login")
  if (!currentUser) {
    return <Navigate to="/admin" />; // Change "/admin" to the correct login route
  }

  // If the user is authenticated, render the protected children
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
