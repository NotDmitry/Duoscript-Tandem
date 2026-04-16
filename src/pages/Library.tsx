import { Box, Grid, Typography } from '@mui/material';
import { useCoursesWithProgress } from '@features/Library/useCourses';
import { CourseProgressCard } from '@features/Library/components/CourseProgressCard.tsx';
import { Loader } from '@components/Loader/Loader';
import { useAuth } from '@hooks/useAuth.ts';
import { useNavigate } from 'react-router';
import type { CourseWithProgressView } from '@models/courseModel';

function Library() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { courses, isLoading, error } = useCoursesWithProgress(user?.uid ?? '');

  const handleCourseClick = (course: CourseWithProgressView): void => {
    navigate(`/library/${course.courseId}`, {
      state: { courseTitle: course.title },
    });
  };

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

      {isLoading && <Loader />}

      {error && <Typography color="error">{error}</Typography>}

      {!isLoading && !error && (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid key={course.courseId} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <CourseProgressCard
                course={course}
                onClick={() => {
                  handleCourseClick(course);
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Library;
