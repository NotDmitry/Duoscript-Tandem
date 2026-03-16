import {
  Box,
  Container,
  TextField,
  FormLabel,
  Button,
  Link,
  Snackbar,
  Alert,
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
  type LogInProfileFields,
  type SingUpFields,
} from '@/shared/schemas/authSchemas';
import { useAuthSubmit } from '@/shared/hooks/useAuthSubmit';
import type { AuthMode } from '@/shared/types/auth.types';

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
  const [formKey, setFormKey] = useState(0);
  const resolver: Resolver<AuthFormData> = zodResolver(schema);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<AuthFormData>({
    resolver,
    mode: 'onChange',
    defaultValues: { nickname: '', password: '', repeatPassword: '' },
  });
  const { handleAuthSubmit, isLoading, isSuccess, setIsSuccess } =
    useAuthSubmit(mode);
  const onSubmit = async (data: AuthFormData) => {
    await handleAuthSubmit(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful && isSuccess === 'true') {
      reset();
      setTimeout(() => {
        setFormKey((prev) => prev + 1);
      }, 0);
    }
  }, [isSubmitSuccessful, isSuccess, reset]);

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
          label={mode === 'PROFILE' ? 'New nickname' : 'Nickname'}
          placeholder={mode === 'PROFILE' ? 'New nickname' : 'Nickname'}
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
          key={`password-${String(formKey)}`}
          label={mode === 'PROFILE' ? 'New password' : 'Password'}
          placeholder={mode === 'PROFILE' ? 'New password' : 'Password'}
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
            key={`repeatPassword-${String(formKey)}`}
            label="Repeat Password"
            placeholder="Repeat Password"
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
      {isSuccess !== 'true' && isSuccess !== '' && (
        <Snackbar
          open={isSuccess !== 'true'}
          autoHideDuration={3000}
          onClose={() => {
            setIsSuccess('');
          }}
        >
          <Alert
            onClose={() => {
              setIsSuccess('');
            }}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {isSuccess}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
}

export default AuthForm;
