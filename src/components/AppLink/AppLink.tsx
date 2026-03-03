import { Link } from '@mui/material';
import { NavLink } from 'react-router';

interface AppLinkProps {
  linkLabel: string;
  linkHref: string;
}
export function AppLink({ linkLabel, linkHref }: AppLinkProps) {
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
      underline="hover"
      sx={{
        color: 'black',
        textTransform: 'uppercase',
        fontFamily: 'Roboto',
        padding: '14px 16px',
        fontWeight: 400,
        letterSpacing: '1px',
        fontSize: 12,
        '&.active': {
          color: 'red',
        },
      }}
    >
      {linkLabel}
    </Link>
  );
}
