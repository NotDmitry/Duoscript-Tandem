import { useState, useEffect, useRef } from 'react';
import { getActivityHistory } from '@api/dashboard.api';
import type { ActivityView } from '@models/activityModel';
import type { QueryDocumentSnapshot } from 'firebase/firestore';

export function useActivityHistory(uid: string, itemsPerPage: number) {
  const [activities, setActivities] = useState<ActivityView[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cursors = useRef(new Map<number, QueryDocumentSnapshot>());

  useEffect(() => {
    setPage(1);
    cursors.current.clear();
  }, [uid, itemsPerPage]);

  useEffect((): void => {
    if (!uid) return;
    async function fetchData() {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    }
    void fetchData();
  }, [uid, page, itemsPerPage]);

  return { activities, page, setPage, totalPages, isLoading, error };
}

export type UseActivityHistoryResult = ReturnType<typeof useActivityHistory>;
