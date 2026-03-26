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
import { useEffect, useState, useRef } from 'react';
import {
  type AnswerColor,
  type AsyncSorterBlock,
  type AsyncSorterTask,
  type DropIndicator,
  type DropZones,
  type FocusZone,
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
    clearZones,
    microtasksItems,
    setAllDragged,
    macrotasksItems,
    output,
    determineAnswerColor,
    isCorrectAnswer,
    setAnswer,
    handleDragEnd,
    allDragged,
    selectedItem,
    setSelectedItem,
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
  const [dropIndicator, setDropIndicator] = useState<DropIndicator | null>(
    null
  );
  const { getAsyncSortTask, isLoading } = useAsyncSorter();
  const itemRefs = useRef<{
    source: HTMLDivElement[];
    'Call Stack': HTMLDivElement[];
    Microtasks: HTMLDivElement[];
    Macrotasks: HTMLDivElement[];
  }>({
    source: [],
    'Call Stack': [],
    Microtasks: [],
    Macrotasks: [],
  });
  const focusZones: FocusZone[] = [
    'source',
    'Call Stack',
    'Microtasks',
    'Macrotasks',
  ];
  const zoneRefs = useRef<Record<FocusZone, HTMLDivElement | null>>({
    source: null,
    'Call Stack': null,
    Microtasks: null,
    Macrotasks: null,
  });
  const handleItemKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    item: AsyncSorterBlock,
    zone: FocusZone,
    index: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    switch (e.key) {
      case 'Enter':
        setSelectedItem(item);
        setDraggedItem(item);
        break;
      case 'ArrowLeft':
        itemRefs.current[zone][index - 1]?.focus();
        break;
      case 'ArrowRight':
        itemRefs.current[zone][index + 1]?.focus();
        break;
      case 'ArrowUp':
        zoneRefs.current[zone]?.focus();
        break;
    }
  };
  const handleZoneKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    zone: FocusZone,
    insertBefore: number,
    index: number
  ) => {
    const zoneIndex = focusZones.indexOf(zone);

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = focusZones[zoneIndex - 1];
      zoneRefs.current[prev]?.focus();
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = focusZones[zoneIndex + 1];
      zoneRefs.current[next]?.focus();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      itemRefs.current[zone][0]?.focus();
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (zone !== 'source') {
        handleDrop(zone, insertBefore);
      }
      setSelectedItem(null);
    } else handleOtherKeyDown(e, zone, index);
  };
  const handleOtherKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    zone: FocusZone,
    index: number
  ) => {
    const refs = itemRefs.current;
    const zoneOrder: FocusZone[] = ['Call Stack', 'Microtasks', 'Macrotasks'];
    if (e.key === 'ArrowDown') {
      e.preventDefault();

      const currentIndex = zoneOrder.indexOf(zone);
      if (currentIndex === -1 || currentIndex === zoneOrder.length - 1) return;
      const nextZone = zoneOrder[currentIndex + 1];
      const nextList = nextZone === 'source' ? refs.source : refs[nextZone];
      (nextList[index] ?? nextList.at(-1)).focus();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const currentIndex = zoneOrder.indexOf(zone);
      if (currentIndex === -1 || currentIndex === 0) return;
      const prevZone = zoneOrder[currentIndex - 1];
      const prevList = prevZone === 'source' ? refs.source : refs[prevZone];
      (prevList[index] ?? prevList.at(-1)).focus();
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const list = zone === 'source' ? refs.source : refs[zone];
      list[index + 1]?.focus();
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const list = zone === 'source' ? refs.source : refs[zone];
      if (index > 0) {
        list[index - 1]?.focus();
      } else if (zone !== 'source') {
        refs.source[index]?.focus();
      }
      return;
    }
  };

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
          resetTasks={setTaskIndex}
          resetWidget={setIsCompleted}
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
  const sourceItems = task.blocks.filter(
    (item) =>
      !callStackItems.some((csItem) => csItem.id === item.id) &&
      !microtasksItems.some((miItem) => miItem.id === item.id) &&
      !macrotasksItems.some((maItem) => maItem.id === item.id)
  );
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
          ref={(el: HTMLDivElement | null) => {
            zoneRefs.current.source = el;
          }}
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>): void => {
            handleZoneKeyDown(e, 'source', 0, 0);
          }}
          square={false}
          sx={{ p: 3, backgroundColor: '#f0f0f0', minHeight: 92 }}
        >
          <Stack direction="row" spacing={2}>
            {sourceItems.map((item, index) => {
              if (
                callStackItems.find((csItem) => csItem === item) ||
                microtasksItems.find((miItem) => miItem === item) ||
                macrotasksItems.find((maItem) => maItem === item)
              )
                return null;
              const isDragging = draggedItem?.id === item.id;
              return (
                <Paper
                  ref={(el: HTMLDivElement | null) => {
                    if (!el) return;
                    itemRefs.current.source[index] = el;
                  }}
                  tabIndex={0}
                  onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>): void => {
                    handleItemKeyDown(e, item, 'source', index);
                  }}
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
          {dropZones.map(({ zone, title, items, answerColors }, index) => (
            <Grid size={{ xs: 4 }} key={zone}>
              <Paper
                tabIndex={0}
                ref={(el: HTMLDivElement | null) => {
                  zoneRefs.current[zone] = el;
                }}
                onKeyDown={(e) => {
                  handleZoneKeyDown(e, zone, items.length, index);
                }}
                sx={{
                  backgroundColor: draggedItem ? '#56f6565b' : '#f0f0f0',
                }}
              >
                <Typography sx={{ fontWeight: 800, textAlign: 'center' }}>
                  {title}
                </Typography>
                <Stack
                  direction="row"
                  spacing={items.length < 4 ? 1 : 0}
                  onDragOver={(e) => {
                    handleDragOver(e);
                    if (
                      draggedItem &&
                      !isSubmitClicked &&
                      e.target === e.currentTarget
                    ) {
                      setDropIndicator({
                        zone,
                        insertBefore: items.length,
                      });
                    }
                  }}
                  onDragEnd={handleDragEnd}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleDrop(zone, items.length);
                  }}
                  sx={{ p: 1, minHeight: 60 }}
                >
                  {items.map((item, index) => {
                    const isSelected = selectedItem?.id === item.id;
                    return (
                      <Paper
                        ref={(el: HTMLDivElement | null) => {
                          if (!el) return;
                          itemRefs.current[zone][index] = el;
                        }}
                        key={item.id}
                        tabIndex={0}
                        draggable={!isSubmitClicked}
                        onKeyDown={(
                          e: React.KeyboardEvent<HTMLDivElement>
                        ): void => {
                          if (selectedItem) {
                            handleZoneKeyDown(e, zone, index, index);
                          } else {
                            handleItemKeyDown(e, item, zone, index);
                          }
                        }}
                        onDragStart={() => {
                          if (!isSubmitClicked) handleDragStart(item);
                        }}
                        onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
                          handleDragOver(e);
                          e.stopPropagation();
                          if (draggedItem && !isSubmitClicked) {
                            setDropIndicator({ zone, insertBefore: index });
                          }
                        }}
                        onDragEnd={handleDragEnd}
                        onDrop={(e: React.DragEvent<HTMLDivElement>) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDrop(zone, index);
                        }}
                        elevation={3}
                        sx={{
                          p: '10px',
                          backgroundColor: isSelected
                            ? '#cbcbcb'
                            : isSubmitClicked
                              ? answerColors?.[index]
                              : '',
                          borderLeft:
                            !isSubmitClicked &&
                            !selectedItem &&
                            draggedItem &&
                            dropIndicator?.zone === zone &&
                            dropIndicator.insertBefore === index
                              ? '3px solid #2e7d32'
                              : '3px solid transparent',
                          boxSizing: 'border-box',
                        }}
                      >
                        {item.label}
                      </Paper>
                    );
                  })}
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
            variant="contained"
            sx={{ mr: 1 }}
          >
            Skip
          </Button>
          <Button
            variant="contained"
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
      </Container>
    </AsyncSorterContainer>
  );
}
