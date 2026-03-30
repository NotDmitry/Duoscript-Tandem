import { describe, test, expect } from 'vitest';
import { getUserDashboard, getActivityHistory } from './dashboard.api';

describe('dashboard API', () => {
  test('getUserDashboard returns dashboard data', async () => {
    const data = await getUserDashboard('user_1');

    expect(data).toBeDefined();
    expect(data.displayName).toBeDefined();
    expect(typeof data.progressPercent).toBe('number');
  });

  test('getActivityHistory returns paginated activities', async () => {
    const data = await getActivityHistory('user_1', 1, 3);

    expect(data.activities).toBeInstanceOf(Array);
    expect(data.totalPages).toBeGreaterThan(0);
  });
});
