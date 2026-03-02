import { Box } from '@mui/material';
import { AppLink } from '../AppLink/AppLink';
interface NavItem {
  label: string;
  href: string;
}
interface NavProps {
  isAuthorized: boolean;
}

export function Nav({ isAuthorized }: NavProps) {
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
    <Box component="nav">
      {currentLinks.map((link) => (
        <AppLink
          linkLabel={link.label}
          linkHref={link.href}
          key={link.href}
        ></AppLink>
      ))}
    </Box>
  );
}
