import { describe, test, expect } from 'vitest';
import { getStats, getHistory } from './dashboard.api';

describe('dashboard API', () => {
  test('getStats returns dashboard data', async () => {
    const data = await getStats();

    expect(data).toBeDefined();
    expect(data.user).toBeDefined();
  });

  test('getHistory returns paginated activities', async () => {
    const data = await getHistory(1, 3);

    expect(data.activities).toBeInstanceOf(Array);
    expect(data.totalPages).toBeGreaterThan(0);
  });
});
