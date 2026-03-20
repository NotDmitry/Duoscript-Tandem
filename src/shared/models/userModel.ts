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

export interface UserDocument {
  uid: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  overallProgress: UserOverallProgress;
  streak: UserStreak;
  dailyStats: UserDailyStats;
}

// Map Document to Views

export interface UserAuthView {
  uid: string;
  displayName: string;
  email: string;
}

export function toUserAuthView(firebaseUser: {
  uid: string;
  displayName: string | null;
  email: string | null;
}): UserAuthView {
  if (!firebaseUser.email) {
    throw new Error("Email doesn't exist");
  }
  return {
    uid: firebaseUser.uid,
    displayName: firebaseUser.displayName ?? 'unknown',
    email: firebaseUser.email,
  };
}
