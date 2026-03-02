import { Link } from '@mui/material';
interface AppLinkProps {
  linkLabel: string;
  linkHref: string;
}
export function AppLink({ linkLabel, linkHref }: AppLinkProps) {
  return (
    <Link
      href={linkHref}
      underline="none"
      rel="noopener noreferrer"
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
