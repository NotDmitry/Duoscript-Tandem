import { Box, useMediaQuery } from '@mui/material';
import { AppLink } from '../AppLink/AppLink';
import { useAuth } from '@/shared/hooks/useAuth';
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

  return (
    <Box
      role="navigation"
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
        <AppLink
          onClick={() => {
            if (closeMobileMenu) closeMobileMenu();
            logout();
          }}
          linkLabel="logOut"
          linkHref="/login"
        ></AppLink>
      )}
    </Box>
  );
}
