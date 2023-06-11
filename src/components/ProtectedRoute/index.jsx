import { Navigate, Outlet } from 'react-router-dom';

import { useAuthState } from '../Auth';

function ProtectedRoute({ children }) {
  const { user } = useAuthState();

  if (!user) {
    return  <Navigate to="/signin" />
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;