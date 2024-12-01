import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import PropTypes from "prop-types"; // Import PropTypes

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Redirect to login if no user is authenticated
    return <Navigate to="/admin" replace />;
  }

  // Render children if user is authenticated
  return children;
};

// Add PropTypes validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
