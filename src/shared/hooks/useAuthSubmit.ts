import { useCallback, useState } from 'react';
import type {
  AuthMode,
  LoginData,
  RegisterData,
  UpdateProfileData,
} from '@/shared/types/auth.types';
import { useAuth } from './useAuth';
import { useUI } from './useUI';

const FALLBACK_ERROR_MESSAGES: Record<AuthMode, string> = {
  LOGIN: 'Email or password is incorrect',
  'SIGN UP': 'Registration failed',
  PROFILE: 'Failed to update profile',
};

export const useAuthSubmit = (mode: AuthMode) => {
  const { showToast } = useUI();
  const { registerFunc, loginFunc, updateProfileFunc } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAuthSubmit = useCallback(
    async (formData: LoginData | RegisterData | UpdateProfileData) => {
      setIsLoading(true);
      try {
        if (mode === 'LOGIN') {
          await loginFunc(formData as LoginData);
          showToast('You have successfully logged in', 'success');
        } else if (mode === 'SIGN UP' && 'repeatPassword' in formData) {
          await registerFunc(formData);
          showToast('You have successfully registered', 'success');
        } else if (mode === 'PROFILE') {
          await updateProfileFunc(formData as UpdateProfileData);
          showToast('You have successfully updated profile data', 'success');
        }
        setIsSuccess(true);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : FALLBACK_ERROR_MESSAGES[mode];
        showToast(message, 'error');
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    },
    [registerFunc, loginFunc, updateProfileFunc, mode, showToast]
  );

  return {
    handleAuthSubmit,
    isLoading,
    isSuccess,
    setIsSuccess,
  };
};
