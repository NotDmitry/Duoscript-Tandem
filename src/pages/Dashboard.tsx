import { Box, Button, Grid, Typography, Pagination } from '@mui/material';
import { Link } from 'react-router';
import { useState } from 'react';

import ProgressCard from '@/components/ProgressCard/ProgressCard';
import StatsGrid from '../features/Dashboard/components/StatsGrid';
import RecentActivity from '../features/Dashboard/components/RecentActivity';
import { dashboardMock } from '../features/Dashboard/Dashboard.mock';
import type { ActivityItem } from '@/features/Dashboard/Dashboard.types.ts';

function Dashboard() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const startIndex: number = (page - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;

  const paginatedActivities: ActivityItem[] =
    dashboardMock.recentActivity.slice(startIndex, endIndex);

  const pageCount: number = Math.ceil(
    dashboardMock.recentActivity.length / itemsPerPage
  );

  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: 1, md: 1300, xl: 1600 },
        mx: 'auto',
        px: 3,
        py: 3,
      }}
    >
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
          }}
        >
          Hello,{' '}
          <Typography
            variant="h5"
            component="span"
            sx={{ color: '#e94f4e', fontWeight: 600 }}
          >
            {dashboardMock.user.username}.
          </Typography>
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left column */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container direction="column" spacing={6}>
            <ProgressCard progress={dashboardMock.progress} />
            <StatsGrid data={dashboardMock} />
          </Grid>
        </Grid>

        {/* Right column */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container direction="column" spacing={5}>
            <RecentActivity activities={paginatedActivities} />
            <Box display="flex" justifyContent="center">
              <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                shape="rounded"
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Box mt={4} display="flex" justifyContent="flex-start">
        <Button
          component={Link}
          to="/library"
          variant="contained"
          sx={{
            backgroundColor: '#377732',
            color: '#ffffff',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: '#2e642a',
            },
          }}
        >
          Start Practice
        </Button>
      </Box>
    </Box>
  );
}

export default Dashboard;
