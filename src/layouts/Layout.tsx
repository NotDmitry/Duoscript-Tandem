import { Outlet } from 'react-router';
import { Footer } from '@/layouts/Footer/Footer.tsx';
import { Header } from './Header/Header';
import { Box } from '@mui/material';

function Layout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
