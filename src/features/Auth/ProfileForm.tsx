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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ProfileFields, profileSchema } from '@schemas/authSchemas';
import { useSubmit } from '@hooks/useSubmit';
import { useAuth } from '@hooks/useAuth';

interface ProfileFormProps {
  displayName: string;
  onUpdate: (newDisplayName: string) => void;
}

export function ProfileForm({ displayName, onUpdate }: ProfileFormProps) {
  const { updateProfileFunc, logout } = useAuth();
  const [formKey, setFormKey] = useState(0);
  const isMobile = useMediaQuery('(max-width:768px)');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ProfileFields>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: { email: '', displayName: '', password: '' },
  });

  const {
    handleSubmit: handleAuthSubmit,
    isLoading,
    isSuccess,
  } = useSubmit({
    successMessage: 'You have successfully updated profile data',
    errorFallback: 'Failed to update profile',
  });

  const onSubmit = async (data: ProfileFields): Promise<void> => {
    await handleAuthSubmit(() => updateProfileFunc(data));
    onUpdate(data.displayName);
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
          label="New email"
          placeholder="New email"
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
          label="New username"
          placeholder="New username"
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
          label="New password"
          placeholder="New password"
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
            SAVE
          </Button>
        ) : (
          <Button type="submit" size="large" variant="contained">
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
