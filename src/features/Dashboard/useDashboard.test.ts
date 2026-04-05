import { renderHook, waitFor } from '@testing-library/react';
import { useDashboard } from './useDashboard';
import * as api from '@api/dashboard.api';
import { describe, test, expect, vi } from 'vitest';
import { mockUserDashboard } from '@/mocks/user.mock';

describe('useDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('loads dashboard data on mount', async () => {
    vi.spyOn(api, 'getUserDashboard').mockResolvedValue(mockUserDashboard);

    const { result } = renderHook(() => useDashboard('user_1'));

    await waitFor(() => {
      expect(result.current.dashboardData).toEqual(mockUserDashboard);
    });
  });

  test('starts with null dashboardData', () => {
    const { result } = renderHook(() => useDashboard('user_1'));
    expect(result.current.dashboardData).toBeNull();
  });

  test('sets loading to true while fetching', async () => {
    let resolver!: (value: typeof mockUserDashboard) => void;
    const promise = new Promise<typeof mockUserDashboard>((resolve) => {
      resolver = resolve;
    });

    vi.spyOn(api, 'getUserDashboard').mockReturnValue(promise);

    const { result } = renderHook(() => useDashboard('user_1'));

    expect(result.current.loading).toBe(true);

    resolver(mockUserDashboard);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  test('sets error on failed request', async () => {
    vi.spyOn(api, 'getUserDashboard').mockRejectedValue(
      new Error('Network error')
    );

    const { result } = renderHook(() => useDashboard('user_1'));

    await waitFor(() => {
      expect(result.current.error).toBe('Network error');
    });
  });

  test('does not fetch if uid is empty', () => {
    const spy = vi.spyOn(api, 'getUserDashboard');

    renderHook(() => useDashboard(''));

    expect(spy).not.toHaveBeenCalled();
  });
});
