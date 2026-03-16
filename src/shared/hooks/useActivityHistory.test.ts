import { renderHook, waitFor } from '@testing-library/react';
import { useActivityHistory } from './useActivityHistory';
import * as api from '@/api/dashboard.api';
import { describe, test, expect, vi } from 'vitest';
import type { ActivityItem } from '@/features/Dashboard/Dashboard.types';

describe('useActivityHistory', () => {
  const mockActivity = {
    id: '1',
    userId: 'user1',
    course: 'JavaScript Basics',
    widget: 'Quiz 1',
    type: 'quiz' as const,
    score: 8,
    maxScore: 10,
    status: 'completed' as const,
    createdAt: '2026-03-16T10:00:00Z',
  };

  test('loads activities on mount', async () => {
    vi.spyOn(api, 'getHistory').mockResolvedValue({
      activities: [mockActivity],
      totalPages: 1,
    });

    const { result } = renderHook(() => useActivityHistory(5));

    await waitFor(() => {
      expect(result.current.activities.length).toBe(1);
      expect(result.current.activities[0].id).toBe('1');
    });
  });

  test('starts with empty activities', () => {
    const { result } = renderHook(() => useActivityHistory(5));
    expect(result.current.activities).toEqual([]);
  });

  test('calls API with correct itemsPerPage', async () => {
    const spy = vi.spyOn(api, 'getHistory').mockResolvedValue({
      activities: [],
      totalPages: 1,
    });

    renderHook(() => useActivityHistory(10));

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(1, 10);
    });
  });

  test('sets loading to true while fetching', async () => {
    let resolver!: (value: {
      activities: ActivityItem[];
      totalPages: number;
    }) => void;

    const promise = new Promise<{
      activities: ActivityItem[];
      totalPages: number;
    }>((resolve) => {
      resolver = resolve;
    });

    vi.spyOn(api, 'getHistory').mockReturnValue(promise);

    const { result } = renderHook(() => useActivityHistory(5));

    expect(result.current.loading).toBe(true);

    resolver({ activities: [{ ...mockActivity }], totalPages: 1 });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});
