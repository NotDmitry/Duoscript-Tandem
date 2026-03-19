import { getAsyncSortTask } from '@/api/asyncSort.api';
import { useCallback, useState } from 'react';
import { useUI } from './useUI';

export const useAsyncSorter = () => {
  const { showToast } = useUI();
  const [isLoading, setIsLoading] = useState(false);
  const getAsyncSortTaskByIndex = useCallback(
    async (index: number) => {
      setIsLoading(true);
      try {
        const task = await getAsyncSortTask(index);
        return task;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Ups, task can not be shown';
        showToast(message, 'error');
      } finally {
        setIsLoading(false);
      }
    },
    [showToast]
  );
  return {
    getAsyncSortTaskByIndex,
    isLoading,
  };
};
