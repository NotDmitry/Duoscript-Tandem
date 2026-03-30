import type { QuizConfig, WidgetView } from '@/shared/models/widgetModel';
import { quizWidgetMocks } from '@/mocks/widgetQuiz.mock.ts';

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getQuizWidget(
  widgetId: string
): Promise<WidgetView<QuizConfig>> {
  await delay(300);
  return quizWidgetMocks[widgetId];
}
