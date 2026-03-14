export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

export interface UserProgress {
  id: string;
  userId: string;
  progressPercent: number;
  updatedAt: string;
}

export interface DailyLearningStats {
  id: string;
  userId: string;
  date: string;
  minutesSpent: number;
  activitiesCompleted: number;
}

export interface UserStreak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

export interface ActivityItem {
  id: string;
  userId: string;
  course: string;
  widget: string;
  type: 'quiz' | 'exercise' | 'widget';
  score: number;
  maxScore: number;
  status: 'completed' | 'in_progress';
  createdAt: string;
}

export interface DashboardData {
  user: User;
  progress: number;
  learningToday: {
    minutes: number;
    activities: number;
    streak: number;
  };
  recentActivity: ActivityItem[];
}
