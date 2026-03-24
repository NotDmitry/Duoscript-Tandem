import type { Timestamp } from 'firebase/firestore';

export interface CourseProgressDocument {
  courseId: string;
  completedLessonsIds: string[];
  progressPercent: number;
  updatedAt: Timestamp;
}

export interface CourseProgressView {
  courseId: string;
  completedLessonsIds: string[];
  progressPercent: number;
  updatedAt: string;
}

export function toCourseProgressView(
  doc: CourseProgressDocument
): CourseProgressView {
  return {
    courseId: doc.courseId,
    completedLessonsIds: [...doc.completedLessonsIds],
    progressPercent: doc.progressPercent,
    updatedAt: doc.updatedAt.toDate().toISOString(),
  };
}
