import type {
  MeaningMatcherConfig,
  WidgetView,
} from '@/shared/models/widgetModel';
import { meaningMatcherWidgetMocks } from '@/mocks/widgetMeaningMatcher.mock';
import { delay } from '@/shared/utils/delay';

export async function getMeaningMatcherWidget(
  widgetId: string
): Promise<WidgetView<MeaningMatcherConfig>> {
  await delay(300);
  return meaningMatcherWidgetMocks[widgetId];
}
