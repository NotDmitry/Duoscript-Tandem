import { useCallback, useEffect, useState } from 'react';
import type { AsyncSorterAnswer, AsyncSorterTask } from './types';
import { getAsyncSortTaskByIndex } from '@/api/asyncSort.api';
import { useUI } from '@/shared/hooks/useUI';
import { getAsyncSortTasksNumber } from '@/api/asyncSort.api';

export const useAsyncSorterApi = (
  setAnswer: React.Dispatch<
    React.SetStateAction<AsyncSorterAnswer | undefined>
  >,
  setCurrentTask: React.Dispatch<React.SetStateAction<AsyncSorterTask | null>>
) => {
  const [task, setTask] = useState<null | AsyncSorterTask>(null);
  const [taskIndex, setTaskIndex] = useState(0);
  const [tasksNumber, setTasksNumber] = useState(0);
  const { showToast } = useUI();
  const [isLoading, setIsLoading] = useState(false);

  const getAsyncSortTask = useCallback(
    async (index: number) => {
      setIsLoading(true);
      try {
        const task = await getAsyncSortTaskByIndex(index);
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

  useEffect(() => {
    let cancelled = false;
    const loadTask = async () => {
      try {
        const taskData = await getAsyncSortTask(taskIndex);
        setAnswer(taskData?.answer);
        const tasksArrayNumber = await getAsyncSortTasksNumber();
        if (!cancelled) {
          setTask(taskData ?? null);
          setCurrentTask(taskData ?? null);
          setTasksNumber(tasksArrayNumber);
        }
      } catch {
        if (!cancelled) setTask(null);
      }
    };
    void loadTask();

    return () => {
      cancelled = true;
    };
  }, [getAsyncSortTask, taskIndex, setCurrentTask, setAnswer]);
  return {
    task,
    taskIndex,
    setTaskIndex,
    tasksNumber,
    isLoading,
    setAnswer,
  };
};
