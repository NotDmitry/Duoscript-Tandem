import { type AsyncSorterAnswer } from '@features/Async-sorter/types';
import { asyncSorterWidgetMocks } from '@mocks/widgetAsyncSorter.mock';
import type { WidgetView, AsyncSorterTask } from '@models/widgetModel';
import { delay } from '@utils/delay';

export async function getAsyncSorterWidget(
  widgetId: string
): Promise<WidgetView<'asyncSorter'>> {
  await delay(300);
  return asyncSorterWidgetMocks[widgetId];
}
export async function getAsyncSortTaskById(
  id: number,
  widgetId: string
): Promise<AsyncSorterTask | undefined> {
  try {
    const widget = await getAsyncSorterWidget(widgetId);
    return widget.config.tasks.find((item) => item.id === id);
  } catch {
    throw new Error("The task doesn't exist");
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
  id: number,
  widgetId: string
): Promise<boolean> {
  try {
    const task = await getAsyncSortTaskById(id, widgetId);
    if (!task) throw new Error('Failed to fetch task');
    return ifAnswersEqual(userAnswer, task.answer);
  } catch {
    throw Error("The tasks array doesn't exist");
  }
}
