import { Logo } from '@components/Logo/Logo';
import { Nav } from '@components/Nav/Nav';
import { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import DragHandleTwoToneIcon from '@mui/icons-material/DragHandleTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { useAuth } from '@hooks/useAuth';

export function Header() {
  const { user } = useAuth();
  const isMobile = useMediaQuery('(max-width:768px)');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <Box
      component="header"
      sx={{ display: 'flex', p: 2, justifyContent: 'space-between' }}
    >
      <Logo />
      {isMobile ? (
        <>
          {mobileMenuOpen ? (
            <CloseTwoToneIcon sx={{ p: 1 }} onClick={toggleMobileMenu} />
          ) : (
            <DragHandleTwoToneIcon sx={{ p: 1 }} onClick={toggleMobileMenu} />
          )}
          <Box
            sx={{
              position: 'fixed',
              right: 0,
              top: '60px',
              height: 'calc(100vh - 60px)',
              width: '100vw',
              backgroundColor: 'white',
              transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 300ms ease-in-out',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <Nav isAuthorized={!!user} closeMobileMenu={closeMobileMenu} />
          </Box>
        </>
      ) : (
        <Nav isAuthorized={!!user} />
      )}
    </Box>
  );
}
