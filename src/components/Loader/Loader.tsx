import { Box, CircularProgress } from '@mui/material';

interface LoaderProps {
  p?: number;
}

export function Loader({ p = 6 }: LoaderProps) {
  return (
    <Box display="flex" justifyContent="center" p={p}>
      <CircularProgress />
    </Box>
  );
}
