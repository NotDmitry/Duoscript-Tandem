export interface StatCardProps {
  title: string;
  value: string | number;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="stat-card">
      <h4>
        {title}: {value}
      </h4>
    </div>
  );
}
