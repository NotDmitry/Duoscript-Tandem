import { useState, useEffect, useRef } from 'react';
import { getActivityHistory } from '@api/dashboard.api';
import type { ActivityView } from '@models/activityModel';
import type { QueryDocumentSnapshot } from 'firebase/firestore';

export function useActivityHistory(uid: string, itemsPerPage: number) {
  const [activities, setActivities] = useState<ActivityView[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cursors = useRef(new Map<number, QueryDocumentSnapshot>());

  useEffect(() => {
    setPage(1);
    cursors.current.clear();
  }, [uid, itemsPerPage]);

  useEffect((): void => {
    if (!uid) return;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const cursor = page > 1 ? cursors.current.get(page - 1) : undefined;
        const data = await getActivityHistory(uid, page, itemsPerPage, cursor);
        setActivities(data.activities);
        setTotalPages(data.totalPages);
        if (data.cursor) cursors.current.set(page, data.cursor);
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
