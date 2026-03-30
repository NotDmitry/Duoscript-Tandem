import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@hooks/useAuth';

export function PublicOnlyRoute() {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : <Outlet />;
}
