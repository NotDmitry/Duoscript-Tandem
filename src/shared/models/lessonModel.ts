import type { Timestamp } from 'firebase/firestore';

export interface LessonDocument {
  lessonId: string;
  courseId: string;
  title: string;
  description?: string;
  widgetId: string;
  createdAt: Timestamp;
}

export interface LessonView {
  lessonId: string;
  courseId: string;
  title: string;
  description?: string;
  widgetId: string;
  isCompleted?: boolean;
}
