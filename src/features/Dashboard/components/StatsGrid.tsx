import type { DashboardData } from '@/features/Dashboard/Dashboard.types.ts';
import StatCard from '@/components/StatCard/StatCard.tsx';

export interface Props {
  data: DashboardData;
}

export default function StatsGrid({ data }: Props) {
  return (
    <div className="stats-grid">
      <h3>Learning Today:</h3>
      <StatCard title="Minutes" value={data.learningToday.minutes} />
      <StatCard title="Activities" value={data.learningToday.activities} />
      <StatCard title="Streak" value={data.learningToday.streak} />
    </div>
  );
}
