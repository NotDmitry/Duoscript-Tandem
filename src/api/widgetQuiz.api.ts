import type { QuizConfig, WidgetView } from '@models/widgetModel';
import { quizWidgetMocks } from '@mocks/widgetQuiz.mock';
import { delay } from '@utils/delay';

export async function getQuizWidget(
  widgetId: string
): Promise<WidgetView<QuizConfig>> {
  await delay(300);
  return quizWidgetMocks[widgetId];
}
