import { Box, Button, Grid, Typography, Pagination } from '@mui/material';
import { Link } from 'react-router';
import { useActivityHistory } from '@features/Dashboard/useActivityHistory';
import { useAuth } from '@hooks/useAuth';
import { useDashboard } from '@features/Dashboard/useDashboard';
import ProgressCard from '@components/ProgressCard/ProgressCard';
import StatsGrid from '@features/Dashboard/components/StatsGrid';
import RecentActivity from '@features/Dashboard/components/RecentActivity';

function Dashboard() {
  const { user } = useAuth();
  const uid = user?.uid ?? '';

  const { dashboardData, loading: dashboardLoading } = useDashboard(uid);

  const itemsPerPage = 3;
  const {
    activities,
    page,
    setPage,
    totalPages,
    loading: activitiesLoading,
    error,
  } = useActivityHistory(uid, itemsPerPage);

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
            {user?.displayName ?? ''}.
          </Typography>
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left column */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container direction="column" spacing={6}>
            {!dashboardLoading && dashboardData && (
              <>
                <ProgressCard progress={dashboardData.progressPercent} />
                <StatsGrid data={dashboardData} />
              </>
            )}
          </Grid>
        </Grid>

        {/* Right column */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid
            container
            direction="column"
            spacing={5}
            sx={{ minHeight: '52vh' }}
          >
            {activitiesLoading ? (
              <Typography>Loading activities...</Typography>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <>
                <RecentActivity activities={activities} />
                <Box display="flex" justifyContent="center">
                  {totalPages > 1 && (
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      shape="rounded"
                      disabled={activitiesLoading}
                    />
                  )}
                </Box>
              </>
            )}
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
