import {
  Box,
  Button,
  Container,
  FormLabel,
  TextField,
  useMediaQuery,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ProfileFields, profileSchema } from '@schemas/authSchemas';
import { useSubmit } from '@hooks/useSubmit';
import { useAuth } from '@hooks/useAuth';

export function ProfileForm() {
  const { user, updateProfileFunc, logout } = useAuth();
  const displayName = user?.displayName ?? '';
  const email = user?.email ?? '';
  const [formKey, setFormKey] = useState(0);
  const isMobile = useMediaQuery('(max-width:768px)');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ProfileFields>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: { email, displayName, password: '' },
  });

  const {
    handleSubmit: handleAuthSubmit,
    isLoading,
    isSuccess,
  } = useSubmit({
    successMessage: 'Profile updated successfully',
    errorFallback: 'Failed to update profile',
  });

  const watched = useWatch({ control });
  const hasChanges =
    (watched.email !== '' && watched.email !== email) ||
    (watched.displayName !== '' && watched.displayName !== displayName) ||
    watched.password !== '';

  const onSubmit = async (data: ProfileFields): Promise<void> => {
    const updates = {
      ...(data.email !== email ? { email: data.email } : {}),
      ...(data.displayName !== displayName
        ? { displayName: data.displayName }
        : {}),
      ...(data.password ? { password: data.password } : {}),
    };
    await handleAuthSubmit(() => updateProfileFunc(updates));
  };

  useEffect(() => {
    if (isSubmitSuccessful && isSuccess) {
      reset({
        email: watched.email ?? email,
        displayName: watched.displayName ?? displayName,
        password: '',
      });
      setTimeout(() => {
        setFormKey((prev) => prev + 1);
      }, 0);
    }
  }, [
    isSubmitSuccessful,
    isSuccess,
    reset,
    email,
    displayName,
    watched.email,
    watched.displayName,
  ]);

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        role="form"
        noValidate
        sx={{
          p: isMobile ? 0 : '0 40px',
          m: '60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}
      >
        <FormLabel
          sx={{ fontSize: isMobile ? 30 : 36, color: 'black', mb: '24px' }}
        >
          {displayName}
        </FormLabel>

        <TextField
          key={`email-${String(formKey)}`}
          label="Email"
          placeholder="Email"
          type="email"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Username"
          placeholder="Username"
          type="text"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          {...register('displayName')}
          error={!!errors.displayName}
          helperText={errors.displayName?.message}
        />

        <TextField
          key={`password-${String(formKey)}`}
          label="New password"
          placeholder="New password"
          type="password"
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
            SAVE
          </Button>
        ) : (
          <Button
            type="submit"
            size="large"
            variant="contained"
            disabled={!hasChanges}
          >
            SAVE
          </Button>
        )}

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
      </Box>
    </Container>
  );
}
