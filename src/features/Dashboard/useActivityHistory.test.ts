import { renderHook, waitFor } from '@testing-library/react';
import { useActivityHistory } from './useActivityHistory';
import * as api from '@api/dashboard.api';
import { describe, test, expect, vi } from 'vitest';
import type { ActivityView } from '@models/activityModel';

describe('useActivityHistory', () => {
  const mockActivity: ActivityView = {
    id: '1',
    courseTitle: 'JavaScript Basics',
    lessonTitle: 'Quiz 1',
    widgetType: 'quiz',
    score: 8,
    maxScore: 10,
    status: 'completed',
    createdAt: '2026-03-16T10:00:00Z',
  };

  test('loads activities on mount', async () => {
    vi.spyOn(api, 'getActivityHistory').mockResolvedValue({
      activities: [mockActivity],
      totalPages: 1,
      cursor: undefined,
    });

    const { result } = renderHook(() => useActivityHistory('user_1', 5));

    await waitFor(() => {
      expect(result.current.activities.length).toBe(1);
      expect(result.current.activities[0].id).toBe('1');
    });
  });

  test('starts with empty activities', () => {
    const { result } = renderHook(() => useActivityHistory('user_1', 5));
    expect(result.current.activities).toEqual([]);
  });

  test('calls API with correct uid and itemsPerPage', async () => {
    const spy = vi.spyOn(api, 'getActivityHistory').mockResolvedValue({
      activities: [],
      totalPages: 1,
      cursor: undefined,
    });

    renderHook(() => useActivityHistory('user_1', 10));

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith('user_1', 1, 10, undefined);
    });
  });

  test('sets loading to true while fetching', async () => {
    let resolver!: (value: {
      activities: ActivityView[];
      totalPages: number;
      cursor: undefined;
    }) => void;

    const promise = new Promise<{
      activities: ActivityView[];
      totalPages: number;
      cursor: undefined;
    }>((resolve) => {
      resolver = resolve;
    });

    vi.spyOn(api, 'getActivityHistory').mockReturnValue(promise);

    const { result } = renderHook(() => useActivityHistory('user_1', 5));

    expect(result.current.isLoading).toBe(true);

    resolver({
      activities: [{ ...mockActivity }],
      totalPages: 1,
      cursor: undefined,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });
});
