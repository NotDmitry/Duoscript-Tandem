import {
  Box,
  Container,
  TextField,
  FormLabel,
  Button,
  Link,
} from '@mui/material';
import { NavLink } from 'react-router';
import type { Resolver } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  logInSchema,
  profileSchema,
  signUpSchema,
  type LogInProfileFields,
  type SingUpFields,
} from '@/shared/schemas/authSchemas';
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
const getAuthSchema = (mode: AuthMode) => {
  switch (mode) {
    case 'LOGIN':
      return logInSchema;
    case 'SIGN UP':
      return signUpSchema;
    case 'PROFILE':
      return profileSchema;
  }
};

function AuthForm({ mode, profileTitle }: FormInterface) {
  const schema = getAuthSchema(mode);
  type AuthFormData = LogInProfileFields | SingUpFields;
  const resolver: Resolver<AuthFormData> = zodResolver(schema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({ resolver });
  const onSubmit = (data: AuthFormData) => {
    console.log(data);
  };

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
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}
      >
        <FormLabel sx={{ fontSize: 36, color: 'black', mb: '24px' }}>
          {getTitle({ mode, profileTitle })}
        </FormLabel>
        <TextField
          label={mode === 'PROFILE' ? 'New nickname' : 'Nickname'}
          type="text"
          required
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          {...register('nickname')}
          error={!!errors.nickname}
          helperText={errors.nickname?.message}
        />

        <TextField
          label={mode === 'PROFILE' ? 'New password' : 'Password'}
          type="password"
          required
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        {mode === 'SIGN UP' && (
          <TextField
            label="Repeat Password"
            type="password"
            required
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            {...register('repeatPassword')}
            error={!!('repeatPassword' in errors && errors.repeatPassword)}
            helperText={
              'repeatPassword' in errors ? errors.repeatPassword?.message : null
            }
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
