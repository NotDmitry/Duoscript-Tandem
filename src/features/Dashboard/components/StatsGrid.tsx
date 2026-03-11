import { dashboardMock } from '../Dashboard.mock.ts';

function StatsGrid() {
  return (
    <div className="stats-grid">
      <div>
        <div>Progress: {dashboardMock.progress}%</div>
      </div>
      <div>
        <h2>Learning Today:</h2>
        <div>Minutes: {dashboardMock.learningToday.minutes}</div>
        <div>Activities: {dashboardMock.learningToday.activities}</div>
        <div>Streak: {dashboardMock.learningToday.streak}</div>
      </div>
    </div>
  );
}

export default StatsGrid;
