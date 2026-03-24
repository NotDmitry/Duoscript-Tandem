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

export function toLessonView(
  doc: LessonDocument,
  isCompleted?: boolean
): LessonView {
  return {
    lessonId: doc.lessonId,
    courseId: doc.courseId,
    title: doc.title,
    description: doc.description,
    widgetId: doc.widgetId,
    isCompleted,
  };
}
