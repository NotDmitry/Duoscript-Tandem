import type { UserDashboardView } from '@/shared/models/userModel';
import type { ActivityView } from '@/shared/models/activityModel';
import { mockUserDashboard } from '@/mocks/user.mock';
import { mockActivityLog } from '@/mocks/activity.mock';

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getUserDashboard(
  uid: string
): Promise<UserDashboardView> {
  await delay(300);
  void uid;
  return mockUserDashboard;
}

export async function getActivityHistory(
  uid: string,
  page: number,
  itemsPerPage: number
): Promise<{ activities: ActivityView[]; totalPages: number }> {
  await delay(300);
  void uid;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const activities = mockActivityLog.slice(startIndex, endIndex);
  const totalPages = Math.ceil(mockActivityLog.length / itemsPerPage);
  return { activities, totalPages };
}
