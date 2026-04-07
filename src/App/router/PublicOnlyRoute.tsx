import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@hooks/useAuth';
import { Loader } from '@components/Loader/Loader';

export function PublicOnlyRoute() {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady) return <Loader />;

  return user ? <Navigate to="/" replace /> : <Outlet />;
}
