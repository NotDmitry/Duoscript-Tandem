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
import { getAsyncSortTasksNumber } from '@/api/asyncSort.api';

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
    setAllDragged,
    /* setMicrotasksItems, */ macrotasksItems,
    output,
    isCorrectAnswer,
    allDragged /* setMacrotasksItems , */,
  } = useDragAndDrop();
  const [taskIndex, setTaskIndex] = useState(0);
  const [isCorrectSolved, setIsCorrectSolved] = useState(false);
  const [task, setTask] = useState<null | AsyncSorterTask>(null);
  const [tasksNumber, setTasksNumber] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [doneTasks, setDoneTasks] = useState<number[]>([]);
  const [missedTasks, setMissedTasks] = useState<number[]>([]);
  const { getAsyncSortTask, isLoading } = useAsyncSorter();

  useEffect(() => {
    let cancelled = false;
    const loadTask = async () => {
      try {
        const taskData = await getAsyncSortTask(taskIndex);
        const tasksArrayNumber = await getAsyncSortTasksNumber();
        if (!cancelled) {
          setTask(taskData ?? null);
          setCurrentTask(taskData ?? null);
          setTasksNumber(tasksArrayNumber);
        }
      } catch {
        if (!cancelled) setTask(null);
      }
    };
    void loadTask();

    return () => {
      cancelled = true;
    };
  }, [getAsyncSortTask, taskIndex, setCurrentTask]);
  const checkIsCompleted = () => {
    if (doneTasks.length + missedTasks.length === tasksNumber) {
      setIsCompleted(true);
    }
  };
  const onSubmitClick = async () => {
    if (!task) return;
    try {
      const result = await isCorrectAnswer(task.id);
      setIsCorrectSolved(result);
      if (result) setDoneTasks([...doneTasks, task.id]);
    } catch {
      throw new Error('something went wrong');
    } finally {
      setIsSubmitClicked(true);
    }
  };
  const onNextTaskClick = () => {
    checkIsCompleted();
    if (tasksNumber > taskIndex + 1) setTaskIndex(taskIndex + 1);
    clearZones();
    setDraggedItem(null);
    setAllDragged(false);
    setIsSubmitClicked(false);
  };

  if (isLoading) {
    return (
      <AsyncSorterContainer>
        <CircularProgress sx={{ mt: 3 }} />
      </AsyncSorterContainer>
    );
  }
  if (isCompleted) {
    return <AsyncSorterContainer>Good job</AsyncSorterContainer>;
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
                      sx={{
                        p: '10px',
                        backgroundColor: isCorrectSolved ? 'green' : '',
                      }}
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
                      sx={{
                        p: '10px',
                        backgroundColor: isCorrectSolved ? 'green' : '',
                      }}
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
                      sx={{
                        p: '10px',
                        backgroundColor: isCorrectSolved ? 'green' : '',
                      }}
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
        <Paper sx={{ p: 1, mb: 2, backgroundColor: '#f0f0f0', minHeight: 40 }}>
          {allDragged &&
            output.map((item) => {
              return item + '  ';
            })}
        </Paper>
      </Container>
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button
            disabled={isSubmitClicked}
            onClick={() => {
              if (tasksNumber > taskIndex + 1) {
                setTaskIndex(taskIndex + 1);
              }
              clearZones();
              setDraggedItem(null);
              setAllDragged(false);
              setMissedTasks([...missedTasks, task.id]);
              checkIsCompleted();
            }}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Skip
          </Button>
          <Button
            variant="outlined"
            disabled={!allDragged}
            onClick={
              !isSubmitClicked
                ? () => {
                    void onSubmitClick();
                  }
                : () => {
                    onNextTaskClick();
                  }
            }
          >
            {isSubmitClicked ? 'Next Task' : 'Submit'}
          </Button>
        </Box>
        <Box>
          <Button variant="contained">Run Loop</Button>
        </Box>
      </Container>
    </AsyncSorterContainer>
  );
}
