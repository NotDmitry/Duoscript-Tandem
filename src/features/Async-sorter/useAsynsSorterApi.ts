import { /* useCallback, */ useEffect, useState } from 'react';
import type { AsyncSorterAnswer } from './types';
import { getAsyncSorterWidget } from '@api/asyncSort.api';
import { useUI } from '@hooks/useUI';
import type { AsyncSorterTask } from '@models/widgetModel';

export const useAsyncSorterApi = (
  setAnswer: React.Dispatch<
    React.SetStateAction<AsyncSorterAnswer | undefined>
  >,
  setCurrentTask: React.Dispatch<React.SetStateAction<AsyncSorterTask | null>>,
  widgetId: string
) => {
  const [task, setTask] = useState<null | AsyncSorterTask>(null);
  const [taskIndex, setTaskIndex] = useState(0);
  const [tasksNumber, setTasksNumber] = useState(0);
  const { showToast } = useUI();
  const [isLoading, setIsLoading] = useState(false);
  const [widgetTasks, setWidgetTasks] = useState<AsyncSorterTask[]>([]);
  function getAsyncSortTaskByIndex(
    index: number,
    tasks: AsyncSorterTask[]
  ): AsyncSorterTask {
    return tasks[index];
  }

  /* const getAsyncSortTask = useCallback(
    async (index: number) => {
      setIsLoading(true);
      try {
        const task = await getAsyncSortTaskByIndex(index, widgetId);
        return task;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Ups, task can not be shown';
        showToast(message, 'error');
      } finally {
        setIsLoading(false);
      }
    },
    [showToast, widgetId]
  ); */

  useEffect(() => {
    let cancelled = false;
    const loadTask = async () => {
      setIsLoading(true);
      try {
        const widget = await getAsyncSorterWidget(widgetId);
        const tasksData = widget.config.tasks;
        setWidgetTasks(tasksData);
        const loadedTask = getAsyncSortTaskByIndex(taskIndex, tasksData);
        setAnswer(loadedTask.answer);
        if (!cancelled) {
          setTask(loadedTask);
          setCurrentTask(loadedTask);
          setTasksNumber(tasksData.length);
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Ups, task can not be shown';
        showToast(message, 'error');
        if (!cancelled) setTask(null);
      } finally {
        setIsLoading(false);
      }
    };
    void loadTask();

    return () => {
      cancelled = true;
    };
  }, [taskIndex, setCurrentTask, setAnswer, widgetId, showToast]);
  return {
    task,
    taskIndex,
    setTaskIndex,
    tasksNumber,
    isLoading,
    setAnswer,
    widgetTasks,
  };
};
