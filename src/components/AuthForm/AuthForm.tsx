import {
  Box,
  Container,
  TextField,
  FormLabel,
  Button,
  Link,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import type { Resolver } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  logInSchema,
  profileSchema,
  signUpSchema,
  type LogInFields,
  type SignUpFields,
  type ProfileFields,
} from '@/shared/schemas/authSchemas';
import { useAuthSubmit } from '@/shared/hooks/useAuthSubmit';
import { useAuth } from '@/shared/hooks/useAuth';
import type { AuthMode } from '@/shared/types/auth.types';

interface FormInterface {
  mode: AuthMode;
  profileTitle?: string;
  onProfileUpdate?: (newDisplayName: string) => void;
}

type AuthFormData = LogInFields | SignUpFields | ProfileFields;

const getTitle = ({ mode, profileTitle }: FormInterface): string => {
  switch (mode) {
    case 'LOGIN':
      return 'WELCOME';
    case 'SIGN UP':
      return 'NEW PROFILE';
    case 'PROFILE':
      return profileTitle ?? 'PROFILE';
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

function AuthForm({ mode, profileTitle, onProfileUpdate }: FormInterface) {
  const schema = getAuthSchema(mode);
  const [formKey, setFormKey] = useState(0);
  const resolver: Resolver<AuthFormData> = zodResolver(schema);
  const { logout } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<AuthFormData>({
    resolver,
    mode: 'onChange',
    defaultValues:
      mode === 'SIGN UP'
        ? { email: '', displayName: '', password: '', repeatPassword: '' }
        : mode === 'PROFILE'
          ? { email: '', displayName: '', password: '' }
          : { email: '', password: '' },
  });

  const { handleAuthSubmit, isLoading, isSuccess } = useAuthSubmit(mode);

  const onSubmit = async (data: AuthFormData): Promise<void> => {
    await handleAuthSubmit(data);
    if (onProfileUpdate && 'displayName' in data) {
      onProfileUpdate(data.displayName);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful && isSuccess) {
      reset();
      setTimeout(() => {
        setFormKey((prev) => prev + 1);
      }, 0);
    }
  }, [isSubmitSuccessful, isSuccess, reset]);

  const emailError = 'email' in errors ? errors.email?.message : undefined;
  const passwordError =
    'password' in errors ? errors.password?.message : undefined;
  const displayNameError =
    'displayName' in errors ? errors.displayName?.message : undefined;
  const repeatPasswordError =
    'repeatPassword' in errors ? errors.repeatPassword?.message : undefined;

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        role="form"
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
          label={mode === 'PROFILE' ? 'New email' : 'Email'}
          placeholder={mode === 'PROFILE' ? 'New email' : 'Email'}
          type="email"
          required
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          {...register('email')}
          error={!!emailError}
          helperText={emailError}
        />

        {(mode === 'SIGN UP' || mode === 'PROFILE') && (
          <TextField
            label={mode === 'PROFILE' ? 'New display name' : 'Display name'}
            placeholder={
              mode === 'PROFILE' ? 'New display name' : 'Display name'
            }
            type="text"
            required
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            {...register('displayName')}
            error={!!displayNameError}
            helperText={displayNameError}
          />
        )}

        <TextField
          key={`password-${String(formKey)}`}
          label={mode === 'PROFILE' ? 'New password' : 'Password'}
          placeholder={mode === 'PROFILE' ? 'New password' : 'Password'}
          type="password"
          required
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          {...register('password')}
          error={!!passwordError}
          helperText={passwordError}
        />

        {mode === 'SIGN UP' && (
          <TextField
            key={`repeatPassword-${String(formKey)}`}
            label="Repeat Password"
            placeholder="Repeat Password"
            type="password"
            required
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            {...register('repeatPassword')}
            error={!!repeatPasswordError}
            helperText={repeatPasswordError}
          />
        )}

        {isLoading ? (
          <Button
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
          >
            {mode === 'PROFILE' ? 'SAVE' : mode}
          </Button>
        ) : (
          <Button type="submit" size="large" variant="contained">
            {mode === 'PROFILE' ? 'SAVE' : mode}
          </Button>
        )}

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
            type="button"
            size="small"
            color="error"
            variant="contained"
            sx={{ mt: 2 }}
            onClick={logout}
          >
            SIGN OUT
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default AuthForm;
