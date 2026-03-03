import { Logo } from '@/components/Logo/Logo';
import { Nav } from '@/components/Nav/Nav';
import { Box } from '@mui/material';

interface NavProps {
  isAuthorized: boolean;
}

export function Header({ isAuthorized }: NavProps) {
  return (
    <Box
      component="header"
      sx={{ display: 'flex', p: 2, justifyContent: 'space-between' }}
    >
      <Logo />
      <Nav isAuthorized={isAuthorized}></Nav>
    </Box>
  );
}
