import type {
  MeaningMatcherConfig,
  WidgetView,
} from '@/shared/models/widgetModel';
import { meaningMatcherWidgetMocks } from '@/mocks/widgetMeaningMatcher.mock';

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getMeaningMatcherWidget(
  widgetId: string
): Promise<WidgetView<MeaningMatcherConfig>> {
  await delay(300);
  return meaningMatcherWidgetMocks[widgetId];
}
