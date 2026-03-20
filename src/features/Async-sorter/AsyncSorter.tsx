import {
  Box,
  Typography,
  Grid,
  Stack,
  Container,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { AsyncSorterTask } from './types';
import { useAsyncSorter } from '@/shared/hooks/useAsyncSorter';
import AsyncSorterContainer from './AsyncSorterContainer';
import { useDragAndDrop } from '@/shared/hooks/useDragAndDrop';

export default function AsyncSorter() {
  const {
    handleDragStart,
    handleDragOver,
    handleDrop,
    callStackItems,
    draggedItem,
    setDraggedItem,
    setCurrentTask,
    /* setCallStackItems, */ clearZones,
    microtasksItems,
    /* setMicrotasksItems, */ macrotasksItems,
    output,
    allDragged /* setMacrotasksItems , */,
  } = useDragAndDrop();
  const [taskIndex, setTaskIndex] = useState(0);
  const [task, setTask] = useState<null | AsyncSorterTask>(null);
  const { getAsyncSortTaskByIndex, isLoading } = useAsyncSorter();

  useEffect(() => {
    let cancelled = false;
    const loadTask = async () => {
      try {
        const taskData = await getAsyncSortTaskByIndex(taskIndex);
        if (!cancelled) {
          setTask(taskData ?? null);
          setCurrentTask(taskData ?? null);
        }
      } catch {
        if (!cancelled) setTask(null);
      }
    };
    void loadTask();

    return () => {
      cancelled = true;
    };
  }, [getAsyncSortTaskByIndex, taskIndex, setCurrentTask]);
  if (isLoading) {
    return (
      <AsyncSorterContainer>
        <CircularProgress sx={{ mt: 3 }} />
      </AsyncSorterContainer>
    );
  }
  if (!task) {
    return (
      <AsyncSorterContainer>
        <Typography gutterBottom sx={{ textAlign: 'center', m: 2 }}>
          The task can't be shown
        </Typography>
      </AsyncSorterContainer>
    );
  }

  return (
    <AsyncSorterContainer>
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
        <Paper
          square={false}
          sx={{ p: 3, backgroundColor: '#f0f0f0', minHeight: 92 }}
        >
          <Stack direction="row" spacing={2}>
            {task.blocks.map((item, index) => {
              if (
                callStackItems.find((csItem) => csItem === item) ||
                microtasksItems.find((miItem) => miItem === item) ||
                macrotasksItems.find((maItem) => maItem === item)
              )
                return null;
              const isDragging = draggedItem?.id === item.id;
              return (
                <Paper
                  draggable
                  onDragStart={() => {
                    handleDragStart(item);
                  }}
                  elevation={3}
                  sx={{
                    p: '10px',
                    background: isDragging ? '#cbcbcb' : 'white',
                  }}
                  key={index}
                >
                  {item.label}
                </Paper>
              );
            })}
          </Stack>
        </Paper>
      </Container>

      <Box sx={{ m: 3, width: '90%' }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 4 }}>
            <Paper sx={{ backgroundColor: '#f0f0f0' }}>
              <Typography sx={{ fontWeight: 800, textAlign: 'center' }}>
                Call Stack
              </Typography>
              <Stack
                direction="row"
                spacing={callStackItems.length < 5 ? 1 : 0}
                onDragOver={handleDragOver}
                onDrop={() => {
                  handleDrop('Call Stack');
                }}
                sx={{ p: 1, minHeight: 60 }}
              >
                {callStackItems.map((item, index) => {
                  return (
                    <Paper
                      draggable
                      onDragStart={() => {
                        handleDragStart(item);
                      }}
                      elevation={3}
                      sx={{ p: '10px' }}
                      key={index}
                    >
                      {item.label}
                    </Paper>
                  );
                })}
              </Stack>
            </Paper>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Paper sx={{ backgroundColor: '#f0f0f0' }}>
              <Typography sx={{ fontWeight: 800, textAlign: 'center' }}>
                Microtasks
              </Typography>
              <Stack
                direction="row"
                spacing={microtasksItems.length < 5 ? 1 : 0}
                onDragOver={handleDragOver}
                onDrop={() => {
                  handleDrop('Microtasks');
                }}
                sx={{ p: 1, minHeight: 60 }}
              >
                {microtasksItems.map((item, index) => {
                  return (
                    <Paper
                      draggable
                      onDragStart={() => {
                        handleDragStart(item);
                      }}
                      elevation={3}
                      sx={{ p: '10px' }}
                      key={index}
                    >
                      {item.label}
                    </Paper>
                  );
                })}
              </Stack>
            </Paper>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Paper sx={{ backgroundColor: '#f0f0f0' }}>
              <Typography sx={{ fontWeight: 800, textAlign: 'center' }}>
                Macrotasks
              </Typography>
              <Stack
                direction="row"
                spacing={macrotasksItems.length < 5 ? 1 : 0}
                onDragOver={handleDragOver}
                onDrop={() => {
                  handleDrop('Macrotasks');
                }}
                sx={{ p: 1, minHeight: 60 }}
              >
                {macrotasksItems.map((item, index) => {
                  return (
                    <Paper
                      draggable
                      onDragStart={() => {
                        handleDragStart(item);
                      }}
                      elevation={3}
                      sx={{ p: '10px' }}
                      key={index}
                    >
                      {item.label}
                    </Paper>
                  );
                })}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Container>
        <Typography>Final order of output:</Typography>
        <Paper sx={{ p: 1, mb: 2, backgroundColor: '#f0f0f0' }}>
          {allDragged &&
            output.map((item) => {
              return <Typography>{item}</Typography>;
            })}
        </Paper>
      </Container>
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button
            onClick={() => {
              setTaskIndex(taskIndex + 1);
              clearZones();
              setDraggedItem(null);
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
    </AsyncSorterContainer>
  );
}
