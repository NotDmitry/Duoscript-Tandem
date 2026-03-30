import type { QuizConfig, WidgetView } from '@/shared/models/widgetModel';
import { quizWidgetMocks } from '@/mocks/widgetQuiz.mock';
import { delay } from '@/shared/utils/delay';

export async function getQuizWidget(
  widgetId: string
): Promise<WidgetView<QuizConfig>> {
  await delay(300);
  return quizWidgetMocks[widgetId];
}
