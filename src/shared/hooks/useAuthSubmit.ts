import { useCallback, useState } from 'react';
import type { loginData, registerData } from '../types/auth.types';
import { useAuth } from './useAuth';

export const useAuthSubmit = () => {
  const { registerFunc, loginFunc } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState('');
  const handleAuthSubmit = useCallback(
    async (formData: loginData | registerData) => {
      setIsLoading(true);
      try {
        if ('repeatPassword' in formData) {
          await registerFunc(formData);
        } else {
          await loginFunc(formData);
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
    [registerFunc, loginFunc]
  );

  return {
    handleAuthSubmit,
    isLoading,
    isSuccess,
    setIsSuccess,
  };
};
