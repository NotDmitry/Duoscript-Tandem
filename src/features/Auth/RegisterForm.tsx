import { Box, Button, Container, FormLabel, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SignUpFields, signUpSchema } from '@schemas/authSchemas';
import { useSubmit } from '@hooks/useSubmit';
import { useAuth } from '@hooks/useAuth';

export function RegisterForm() {
  const { registerFunc } = useAuth();
  const [formKey, setFormKey] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpFields>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      displayName: '',
      password: '',
      repeatPassword: '',
    },
  });

  const {
    handleSubmit: handleAuthSubmit,
    isLoading,
    isSuccess,
  } = useSubmit({
    successMessage: 'You have successfully registered',
    errorFallback: 'Registration failed',
  });

  const onSubmit = async (data: SignUpFields): Promise<void> => {
    await handleAuthSubmit(() => registerFunc(data));
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
          NEW PROFILE
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
          label="Display name"
          placeholder="Display name"
          type="text"
          required
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          {...register('displayName')}
          error={!!errors.displayName}
          helperText={errors.displayName?.message}
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
          error={!!errors.repeatPassword}
          helperText={errors.repeatPassword?.message}
        />

        {isLoading ? (
          <Button
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
          >
            SIGN UP
          </Button>
        ) : (
          <Button type="submit" size="large" variant="contained">
            SIGN UP
          </Button>
        )}
      </Box>
    </Container>
  );
}
