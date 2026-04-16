import { Card, CardContent, Typography } from '@mui/material';

export interface StatCardProps {
  title: string;
  value: string | number;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <Card
      variant="outlined"
      aria-label={`${title}: ${String(value)}`}
      sx={{
        minWidth: { xs: 0, sm: 120 },
        borderRadius: 4,
        borderColor: '#dcdcdc',
        backgroundColor: '#fafafa',
      }}
    >
      <CardContent
        sx={{
          textAlign: 'center',
          padding: { xs: '8px 4px !important', sm: '16px !important' },
        }}
      >
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
