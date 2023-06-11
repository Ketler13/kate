import { Navigate, Outlet } from 'react-router-dom';

import { useAuthState } from '../Auth';

function AnonymousRoute({ children }) {
  const { user } = useAuthState();

  if (user) {
    return  <Navigate to="/dashboard" />
  }

  return children ? children : <Outlet />;
}

export default AnonymousRoute;
