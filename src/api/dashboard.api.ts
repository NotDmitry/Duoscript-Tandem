import type {
  DashboardData,
  ActivityItem,
} from '@/features/Dashboard/Dashboard.types';
import { dashboardMock } from '@/features/Dashboard/Dashboard.mock';

let USE_MOCK = true;

export const setUseMock = (value: boolean): void => {
  USE_MOCK = value;
};

const asyncMock = <T>(data: T, delayMs = 300): Promise<T> =>
  new Promise((resolve) => {
    setTimeout((): void => {
      resolve(data);
    }, delayMs);
  });

export const getStats = async (): Promise<DashboardData> => {
  if (USE_MOCK) {
    return asyncMock(dashboardMock);
  } else {
    const res = await fetch('/api/dashboard/stats');
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json() as Promise<DashboardData>;
  }
};

export const getHistory = async (
  page: number,
  itemsPerPage: number
): Promise<{ activities: ActivityItem[]; totalPages: number }> => {
  if (USE_MOCK) {
    const startIndex: number = (page - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;
    const paginatedActivities = dashboardMock.recentActivity.slice(
      startIndex,
      endIndex
    );
    const totalPages: number = Math.ceil(
      dashboardMock.recentActivity.length / itemsPerPage
    );

    return asyncMock({ activities: paginatedActivities, totalPages });
  } else {
    const res = await fetch(
      `/api/dashboard/history?page=${page.toString()}&limit=${itemsPerPage.toString()}`
    );

    if (!res.ok) throw new Error('Failed to fetch history');

    const data = (await res.json()) as {
      activities: ActivityItem[];
      totalPages: number;
    };

    return {
      activities: data.activities,
      totalPages: data.totalPages,
    };
  }
};
