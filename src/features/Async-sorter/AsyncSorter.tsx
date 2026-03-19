import { getAsyncSortTask } from '@/api/asyncSort.api';
import {
  Box,
  Typography,
  Grid,
  Stack,
  Container,
  Paper,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { AsyncSorterTask } from './types';

export default function AsyncSorter() {
  const [taskIndex, setTaskIndex] = useState(0);
  const [task, setTask] = useState<null | AsyncSorterTask>(null);
  useEffect(() => {
    let cancelled = false;
    const loadTask = async () => {
      try {
        const taskData = await getAsyncSortTask(taskIndex);
        if (!cancelled) {
          setTask(taskData ?? null);
        }
      } catch {
        if (!cancelled) setTask(null);
      }
    };
    void loadTask();

    return () => {
      cancelled = true;
    };
  }, [taskIndex]);
  if (!task) {
    return (
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          component="h4"
          gutterBottom
          sx={{ textAlign: 'center', m: 2 }}
        >
          Async Sorter
        </Typography>
        <Typography gutterBottom sx={{ textAlign: 'center', m: 2 }}>
          The task can't be shown
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        sx={{ textAlign: 'center', m: 2 }}
      >
        Async Sorter
      </Typography>
      <Typography gutterBottom sx={{ textAlign: 'center', m: 2 }}>
        In what order will 'console.log' be output?
      </Typography>
      <Container>
        <Paper square={false} sx={{ p: 3, backgroundColor: '#f0f0f0' }}>
          <Stack spacing={1}>
            {task.codeSnippet.map((item, index) => {
              return <Box key={index}>{item}</Box>;
            })}
          </Stack>
        </Paper>
      </Container>
      <Typography gutterBottom sx={{ textAlign: 'center', m: 2 }}>
        Drag the blocks into the correct queues:
      </Typography>
      <Container>
        <Paper square={false} sx={{ p: 3, backgroundColor: '#f0f0f0' }}>
          <Stack direction="row" spacing={2}>
            {task.blocks.map((item, index) => {
              return (
                <Paper draggable elevation={3} sx={{ p: 2 }} key={index}>
                  {item.label}
                </Paper>
              );
            })}
          </Stack>
        </Paper>
      </Container>

      <Box sx={{ m: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 4 }}>
            <Paper sx={{ backgroundColor: '#f0f0f0' }}>
              <Typography sx={{ fontWeight: 800, textAlign: 'center' }}>
                Call Stack
              </Typography>
              <Box sx={{ p: 1, height: 80 }}></Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Paper sx={{ backgroundColor: '#f0f0f0' }}>
              <Typography sx={{ fontWeight: 800, textAlign: 'center' }}>
                Microtasks
              </Typography>
              <Box sx={{ p: 1, height: 80 }}></Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Paper sx={{ backgroundColor: '#f0f0f0' }}>
              <Typography sx={{ fontWeight: 800, textAlign: 'center' }}>
                Macrotasks
              </Typography>
              <Box sx={{ p: 1, height: 80 }}></Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Container>
        <Typography>Final order of output:</Typography>
        <Paper sx={{ p: 1, mb: 2, backgroundColor: '#f0f0f0' }}>
          Example: 1 2 3 4
        </Paper>
      </Container>
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button
            onClick={() => {
              setTaskIndex(taskIndex + 1);
            }}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Skip
          </Button>
          <Button variant="outlined">Submit</Button>
        </Box>
        <Box>
          <Button variant="contained">Run Loop</Button>
        </Box>
      </Container>
    </Container>
  );
}
