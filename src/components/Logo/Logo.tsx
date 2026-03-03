import { Stack, Typography } from '@mui/material';
import { LogoIcon } from './LogoIcon';
import { NavLink } from 'react-router';

export function Logo() {
  return (
    <Stack
      component={NavLink}
      to="/"
      direction="row"
      spacing={1}
      sx={{ px: 1, textDecoration: 'none' }}
    >
      <LogoIcon />
      <Typography
        sx={{
          textDecoration: 'none',
          color: 'black',
          textTransform: 'uppercase',
          fontFamily: 'Roboto',
          fontWeight: 400,
          letterSpacing: '1px',
          fontSize: 12,
        }}
      >
        Duoscript-Tandem
      </Typography>
    </Stack>
  );
}
