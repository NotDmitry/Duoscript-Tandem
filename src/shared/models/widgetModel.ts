import type { Timestamp } from 'firebase/firestore';

export type WidgetType = 'quiz';

export interface WidgetDocument<T> {
  widgetId: string;
  type: WidgetType;
  config: T;
  createdAt: Timestamp;
}
