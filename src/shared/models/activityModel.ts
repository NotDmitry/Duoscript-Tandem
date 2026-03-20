import type { Timestamp } from 'firebase/firestore';
import type { WidgetType } from '@/shared/models/widgetModel.ts';

export type ActivityStatus = 'completed' | 'in_progress';

export interface ActivityLogDocument {
  activityLogId: string;
  uid: string;
  courseId: string;
  courseTitle: string;
  lessonId: string;
  lessonTitle: string;
  widgetType: WidgetType;
  score: number;
  maxScore: number;
  status: ActivityStatus;
  createdAt: Timestamp;
}
