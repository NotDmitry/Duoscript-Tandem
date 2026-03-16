import type {
  User,
  UserProgress,
  DailyLearningStats,
  UserStreak,
  ActivityItem,
  DashboardData,
} from './Dashboard.types.ts';

export const mockUser: User = {
  id: 'user_1',
  email: 'alena@example.com',
  username: 'anelka',
  createdAt: '2026-01-10',
};

export const mockUserProgress: UserProgress = {
  id: 'progress_1',
  userId: 'user_1',
  progressPercent: 65,
  updatedAt: '2026-03-06',
};

export const mockDailyLearningStats: DailyLearningStats = {
  id: 'stats_1',
  userId: 'user_1',
  date: '2026-03-06',
  minutesSpent: 45,
  activitiesCompleted: 2,
};

export const mockUserStreak: UserStreak = {
  userId: 'user_1',
  currentStreak: 3,
  longestStreak: 7,
  lastActiveDate: '2026-03-06',
};

export const mockActivityLog: ActivityItem[] = [
  {
    id: 'activity_1',
    userId: 'user_1',
    course: 'Core JS',
    widget: 'Bug Hunter',
    type: 'quiz',
    score: 85,
    maxScore: 100,
    status: 'completed',
    createdAt: '2026-03-06',
  },
  {
    id: 'activity_2',
    userId: 'user_1',
    course: 'Core JS',
    widget: 'Array Explorer',
    type: 'exercise',
    score: 90,
    maxScore: 100,
    status: 'completed',
    createdAt: '2026-03-05',
  },

  {
    id: 'activity_3',
    userId: 'user_1',
    course: 'Algorithms',
    widget: 'Two Sum Challenge',
    type: 'exercise',
    score: 100,
    maxScore: 100,
    status: 'completed',
    createdAt: '2026-03-04',
  },

  {
    id: 'activity_4',
    userId: 'user_1',
    course: 'Core JS',
    widget: 'Async Event Loop',
    type: 'widget',
    score: 70,
    maxScore: 100,
    status: 'completed',
    createdAt: '2026-03-03',
  },

  {
    id: 'activity_5',
    userId: 'user_1',
    course: 'TypeScript',
    widget: 'Generics Quiz',
    type: 'quiz',
    score: 95,
    maxScore: 100,
    status: 'completed',
    createdAt: '2026-03-02',
  },

  {
    id: 'activity_6',
    userId: 'user_1',
    course: 'Core JS',
    widget: 'Memory GC Game',
    type: 'widget',
    score: 80,
    maxScore: 100,
    status: 'completed',
    createdAt: '2026-03-01',
  },
];

export const dashboardMock: DashboardData = {
  user: mockUser,
  progress: mockUserProgress.progressPercent,

  learningToday: {
    minutes: mockDailyLearningStats.minutesSpent,
    activities: mockDailyLearningStats.activitiesCompleted,
    streak: mockUserStreak.currentStreak,
  },

  recentActivity: mockActivityLog,
};
