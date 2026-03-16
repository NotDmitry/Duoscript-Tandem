import { useCallback, useState } from 'react';
import type { AuthMode, loginData, registerData } from '../types/auth.types';
import { useAuth } from './useAuth';

export const useAuthSubmit = (mode: AuthMode) => {
  const { registerFunc, loginFunc, updateProfileFunc } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState('');
  const handleAuthSubmit = useCallback(
    async (formData: loginData | registerData) => {
      setIsLoading(true);
      try {
        if (mode === 'LOGIN') {
          await loginFunc(formData);
        } else if (mode === 'SIGN UP' && 'repeatPassword' in formData) {
          await registerFunc(formData);
        } else if (mode === 'PROFILE') {
          await updateProfileFunc(formData);
        }
        setIsSuccess('true');
      } catch (err) {
        setIsSuccess(
          err instanceof Error
            ? err.message
            : 'Nickname or password is incorrect'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [registerFunc, loginFunc, updateProfileFunc, mode]
  );

  return {
    handleAuthSubmit,
    isLoading,
    isSuccess,
    setIsSuccess,
  };
};
