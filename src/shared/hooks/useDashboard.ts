import { useState, useEffect } from 'react';
import { getUserDashboard } from '@/api/dashboard.api';
import type { UserDashboardView } from '@/shared/models/userModel';

export function useDashboard(uid: string) {
  const [dashboardData, setDashboardData] = useState<UserDashboardView | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect((): void => {
    if (!uid) return;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserDashboard(uid);
        setDashboardData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load dashboard');
        }
      } finally {
        setLoading(false);
      }
    }
    void fetchData();
  }, [uid]);

  return { dashboardData, loading, error };
}
