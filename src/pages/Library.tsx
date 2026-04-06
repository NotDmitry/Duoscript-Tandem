import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useCourses } from '@features/Library/useCourses';
import { CourseCard } from '@features/Library/components/CourseCard';

function Library() {
  const { courses, isLoading, error } = useCourses();

  return (
    <Box
      sx={{
        maxWidth: { xs: 1, md: 1300, xl: 1600 },
        mx: 'auto',
        px: 3,
        py: 5,
      }}
    >
      <Typography variant="h5" fontWeight={500} mb={4}>
        Library
      </Typography>

      {isLoading && (
        <Box display="flex" justifyContent="center" p={6}>
          <CircularProgress />
        </Box>
      )}

      {error && <Typography color="error">{error}</Typography>}

      {!isLoading && !error && (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid key={course.courseId} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Library;
