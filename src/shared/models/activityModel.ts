import type {
  Timestamp,
  FirestoreDataConverter,
  WithFieldValue,
} from 'firebase/firestore';
import type { WidgetType } from '@models/widgetModel';

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

export const activityConverter: FirestoreDataConverter<
  ActivityLogDocument,
  WithFieldValue<ActivityLogDocument>
> = {
  toFirestore(activityLog: WithFieldValue<ActivityLogDocument>) {
    return activityLog;
  },
  fromFirestore(snap) {
    return snap.data() as ActivityLogDocument;
  },
};

export interface ActivityView {
  id: string;
  courseTitle: string;
  lessonTitle: string;
  widgetType: WidgetType;
  score: number;
  maxScore: number;
  status: ActivityStatus;
  createdAt: string;
}

export function toActivityView(doc: ActivityLogDocument): ActivityView {
  return {
    id: doc.activityLogId,
    courseTitle: doc.courseTitle,
    lessonTitle: doc.lessonTitle,
    widgetType: doc.widgetType,
    score: doc.score,
    maxScore: doc.maxScore,
    status: doc.status,
    createdAt: doc.createdAt.toDate().toISOString(),
  };
}
