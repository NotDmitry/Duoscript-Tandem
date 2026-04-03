import type { Timestamp, FieldValue } from 'firebase/firestore';

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

export type NewUserDocument = Omit<
  UserDocument,
  'createdAt' | 'updatedAt' | 'overallProgress'
> & {
  createdAt: FieldValue;
  updatedAt: FieldValue;
  overallProgress: Omit<UserOverallProgress, 'updatedAt'> & {
    updatedAt: FieldValue;
  };
};

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

export interface UserDashboardView {
  uid: string;
  displayName: string;
  progressPercent: number;
  progressUpdatedAt: string;
  minutesSpent: number;
  activitiesCompleted: number;
  currentStreak: number;
}

export function toUserDashboardView(doc: UserDocument): UserDashboardView {
  return {
    uid: doc.uid,
    displayName: doc.displayName,
    progressPercent: doc.overallProgress.progressPercent,
    progressUpdatedAt: doc.overallProgress.updatedAt.toDate().toISOString(),
    minutesSpent: doc.dailyStats.minutesSpent,
    activitiesCompleted: doc.dailyStats.activitiesCompleted,
    currentStreak: doc.streak.currentStreak,
  };
}
