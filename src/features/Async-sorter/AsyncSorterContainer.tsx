import type { ReactNode } from 'react';
import { Typography, Container } from '@mui/material';

export default function AsyncSorterContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Container
      maxWidth="sm"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        sx={{ textAlign: 'center', m: 2 }}
      >
        Async Sorter
      </Typography>
      {children}
    </Container>
  );
}
