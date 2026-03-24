import { Container, Typography, Paper, Button } from '@mui/material';
import type { AsyncSorterTask } from './types';
interface AsyncSorterResultsProps {
  solvedTasks: Map<number, AsyncSorterTask>;
  unsolvedTasks: Map<number, AsyncSorterTask>;
}

export function AsyncSorterResults({
  solvedTasks,
  unsolvedTasks,
}: AsyncSorterResultsProps) {
  return (
    <Container>
      <Paper>
        <Typography sx={{ textAlign: 'center', m: 2 }}>
          {' '}
          Correct solved tasks
        </Typography>
        {Array.from(solvedTasks).map((item) => {
          return (
            <Typography key={item[0]}>{item[1].answer.outputOrder}</Typography>
          );
        })}
      </Paper>

      <Paper>
        <Typography sx={{ textAlign: 'center', m: 2 }}>
          {' '}
          Incorrect solved or skipped tasks
        </Typography>
        {Array.from(unsolvedTasks).map((item) => {
          return (
            <Typography key={item[0]}>{item[1].answer.outputOrder}</Typography>
          );
        })}
      </Paper>
      <Button>Repeat challenge</Button>
    </Container>
  );
}
