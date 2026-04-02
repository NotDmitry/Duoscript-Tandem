import type { BugHunterConfig, WidgetView } from '@models/widgetModel';
import { bugHunterWidgetMocks } from '@mocks/WidgetBugHunter.mock';
import { delay } from '@utils/delay';

export async function getBugHunterWidget(
  widgetId: string
): Promise<WidgetView<BugHunterConfig>> {
  await delay(300);
  return bugHunterWidgetMocks[widgetId];
}
