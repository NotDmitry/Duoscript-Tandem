import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router';
import { useLessons } from '@features/Library/useLessons';
import { LessonCard } from '@features/Library/components/LessonCard';
import { AppLink } from '@components/AppLink/AppLink';
import type { LessonView } from '@models/lessonModel';

function CourseLessons() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { lessons, isLoading, error } = useLessons(courseId ?? '');

  const handleLessonClick = (lesson: LessonView): void => {
    navigate(`/library/${courseId ?? ''}/lessons/${lesson.lessonId}`, {
      state: { lesson },
    });
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: 1, md: 800 },
        mx: 'auto',
        px: 3,
        py: 5,
      }}
    >
      <Box display="flex" alignItems="center" gap={1} mb={4}>
        <ArrowBackIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
        <AppLink linkLabel="Back to Library" linkHref="/library" />
      </Box>

      {isLoading && (
        <Box display="flex" justifyContent="center" p={6}>
          <CircularProgress />
        </Box>
      )}

      {error && <Typography color="error">{error}</Typography>}

      {!isLoading && !error && (
        <>
          <Typography variant="h5" fontWeight={500} mb={4}>
            Lessons
          </Typography>
          {lessons.length === 0 ? (
            <Typography color="text.secondary">No lessons yet.</Typography>
          ) : (
            <Stack spacing={2}>
              {lessons.map((lesson, index) => (
                <LessonCard
                  key={lesson.lessonId}
                  lesson={lesson}
                  index={index}
                  onClick={handleLessonClick}
                />
              ))}
            </Stack>
          )}
        </>
      )}
    </Box>
  );
}

export default CourseLessons;
