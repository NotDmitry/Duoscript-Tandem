import { Box, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router';
import { useActivityHistory } from '@features/Dashboard/useActivityHistory';
import { useAuth } from '@hooks/useAuth';
import { useDashboard } from '@features/Dashboard/useDashboard';
import ProgressCard from '@components/ProgressCard/ProgressCard';
import StatsGrid from '@features/Dashboard/components/StatsGrid';
import RecentActivity from '@features/Dashboard/components/RecentActivity';
import { Loader } from '@components/Loader/Loader.tsx';

function Dashboard() {
  const { user } = useAuth();
  const uid = user?.uid ?? '';

  const {
    dashboardData,
    isLoading: dashboardLoading,
    error: dashboardError,
  } = useDashboard(uid);

  const itemsPerPage = 3;
  const {
    activities,
    page,
    setPage,
    totalPages,
    isLoading: activitiesLoading,
    error,
  } = useActivityHistory(uid, itemsPerPage);

  const handlePrevPage = (): void => {
    setPage((prev) => prev - 1);
  };

  const handleNextPage = (): void => {
    setPage((prev) => prev + 1);
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
            {dashboardLoading ? (
              <Loader padding={4} ariaLabel="Loading dashboard" />
            ) : dashboardError ? (
              <Typography color="error">{dashboardError}</Typography>
            ) : (
              dashboardData && (
                <>
                  <ProgressCard progress={dashboardData.progressPercent} />
                  <StatsGrid data={dashboardData} />
                  <Box>
                    <Button
                      component={Link}
                      to="/library"
                      variant="contained"
                      sx={{
                        color: '#ffffff',
                        '&:hover': {
                          backgroundColor: '#4287ec',
                        },
                      }}
                    >
                      Start Practice
                    </Button>
                  </Box>
                </>
              )
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
              <Loader padding={4} ariaLabel="Loading activities" />
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <>
                <RecentActivity activities={activities} />
                <Box display="flex" justifyContent="center">
                  {totalPages > 1 && (
                    <Box display="flex" alignItems="center" gap={2}>
                      <Button
                        size="small"
                        variant="outlined"
                        disabled={page <= 1 || activitiesLoading}
                        onClick={handlePrevPage}
                      >
                        Prev
                      </Button>
                      <Typography variant="body2" color="text.secondary">
                        {page} / {totalPages}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        disabled={page >= totalPages || activitiesLoading}
                        onClick={handleNextPage}
                      >
                        Next
                      </Button>
                    </Box>
                  )}
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
