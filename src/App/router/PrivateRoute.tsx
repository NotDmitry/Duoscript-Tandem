import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@hooks/useAuth';
import { Loader } from '@components/Loader/Loader';

export function PrivateRoute() {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady) return <Loader />;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
