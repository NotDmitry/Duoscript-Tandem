import { type AsyncSorterAnswer } from '@features/Async-sorter/types';
import { asyncSorterWidgetMock } from '@mocks/widgetAsyncSorter.mock';
import type { WidgetView, AsyncSorterTask } from '@models/widgetModel';
import { delay } from '@utils/delay';

export async function getAsyncSorterWidget(): Promise<
  WidgetView<'asyncSorter'>
> {
  await delay(300);
  return asyncSorterWidgetMock;
}
export async function getAsyncSortTaskById(
  id: number
): Promise<AsyncSorterTask | undefined> {
  try {
    const widget = await getAsyncSorterWidget();
    return widget.config.tasks.find((item) => item.id === id);
  } catch {
    throw new Error("The task doesn't exist");
  }
}

export async function getAsyncSortTaskByIndex(
  index: number
): Promise<AsyncSorterTask | undefined> {
  try {
    const widget = await getAsyncSorterWidget();
    return widget.config.tasks[index];
  } catch {
    throw Error("The task doesn't exist");
  }
}
export async function getAsyncSortTasksNumber(): Promise<number> {
  try {
    const widget = await getAsyncSorterWidget();
    return widget.config.tasks.length;
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
