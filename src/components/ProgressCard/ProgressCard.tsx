import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
} from '@mui/material';

export interface ProgressCardProps {
  progress: number;
}

export default function ProgressCard({ progress }: ProgressCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 4,
        borderColor: '#dcdcdc',
        backgroundColor: '#fafafa',
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Progress
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              flex: 1,
              height: 12,
              borderRadius: 6,
              backgroundColor: '#e5e5e5',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#e6a46a',
              },
            }}
          />
          <Typography variant="body2">{progress}%</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
