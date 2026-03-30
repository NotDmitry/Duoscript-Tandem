import type { MeaningMatcherConfig, WidgetView } from '@models/widgetModel';
import { meaningMatcherWidgetMocks } from '@mocks/widgetMeaningMatcher.mock';
import { delay } from '@utils/delay';

export async function getMeaningMatcherWidget(
  widgetId: string
): Promise<WidgetView<MeaningMatcherConfig>> {
  await delay(300);
  return meaningMatcherWidgetMocks[widgetId];
}
