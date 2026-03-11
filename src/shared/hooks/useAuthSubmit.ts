import { useCallback } from 'react';
import type { loginData, registerData } from '../types/auth.types';
import { login, register } from '@/api/auth.api';

export const useAuthSubmit = (): ((
  formData: loginData | registerData
) => Promise<void>) => {
  const onSubmit = useCallback(async (formData: loginData | registerData) => {
    try {
      const userData =
        'repeatPassword' in formData
          ? await register(formData)
          : await login(formData);
      console.log(userData);
      // сообщение об успехе и редирект
    } catch {
      console.error('Incorrect nickname or password');
    }
  }, []);

  return onSubmit;
};
