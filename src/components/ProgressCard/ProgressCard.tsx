import LinearProgress from '@mui/material/LinearProgress';

export interface ProgressCardProps {
  progress: number;
}

export default function ProgressCard({ progress }: ProgressCardProps) {
  return (
    <div className="progress-card">
      <h3>Progress</h3>
      <LinearProgress variant="determinate" value={progress} />
      <p>{progress}%</p>
    </div>
  );
}
