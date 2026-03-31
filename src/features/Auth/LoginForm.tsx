import {
  Box,
  Button,
  Container,
  FormLabel,
  Link,
  TextField,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LogInFields, logInSchema } from '@schemas/authSchemas';
import { useSubmit } from '@hooks/useSubmit';
import { useAuth } from '@hooks/useAuth';

export function LoginForm() {
  const { loginFunc } = useAuth();
  const [formKey, setFormKey] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<LogInFields>({
    resolver: zodResolver(logInSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const {
    handleSubmit: handleAuthSubmit,
    isLoading,
    isSuccess,
  } = useSubmit({
    successMessage: 'You have successfully logged in',
    errorFallback: 'Email or password is incorrect',
  });

  const onSubmit = async (data: LogInFields): Promise<void> => {
    await handleAuthSubmit(() => loginFunc(data));
  };

  useEffect(() => {
    if (isSubmitSuccessful && isSuccess) {
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
          WELCOME
        </FormLabel>

        <TextField
          label="Email"
          placeholder="Email"
          type="email"
          required
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          key={`password-${String(formKey)}`}
          label="Password"
          placeholder="Password"
          type="password"
          required
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        {isLoading ? (
          <Button
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
          >
            LOGIN
          </Button>
        ) : (
          <Button type="submit" size="large" variant="contained">
            LOGIN
          </Button>
        )}

        <Link
          component={NavLink}
          to="/register"
          underline="none"
          variant="body1"
          sx={{ mt: 3 }}
        >
          Registration
        </Link>
      </Box>
    </Container>
  );
}
