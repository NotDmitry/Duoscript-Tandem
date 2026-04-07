import type { Timestamp } from 'firebase/firestore';

export type CourseTag = 'js' | 'ts' | 'css' | 'html' | 'github' | 'algorithms';

export interface CourseDocument {
  courseId: string;
  title: string;
  description?: string;
  iconUrl?: string;
  tag: CourseTag;
  lessonIds: string[];
  createdAt: Timestamp;
}

export interface CourseView {
  courseId: string;
  title: string;
  description?: string;
  iconUrl?: string;
  tag: CourseTag;
  lessonCount: number;
}

export interface CourseWithProgressView extends CourseView {
  progressPercent: number;
  completedLessonsCount: number;
}

export function toCourseView(doc: CourseDocument): CourseView {
  return {
    courseId: doc.courseId,
    title: doc.title,
    description: doc.description,
    iconUrl: doc.iconUrl,
    tag: doc.tag,
    lessonCount: doc.lessonIds.length,
  };
}

export function toCourseWithProgressView(
  course: CourseView,
  progressPercent: number,
  completedLessonsCount: number
): CourseWithProgressView {
  return { ...course, progressPercent, completedLessonsCount };
}
