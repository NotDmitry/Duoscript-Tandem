import { useCallback, useState } from 'react';
import type { loginData, registerData } from '../types/auth.types';
import { login, register } from '@/api/auth.api';

export const useAuthSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleAuthSubmit = useCallback(
    async (formData: loginData | registerData) => {
      setIsLoading(true);
      try {
        const userData =
          'repeatPassword' in formData
            ? await register(formData)
            : await login(formData);
        console.log(userData);
        // сообщение об успехе и редирект
      } catch {
        console.error('Incorrect nickname or password');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    handleAuthSubmit,
    isLoading,
  };
};
