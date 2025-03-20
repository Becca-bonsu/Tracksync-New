import { Navigate } from 'react-router-dom';
import roles from '../config/roles';

const ProtectedRoute = ({ children, allowedUserType }) => {
  const userType = localStorage.getItem('userType'); // Get user type from local storage
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Check if the user is authenticated and has the required role
  if (!isAuthenticated || (allowedUserType && userType !== allowedUserType)) {
    return <Navigate to="/login" replace />;
  }

  return children; // Render the children if the user is authenticated and has the right role
};

export default ProtectedRoute; 