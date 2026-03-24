import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    <Container sx={{ textAlign: 'center' }}>
      <Paper>
        <Typography color="success" sx={{ textAlign: 'center', m: 2, pt: 2 }}>
          Correct solved tasks
        </Typography>
        {Array.from(solvedTasks).map((item) => {
          return (
            <Accordion key={item[0]}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">Task #{item[0] + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {item[1].codeSnippet.map((item, index) => {
                  return <Box key={index}>{item}</Box>;
                })}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Paper>

      <Paper>
        <Typography color="error" sx={{ textAlign: 'center', m: 2, pt: 2 }}>
          {' '}
          Incorrect solved or skipped tasks
        </Typography>
        {Array.from(unsolvedTasks).map((item) => {
          return (
            <Accordion key={item[0]}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">Task #{item[0] + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {item[1].codeSnippet.map((item, index) => {
                  return <Box key={index}>{item}</Box>;
                })}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Paper>
      <Button variant="contained" sx={{ mt: 3, display: 'inline-block' }}>
        Repeat challenge
      </Button>
    </Container>
  );
}
