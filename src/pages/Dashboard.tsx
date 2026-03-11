import StatsGrid from '../features/Dashboard/components/StatsGrid.tsx';
import RecentActivity from '@/features/Dashboard/components/RecentActivity.tsx';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <StatsGrid />
      <RecentActivity />
    </div>
  );
}

export default Dashboard;
