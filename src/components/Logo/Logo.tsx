import { Stack, Typography } from '@mui/material';
import { LogoIcon } from './LogoIcon';

export function Logo() {
  return (
    <Stack direction="row" spacing={1} sx={{ px: 1 }}>
      <LogoIcon />
      <Typography
        sx={{
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
