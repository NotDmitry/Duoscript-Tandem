import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from '@mui/material';
import type { CourseWithProgressView, CourseTag } from '@models/courseModel';

const TAG_COLORS: Record<CourseTag, string> = {
  js: '#f7df1e',
  ts: '#3178c6',
  css: '#264de4',
  html: '#e34c26',
  github: '#333333',
  algorithms: '#e94f4e',
};

interface CourseProgressCardProps {
  course: CourseWithProgressView;
  onClick: () => void;
}

export function CourseProgressCard({
  course,
  onClick,
}: CourseProgressCardProps) {
  const tagColor = TAG_COLORS[course.tag];

  return (
    <Card
      onClick={onClick}
      variant="outlined"
      sx={{
        borderRadius: 4,
        border: 'none',
        backgroundColor: '#fafafa',
        boxShadow: '0 0 24px 1px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          p: 3,
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: tagColor,
              flexShrink: 0,
            }}
          />
          <Typography variant="h6" fontWeight={600} lineHeight={1.2}>
            {course.title}
          </Typography>
        </Box>

        {course.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            lineHeight={1.6}
            flexGrow={1}
          >
            {course.description}
          </Typography>
        )}

        <Box>
          <Box display="flex" justifyContent="space-between" mb={0.5}>
            <Typography variant="caption" color="text.secondary">
              {course.completedLessonsCount} / {course.lessonCount} lessons
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {course.progressPercent}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={course.progressPercent}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: '#e5e5e5',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#e6a46a',
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
