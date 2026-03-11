import ProgressCard from '../components/ProgressCard/ProgressCard.tsx';
import StatsGrid from '../features/Dashboard/components/StatsGrid.tsx';
import RecentActivity from '../features/Dashboard/components/RecentActivity.tsx';
import { dashboardMock } from '../features/Dashboard/Dashboard.mock.ts';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <ProgressCard progress={dashboardMock.progress} />
      <StatsGrid data={dashboardMock} />
      <RecentActivity activities={dashboardMock.recentActivity} />
    </div>
  );
}

export default Dashboard;
