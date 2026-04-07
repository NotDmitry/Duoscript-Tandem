import { Box, Paper, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import type { LessonView } from '@models/lessonModel';

interface LessonCardProps {
  lesson: LessonView;
  index: number;
  onClick: (lesson: LessonView) => void;
}

export function LessonCard({ lesson, index, onClick }: LessonCardProps) {
  return (
    <Paper
      onClick={() => {
        onClick(lesson);
      }}
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderRadius: 3,
        border: '1px solid #e0e0e0',
        backgroundColor: '#fafafa',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: '#f3f3f3',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Typography
        variant="body2"
        color="text.disabled"
        sx={{ minWidth: 24, textAlign: 'center', fontWeight: 500 }}
      >
        {index + 1}
      </Typography>

      <Box flexGrow={1}>
        <Typography variant="subtitle2" fontWeight={600}>
          {lesson.title}
        </Typography>
        {lesson.description && (
          <Typography variant="body2" color="text.secondary">
            {lesson.description}
          </Typography>
        )}
      </Box>

      {lesson.isCompleted ? (
        <CheckCircleIcon sx={{ color: '#81c784', flexShrink: 0 }} />
      ) : (
        <RadioButtonUncheckedIcon sx={{ color: '#e0e0e0', flexShrink: 0 }} />
      )}
    </Paper>
  );
}
