import { useCallback } from 'react';
import type { loginData } from '../types/auth.types';
import { login } from '@/api/auth.api';

export const useLoginSubmit = (): ((formData: loginData) => Promise<void>) => {
  const onSubmit = useCallback(async (formData: loginData) => {
    try {
      const userData = await login(formData);
      console.log(userData);
      // сообщение об успехе и редирект
    } catch {
      console.error('Incorrect nickname or password');
    }
  }, []);

  return onSubmit;
};
