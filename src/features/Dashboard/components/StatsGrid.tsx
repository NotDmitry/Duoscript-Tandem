import { Box, Typography, Grid } from '@mui/material';
import type { UserDashboardView } from '@models/userModel';
import StatCard from '@components/StatCard/StatCard';

export interface Props {
  data: UserDashboardView;
}

export default function StatsGrid({ data }: Props) {
  return (
    <Box role="region" aria-label="Learning Today statistics">
      <Typography variant="h6" gutterBottom>
        Learning Today
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 4 }}>
          <StatCard title=" ⏱ Minutes" value={data.minutesSpent} />
        </Grid>
        <Grid size={{ xs: 4 }}>
          <StatCard title="✔ Activities" value={data.activitiesCompleted} />
        </Grid>
        <Grid size={{ xs: 4 }}>
          <StatCard title="🔥 Streak" value={data.currentStreak} />
        </Grid>
      </Grid>
    </Box>
  );
}
