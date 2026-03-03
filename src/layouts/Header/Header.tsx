import { Logo } from '@/components/Logo/Logo';
import { Nav } from '@/components/Nav/Nav';
import { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import DragHandleTwoToneIcon from '@mui/icons-material/DragHandleTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

interface NavProps {
  isAuthorized: boolean;
}

export function Header({ isAuthorized }: NavProps) {
  const isMobile = useMediaQuery('(max-width:768px)');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
            <CloseTwoToneIcon
              onClick={() => {
                toggleMobileMenu();
              }}
            />
          ) : (
            <DragHandleTwoToneIcon
              onClick={() => {
                toggleMobileMenu();
              }}
            />
          )}
        </>
      ) : (
        <Nav isAuthorized={isAuthorized} />
      )}
    </Box>
  );
}
