import type { ActivityItem } from '../Dashboard.types.ts';

export interface Props {
  activities: ActivityItem[];
}

export default function RecentActivity({ activities }: Props) {
  return (
    <div>
      <h3>Recent Activity</h3>
      {activities.length === 0 ? (
        <p>No recent activity</p>
      ) : (
        <ul>
          {activities.map((item) => (
            <li key={item.id}>
              <strong>{item.course}</strong> - {item.widget} ({item.type}) :{' '}
              {item.score}/{item.maxScore} [{item.status}] - {item.createdAt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
