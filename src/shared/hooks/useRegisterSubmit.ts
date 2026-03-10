import { useCallback } from 'react';
import type { registerData } from '../types/auth.types';
import { register } from '@/api/auth.api';

export const useRegisterSubmit = (): ((
  formData: registerData
) => Promise<void>) => {
  const onSubmit = useCallback(async (formData: registerData) => {
    try {
      const userData = await register(formData);
      console.log(userData);
      // сообщение об успехе и редирект
    } catch {
      console.error('Incorrect nickname or password');
    }
  }, []);

  return onSubmit;
};
