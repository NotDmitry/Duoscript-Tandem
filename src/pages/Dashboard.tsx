import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import ProgressCard from '@/components/ProgressCard/ProgressCard';
import StatsGrid from '../features/Dashboard/components/StatsGrid';
import RecentActivity from '../features/Dashboard/components/RecentActivity';
import { dashboardMock } from '../features/Dashboard/Dashboard.mock';

function Dashboard() {
  return (
    <Box p={3}>
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontWeight: 500,
        }}
      >
        Hello, username.
      </Typography>

      <Grid container spacing={5}>
        {/* Left column */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container direction="column" spacing={3}>
            <ProgressCard progress={dashboardMock.progress} />
            <StatsGrid data={dashboardMock} />
          </Grid>
        </Grid>

        {/* Right column */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container direction="column" spacing={5}>
            <RecentActivity activities={dashboardMock.recentActivity} />
            <Box>Pagination component</Box>
          </Grid>
        </Grid>
      </Grid>

      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button variant="contained">Start Practice</Button>
      </Box>
    </Box>
  );
}

export default Dashboard;
