import { Box, CircularProgress } from '@mui/material';

interface LoaderProps {
  padding?: number;
  ariaLabel?: string;
}

export function Loader({
  padding = 6,
  ariaLabel = 'Loading in progress',
}: LoaderProps) {
  return (
    <Box display="flex" justifyContent="center" p={padding}>
      <CircularProgress aria-label={ariaLabel} />
    </Box>
  );
}
