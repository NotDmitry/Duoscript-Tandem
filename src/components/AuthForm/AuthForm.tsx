import {
  Box,
  Container,
  TextField,
  FormLabel,
  Button,
  Link,
} from '@mui/material';
import { NavLink } from 'react-router';
type AuthMode = 'LOGIN' | 'SIGN UP' | 'PROFILE';

interface FormInterface {
  mode: AuthMode;
  profileTitle?: string;
}

const getTitle = ({ mode, profileTitle }: FormInterface) => {
  switch (mode) {
    case 'LOGIN':
      return 'WELCOME';
    case 'SIGN UP':
      return 'NEW PROFILE';
    case 'PROFILE':
      return profileTitle;
  }
};

function AuthForm({ mode, profileTitle }: FormInterface) {
  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        noValidate
        sx={{
          p: '0 40px',
          m: '60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <FormLabel sx={{ fontSize: 36, color: 'black', mb: '24px' }}>
          {getTitle({ mode, profileTitle })}
        </FormLabel>
        <TextField
          label={mode === 'PROFILE' ? 'New nikname' : 'Nikname'}
          type="text"
          required
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <TextField
          label={mode === 'PROFILE' ? 'New password' : 'Password'}
          type="password"
          required
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        {mode === 'SIGN UP' && (
          <TextField
            label="Repeat Password"
            type="password"
            required
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
        )}
        <Button type="submit" size="large" variant="contained">
          {mode === 'PROFILE' ? 'SAVE' : mode}
        </Button>
        {mode === 'LOGIN' && (
          <Link
            component={NavLink}
            to="/register"
            underline="none"
            variant="body1"
            sx={{ mt: 3 }}
          >
            Registration
          </Link>
        )}
        {mode === 'PROFILE' && (
          <Button
            type="submit"
            size="small"
            color="error"
            variant="contained"
            sx={{ mt: 2 }}
          >
            SIGN OUT
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default AuthForm;
