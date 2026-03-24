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
import {
  type AnswerColor,
  type AsyncSorterTask,
  type DropZones,
} from './types';
import { useAsyncSorter } from '@/shared/hooks/useAsyncSorter';
import AsyncSorterContainer from './AsyncSorterContainer';
import { useDragAndDrop } from '@/shared/hooks/useDragAndDrop';
import { getAsyncSortTasksNumber } from '@/api/asyncSort.api';
import { AsyncSorterResults } from './AsyncSorterResults';

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
    determineAnswerColor,
    isCorrectAnswer,
    setAnswer,
    handleDragEnd,
    allDragged /* setMacrotasksItems , */,
  } = useDragAndDrop();
  const [taskIndex, setTaskIndex] = useState(0);
  const [isCorrectSolved, setIsCorrectSolved] = useState(false);
  const [isIncorrectSolved, setIsIncorrectSolved] = useState(false);
  const [task, setTask] = useState<null | AsyncSorterTask>(null);
  const [tasksNumber, setTasksNumber] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [successfulTasks, setSuccessfulTasks] = useState<
    Map<number, AsyncSorterTask>
  >(new Map());
  const [failedTasks, setFailedTasks] = useState<Map<number, AsyncSorterTask>>(
    new Map()
  );
  const [answersColorSchema, setAnswersColorSchema] =
    useState<AnswerColor | null>(null);
  const { getAsyncSortTask, isLoading } = useAsyncSorter();

  useEffect(() => {
    let cancelled = false;
    const loadTask = async () => {
      try {
        const taskData = await getAsyncSortTask(taskIndex);
        setAnswer(taskData?.answer);
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
  }, [getAsyncSortTask, taskIndex, setCurrentTask, setAnswer]);
  const checkIsCompleted = (successLength: number, failLength: number) => {
    if (successLength + failLength === tasksNumber) {
      setIsCompleted(true);
    }
  };
  const onSubmitClick = async () => {
    if (!task) return;
    try {
      const result = await isCorrectAnswer(task.id);
      setIsCorrectSolved(result);
      if (result) {
        setAnswersColorSchema(determineAnswerColor());
        const newMap = new Map(successfulTasks);
        newMap.set(taskIndex, task);
        setSuccessfulTasks(newMap);
      } else {
        setIsIncorrectSolved(true);
        const newMap = new Map(failedTasks);
        newMap.set(taskIndex, task);
        setFailedTasks(newMap);
        setAnswersColorSchema(determineAnswerColor());
      }
      setIsSubmitClicked(true);
    } catch {
      throw new Error('something went wrong');
    }
  };
  const onNextTaskClick = () => {
    checkIsCompleted(successfulTasks.size, failedTasks.size);

    clearZones();
    setDraggedItem(null);
    setAllDragged(false);
    setIsSubmitClicked(false);
    setIsCorrectSolved(false);
    setIsIncorrectSolved(false);
    if (tasksNumber > taskIndex + 1) setTaskIndex(taskIndex + 1);
  };

  if (isLoading) {
    return (
      <AsyncSorterContainer>
        <CircularProgress sx={{ mt: 3 }} />
      </AsyncSorterContainer>
    );
  }
  if (isCompleted) {
    return (
      <AsyncSorterContainer>
        <AsyncSorterResults
          solvedTasks={successfulTasks}
          unsolvedTasks={failedTasks}
        ></AsyncSorterResults>
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
  const dropZones: DropZones[] = [
    {
      zone: 'Call Stack',
      title: 'Call Stack',
      items: callStackItems,
      answerColors: answersColorSchema?.callStackBlock,
    },
    {
      zone: 'Microtasks',
      title: 'Microtasks',
      items: microtasksItems,
      answerColors: answersColorSchema?.microBlock,
    },
    {
      zone: 'Macrotasks',
      title: 'Macrotasks',
      items: macrotasksItems,
      answerColors: answersColorSchema?.macroBlock,
    },
  ];
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
            {task.blocks.map((item) => {
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
                  onDragEnd={handleDragEnd}
                  elevation={3}
                  sx={{
                    p: '10px',
                    background: isDragging ? '#cbcbcb' : 'white',
                  }}
                  key={item.id}
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
          {dropZones.map(({ zone, title, items, answerColors }) => (
            <Grid size={{ xs: 4 }} key={zone}>
              <Paper
                sx={{
                  backgroundColor: draggedItem ? '#56f6565b' : '#f0f0f0',
                }}
              >
                <Typography sx={{ fontWeight: 800, textAlign: 'center' }}>
                  {title}
                </Typography>
                <Stack
                  direction="row"
                  spacing={items.length < 5 ? 1 : 0}
                  onDragOver={handleDragOver}
                  onDragEnd={handleDragEnd}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleDrop(zone); // изменить, добавить число индекс куда вставить элемент
                  }}
                  sx={{ p: 1, minHeight: 60 }}
                >
                  {items.map((item, index) => (
                    <Paper
                      key={item.id}
                      draggable={!isSubmitClicked}
                      onDragStart={() => {
                        if (!isSubmitClicked) handleDragStart(item);
                      }}
                      onDragOver={handleDragOver}
                      onDragEnd={handleDragEnd}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDrop(zone); // изменить, добавить число индекс куда вставить элемент
                      }}
                      elevation={3}
                      sx={{
                        p: '10px',
                        backgroundColor: isSubmitClicked
                          ? answerColors?.[index]
                          : '',
                      }}
                    >
                      {item.label}
                    </Paper>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          ))}
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
        {isCorrectSolved && (
          <Typography color="success">Your answer is correct</Typography>
        )}
        {isIncorrectSolved && (
          <Typography color="error">Your answer is incorrect</Typography>
        )}
      </Container>
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button
            disabled={isSubmitClicked}
            onClick={() => {
              clearZones();
              setDraggedItem(null);
              setAllDragged(false);
              const newMap = new Map(failedTasks);
              newMap.set(taskIndex, task);
              setFailedTasks(newMap);

              checkIsCompleted(successfulTasks.size, newMap.size);
              if (tasksNumber > taskIndex + 1) {
                setTaskIndex(taskIndex + 1);
              }
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
