import { asyncSorterTasks } from '@/features/Async-sorter/mock';
import {
  asyncSorterTaskSchema,
  asyncSorterTasksArraySchema,
  type AsyncSorterAnswer,
  type AsyncSorterTask,
} from '@/features/Async-sorter/types';
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let USE_MOCK_DATA = true;
export async function getAsyncSortTaskById(
  id: number
): Promise<AsyncSorterTask | undefined> {
  try {
    if (USE_MOCK_DATA) {
      await delay(1000);
      const user = asyncSorterTasks.find((item) => item.id === id);
      if (!user) throw new Error("The task doesn't exist");
      return user;
    }
    const res = await fetch(`https://api.async-sorter.com/tasks/${String(id)}`);
    if (!res.ok) {
      throw new Error('Failed to fetch new task');
    }
    const task = asyncSorterTaskSchema.parse(await res.json());

    return task;
  } catch {
    throw new Error("The task doesn't exist");
  }
}

export async function getAsyncSortTaskByIndex(
  index: number
): Promise<AsyncSorterTask | undefined> {
  try {
    if (USE_MOCK_DATA) {
      await delay(1000);
      if (index <= asyncSorterTasks.length - 1) {
        return asyncSorterTasks[index];
      }
      return undefined;
    }
    const res = await fetch(`https://api.async-sorter.com/tasks`);
    if (!res.ok) {
      throw new Error('Failed to fetch tasks array');
    }
    const tasks = asyncSorterTasksArraySchema.parse(await res.json());
    const task = tasks[index];
    return task;
  } catch {
    throw Error("The task doesn't exist");
  }
}
export async function getAsyncSortTasksNumber(): Promise<number> {
  try {
    if (USE_MOCK_DATA) {
      await delay(0);

      return asyncSorterTasks.length;
    }
    const res = await fetch(`https://api.async-sorter.com/tasks`);
    if (!res.ok) {
      throw new Error('Failed to fetch tasks array');
    }
    const tasks = asyncSorterTasksArraySchema.parse(await res.json());

    return tasks.length;
  } catch {
    throw Error("The tasks array doesn't exist");
  }
}
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
export async function submitAnswer(
  userAnswer: AsyncSorterAnswer,
  id: number
): Promise<boolean> {
  try {
    const task = await getAsyncSortTaskById(id);
    if (!task) throw new Error('Failed to fetch task');
    return ifAnswersEqual(userAnswer, task.answer);
  } catch {
    throw Error("The tasks array doesn't exist");
  }
}

export const setUseMockData = (value: boolean): void => {
  USE_MOCK_DATA = value;
};
