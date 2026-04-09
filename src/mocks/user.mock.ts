import type { UserDashboardView } from '@models/userModel';
import { mockCourseProgressList } from '@mocks/courseProgress.mock';
import { mockCourses } from '@mocks/courses.mock';

const totalLessons = mockCourses.reduce(
  (sum, course) => sum + course.lessonCount,
  0
);
const totalCompleted = mockCourseProgressList.reduce(
  (sum, progressEntry) => sum + progressEntry.completedLessonsIds.length,
  0
);

export const mockUserDashboard: UserDashboardView = {
  uid: 'user_1',
  displayName: 'anelka',
  progressPercent:
    totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0,
  progressUpdatedAt: new Date().toISOString(),
  minutesSpent: 45,
  activitiesCompleted: 6,
  currentStreak: 3,
};
