import { useCallback, useState } from 'react';
import type { loginData, registerData } from '../types/auth.types';
import { login, register } from '@/api/auth.api';

export const useAuthSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState('');
  const handleAuthSubmit = useCallback(
    async (formData: loginData | registerData) => {
      setIsLoading(true);
      try {
        const userData =
          'repeatPassword' in formData
            ? await register(formData)
            : await login(formData);
        console.log(userData);
        setIsSuccess('true');
        //  редирект
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
    []
  );

  return {
    handleAuthSubmit,
    isLoading,
    isSuccess,
    setIsSuccess,
  };
};
