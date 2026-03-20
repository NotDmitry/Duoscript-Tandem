import type { Timestamp } from 'firebase/firestore';

export interface CourseProgressDocument {
  courseId: string;
  completedLessonsIds: string[];
  progressPercent: number;
  updatedAt: Timestamp;
}

interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  createdAt: Date;
}

export type { User };
