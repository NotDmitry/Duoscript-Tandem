import { Box, Button, useMediaQuery } from '@mui/material';
import { AppLink } from '../AppLink/AppLink';
import { useAuth } from '@/shared/hooks/useAuth';
import { useState } from 'react';
interface NavItem {
  label: string;
  href: string;
}
interface NavProps {
  isAuthorized: boolean;
  closeMobileMenu?: () => void;
}

export function Nav({ isAuthorized, closeMobileMenu }: NavProps) {
  const { logout } = useAuth();
  const isMobile = useMediaQuery('(max-width:768px)');
  const publicLinks: NavItem[] = [
    { label: 'About', href: '/about' },
    { label: 'Login', href: '/login' },
  ];

  const privateLinks: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'About', href: '/about' },
    { label: 'Library', href: '/library' },
    { label: 'Profile', href: '/profile' },
  ];

  const currentLinks: NavItem[] = isAuthorized ? privateLinks : publicLinks;
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        flexDirection: { sm: isMobile ? 'column' : 'row', xs: 'column' },
        alignItems: 'center',
      }}
    >
      {currentLinks.map((link) => (
        <AppLink
          onClick={closeMobileMenu}
          linkLabel={link.label}
          linkHref={link.href}
          key={link.href}
        ></AppLink>
      ))}
      {isAuthorized && (
        <Button
          variant="text"
          onClick={() => {
            void handleClick();
          }}
          disabled={loading}
        >
          logOut
        </Button>
      )}
    </Box>
  );
}
