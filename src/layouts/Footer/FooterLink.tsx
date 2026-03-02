import { Link } from '@mui/material';
interface FooterLinkProps {
  linkName: string;
  linkHref: string;
}
export function FooterLink({ linkName, linkHref }: FooterLinkProps) {
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
      {linkName}
    </Link>
  );
}
