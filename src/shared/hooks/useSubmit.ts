import { useCallback, useState } from 'react';
import { useUI } from './useUI';

interface UseAuthSubmitOptions {
  successMessage: string;
  errorFallback?: string;
}

export const useSubmit = ({
  successMessage,
  errorFallback,
}: UseAuthSubmitOptions) => {
  const { showToast } = useUI();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (action: () => Promise<void>) => {
      setIsLoading(true);
      try {
        await action();
        showToast(successMessage, 'success');
        setIsSuccess(true);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : (errorFallback ?? 'Submit action failed');
        showToast(message, 'error');
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    },
    [successMessage, errorFallback, showToast]
  );

  return {
    handleSubmit,
    isLoading,
    isSuccess,
    setIsSuccess,
  };
};
