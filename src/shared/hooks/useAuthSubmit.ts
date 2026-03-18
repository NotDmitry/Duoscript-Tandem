import { useCallback, useState } from 'react';
import type { AuthMode, loginData, registerData } from '../types/auth.types';
import { useAuth } from './useAuth';
import { useUI } from './useUI';

export const useAuthSubmit = (mode: AuthMode) => {
  const { showToast } = useUI();
  const { registerFunc, loginFunc, updateProfileFunc } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleAuthSubmit = useCallback(
    async (formData: loginData | registerData) => {
      setIsLoading(true);
      try {
        if (mode === 'LOGIN') {
          await loginFunc(formData);
          showToast('You have successfully logged in', 'success');
          setIsSuccess(true);
        } else if (mode === 'SIGN UP' && 'repeatPassword' in formData) {
          await registerFunc(formData);
          showToast('You have successfully registered', 'success');
          setIsSuccess(true);
        } else if (mode === 'PROFILE') {
          await updateProfileFunc(formData);
          showToast('You have successfully updated profile data', 'success');
          setIsSuccess(true);
        }
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Nickname or password is incorrect';
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
