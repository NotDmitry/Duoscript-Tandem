import type { Timestamp } from 'firebase/firestore';

export interface CourseProgressDocument {
  courseId: string;
  completedLessonsIds: string[];
  progressPercent: number;
  updatedAt: Timestamp;
}

export interface UserOverallProgress {
  progressPercent: number;
  updatedAt: Timestamp;
}

export interface UserStreak {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

export interface UserDailyStats {
  date: string;
  minutesSpent: number;
  activitiesCompleted: number;
}

interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  createdAt: Date;
}

export type { User };
