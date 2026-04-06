import { Box, CircularProgress } from '@mui/material';

interface LoaderProps {
  p?: number;
  ariaLabel?: string;
}

export function Loader({
  p = 6,
  ariaLabel = 'Loading in progress',
}: LoaderProps) {
  return (
    <Box display="flex" justifyContent="center" p={p}>
      <CircularProgress aria-label={ariaLabel} />
    </Box>
  );
}
