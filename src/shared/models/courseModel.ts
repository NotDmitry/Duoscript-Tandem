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
