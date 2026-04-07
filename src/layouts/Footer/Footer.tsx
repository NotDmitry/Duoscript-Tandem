import { Box, Container } from '@mui/material';
import { AppLink } from '@components/AppLink/AppLink';

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
        <AppLink linkLabel="RS SCHOOL" linkHref="https://rs.school/"></AppLink>
        <AppLink
          linkLabel="Dima"
          linkHref="https://github.com/NotDmitry"
        ></AppLink>
        <AppLink
          linkLabel="Sveta"
          linkHref="https://github.com/SwetlanaAng"
        ></AppLink>
        <AppLink
          linkLabel="Alena"
          linkHref="https://github.com/anelka777"
        ></AppLink>
        <AppLink
          linkLabel="Aleksei"
          linkHref="https://github.com/ngInit"
        ></AppLink>
      </Container>
    </Box>
  );
}
