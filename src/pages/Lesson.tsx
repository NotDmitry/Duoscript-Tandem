import { Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from 'react-router';
import { useLesson } from '@features/Library/useLesson';
import { useCompleteLesson } from '@features/Library/useCompleteLesson';
import { WidgetRenderer } from '@features/Library/components/WidgetRenderer';
import { AppLink } from '@components/AppLink/AppLink';
import { Loader } from '@components/Loader/Loader';
import { useAuth } from '@hooks/useAuth';
import { useCallback } from 'react';

function Lesson() {
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();

  const { user } = useAuth();
  const { lesson, courseTitle, isLoading, error } = useLesson(
    courseId ?? '',
    lessonId ?? ''
  );

  const { onComplete } = useCompleteLesson(user?.uid ?? '', courseTitle);

  const handleComplete = useCallback(() => {
    if (lesson) void onComplete(lesson);
  }, [lesson, onComplete]);

  return (
    <Box
      sx={{
        maxWidth: { xs: 1, md: 1300, xl: 1600 },
        mx: 'auto',
        px: 3,
        py: 5,
      }}
    >
      <Box display="flex" alignItems="center" gap={1} mb={4}>
        <ArrowBackIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
        <AppLink
          linkLabel="Back to lessons"
          linkHref={`/library/${courseId ?? ''}`}
        />
      </Box>

      {isLoading && <Loader />}

      {error && <Typography color="error">{error}</Typography>}

      {!isLoading && !error && lesson && (
        <Box>
          <Typography variant="h5" fontWeight={500} mb={1}>
            {lesson.title}
          </Typography>
          {lesson.description && (
            <Typography variant="body2" color="text.secondary" mb={4}>
              {lesson.description}
            </Typography>
          )}
          <WidgetRenderer lesson={lesson} onComplete={handleComplete} />
        </Box>
      )}
    </Box>
  );
}

export default Lesson;
