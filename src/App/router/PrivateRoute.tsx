import { Navigate, Outlet } from 'react-router';
import { CircularProgress, Box } from '@mui/material';
import { useAuth } from '@hooks/useAuth';

export function PrivateRoute() {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
