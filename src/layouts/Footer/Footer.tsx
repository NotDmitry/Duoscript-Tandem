import { Box, Container } from '@mui/material';
import { FooterLink } from './FooterLink';

export function Footer() {
  return (
    <Box component="footer" sx={{ p: 2 }}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          flexDirection: { sm: 'row', xs: 'column' },
        }}
      >
        <FooterLink
          linkName="RS SCHOOL"
          linkHref="https://rs.school/"
        ></FooterLink>
        <FooterLink
          linkName="Dima"
          linkHref="https://github.com/NotDmitry"
        ></FooterLink>
        <FooterLink
          linkName="Sveta"
          linkHref="https://github.com/SwetlanaAng"
        ></FooterLink>
        <FooterLink
          linkName="Alena"
          linkHref="https://github.com/anelka777"
        ></FooterLink>
        <FooterLink
          linkName="Aleksei"
          linkHref="https://github.com/ngInit"
        ></FooterLink>
      </Container>
    </Box>
  );
}
