import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute — renders child routes only when the user is authenticated.
 * Unauthenticated visitors are redirected to /login.
 */
function ProtectedRoute() {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
