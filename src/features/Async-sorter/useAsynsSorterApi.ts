import { useEffect, useState } from 'react';
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
  function getAsyncSortTaskById(
    id: number,
    tasks: AsyncSorterTask[]
  ): AsyncSorterTask | undefined {
    return tasks.find((item) => item.id === id);
  }
  /*
  const ifAnswersEqual = (
    userAnswer: AsyncSorterAnswer,
    serverAnswer: AsyncSorterAnswer
  ): boolean => {
    return (
      JSON.stringify(userAnswer.callStack) ===
        JSON.stringify(serverAnswer.callStack) &&
      JSON.stringify(userAnswer.microtasks) ===
        JSON.stringify(serverAnswer.microtasks) &&
      JSON.stringify(userAnswer.macrotasks) ===
        JSON.stringify(serverAnswer.macrotasks)
    );
  };
  function submitAnswer(userAnswer: AsyncSorterAnswer, id: number): boolean {
    const task = getAsyncSortTaskById(id, widgetTasks);
    if (!task) throw new Error('Failed to fetch task');
    return ifAnswersEqual(userAnswer, task.answer);
  }
 */
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
    getAsyncSortTaskById,
    widgetTasks,
  };
};
