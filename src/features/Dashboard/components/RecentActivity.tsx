import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import type { ActivityItem } from '../Dashboard.types';

export interface Props {
  activities: ActivityItem[];
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
        <List dense>
          {activities.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={`${item.course} - ${item.widget} (${item.type})`}
                secondary={
                  <span>
                    {item.score}/{item.maxScore} [{item.status}] -{' '}
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
