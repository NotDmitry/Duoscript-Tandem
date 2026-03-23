import { Container, Typography } from '@mui/material';
interface AsyncSorterResultsProps {
  solvedTasks: number[];
  unsolvedTasks: number[];
}

export function AsyncSorterResults({
  solvedTasks,
  unsolvedTasks,
}: AsyncSorterResultsProps) {
  return (
    <Container>
      <Typography>{...solvedTasks}</Typography>
      <Typography>{...unsolvedTasks}</Typography>
    </Container>
  );
}
