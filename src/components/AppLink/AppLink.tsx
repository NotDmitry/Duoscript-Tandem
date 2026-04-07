import { Link, useMediaQuery } from '@mui/material';
import { NavLink } from 'react-router';

interface AppLinkProps {
  linkLabel: string;
  linkHref: string;
  onClick?: () => void;
}
export function AppLink({ linkLabel, linkHref, onClick }: AppLinkProps) {
  const isMobile = useMediaQuery('(max-width:768px)');
  const isExternal = linkHref.startsWith('http');
  if (isExternal) {
    return (
      <Link
        href={linkHref}
        underline="hover"
        rel="noopener noreferrer"
        target="_blank"
        sx={{
          color: 'black',
          textTransform: 'uppercase',
          fontFamily: 'Roboto',
          padding: '14px 16px',
          fontWeight: 400,
          letterSpacing: '1px',
          fontSize: 12,
        }}
      >
        {linkLabel}
      </Link>
    );
  }
  return (
    <Link
      component={NavLink}
      to={linkHref}
      onClick={onClick}
      underline="hover"
      sx={{
        color: 'black',
        textTransform: 'uppercase',
        fontFamily: 'Roboto',
        padding: '8px',
        fontWeight: 400,
        letterSpacing: '1px',
        fontSize: { sm: isMobile ? 24 : 12, xs: 24 },
        '&.active': {
          color: 'red',
        },
      }}
    >
      {linkLabel}
    </Link>
  );
}
