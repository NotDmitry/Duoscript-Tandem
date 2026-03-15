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
  }

  return fetch('/api/dashboard/stats').then((res): Promise<DashboardData> => {
    if (!res.ok) {
      throw new Error('Failed to fetch stats');
    }

    return res.json();
  });
};

export const getHistory = async (
  page: number,
  itemsPerPage: number
): Promise<{ activities: ActivityItem[]; totalPages: number }> => {
  if (USE_MOCK) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedActivities = dashboardMock.recentActivity.slice(
      startIndex,
      endIndex
    );

    const totalPages = Math.ceil(
      dashboardMock.recentActivity.length / itemsPerPage
    );

    return asyncMock({ activities: paginatedActivities, totalPages });
  }

  return fetch(
    `/api/dashboard/history?page=${page.toString()}&limit=${itemsPerPage.toString()}`
  ).then((res): Promise<{ activities: ActivityItem[]; totalPages: number }> => {
    if (!res.ok) {
      throw new Error('Failed to fetch history');
    }

    return res.json();
  });
};
