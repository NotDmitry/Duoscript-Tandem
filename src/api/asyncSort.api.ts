import { asyncSorterWidgetMocks } from '@mocks/widgetAsyncSorter.mock';
import type { WidgetView } from '@models/widgetModel';
import { delay } from '@utils/delay';

export async function getAsyncSorterWidget(
  widgetId: string
): Promise<WidgetView<'asyncSorter'>> {
  await delay(300);
  return asyncSorterWidgetMocks[widgetId];
}
