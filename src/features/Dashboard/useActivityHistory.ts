import { useState, useEffect } from 'react';
import { getActivityHistory } from '@api/dashboard.api';
import type { ActivityView } from '@models/activityModel';

export function useActivityHistory(uid: string, itemsPerPage: number) {
  const [activities, setActivities] = useState<ActivityView[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect((): void => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const data = await getActivityHistory(uid, page, itemsPerPage);
        setActivities(data.activities);
        setTotalPages(data.totalPages);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load activities');
        }
      } finally {
        setLoading(false);
      }
    }
    void fetchData();
  }, [uid, page, itemsPerPage]);

  return { activities, page, setPage, totalPages, loading, error };
}

export type UseActivityHistoryResult = ReturnType<typeof useActivityHistory>;
