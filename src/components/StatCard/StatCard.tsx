import { Card, CardContent, Typography } from '@mui/material';

export interface StatCardProps {
  title: string;
  value: string | number;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 120,
        borderRadius: 4,
        borderColor: '#dcdcdc',
        backgroundColor: '#fafafa',
      }}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h6">{value}</Typography>
      </CardContent>
    </Card>
  );
}
