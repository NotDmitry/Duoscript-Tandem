import { asyncSorterTasks } from '@/features/Async-sorter/mock';
import {
  asyncSorterTaskSchema,
  type AsyncSorterTask,
} from '@/features/Async-sorter/types';
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let USE_MOCK_DATA = true;

export async function getAsyncSortTask(
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
    const res = await fetch(
      `https://api.async-sorter.com/tasks/${String(index)}`
    );
    if (!res.ok) {
      throw new Error('Failed to fetch new task');
    }
    const task = asyncSorterTaskSchema.parse(await res.json());

    return task;
  } catch {
    throw Error("The task doesn't exist");
  }
}

export const setUseMockData = (value: boolean): void => {
  USE_MOCK_DATA = value;
};
