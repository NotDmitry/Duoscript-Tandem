import type { WidgetView } from '@models/widgetModel';
import { bugHunterWidgetMocks } from '@mocks/widgetBugHunter.mock';
import { delay } from '@utils/delay';

export async function getBugHunterWidget(
  widgetId: string
): Promise<WidgetView<'bugHunter'>> {
  await delay(300);
  return bugHunterWidgetMocks[widgetId];
}
