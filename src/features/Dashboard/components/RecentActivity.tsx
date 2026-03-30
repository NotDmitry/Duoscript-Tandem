import { Box, Typography, Stack } from '@mui/material';
import type { ActivityView } from '@/shared/models/activityModel';

export interface Props {
  activities: ActivityView[];
}

export default function RecentActivity({ activities }: Props) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Recent Activity
      </Typography>

      {activities.length === 0 ? (
        <Typography variant="body2">No recent activity</Typography>
      ) : (
        <Stack spacing={2}>
          {activities.map((item) => (
            <Box
              key={item.id}
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 3,
                p: 2,
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
              <Typography variant="subtitle2" fontWeight={600}>
                {item.courseTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.lessonTitle} ({item.widgetType})
              </Typography>
              <Typography variant="body2">
                Score: {item.score}/{item.maxScore}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(item.createdAt).toLocaleString()} • {item.status}
              </Typography>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
