import { Box, Typography, Grid } from '@mui/material';
import type { DashboardData } from '@/features/Dashboard/Dashboard.types';
import StatCard from '@/components/StatCard/StatCard';

export interface Props {
  data: DashboardData;
}

export default function StatsGrid({ data }: Props) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Learning Today
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 4 }}>
          <StatCard title="Minutes" value={data.learningToday.minutes} />
        </Grid>
        <Grid size={{ xs: 4 }}>
          <StatCard title="Activities" value={data.learningToday.activities} />
        </Grid>
        <Grid size={{ xs: 4 }}>
          <StatCard title="Streak" value={data.learningToday.streak} />
        </Grid>
      </Grid>
    </Box>
  );
}
