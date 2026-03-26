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
  type AsyncSorterBlock,
  type AsyncSorterTask,
  type DropIndicator,
  type FocusZone,
} from './types';
import AsyncSorterContainer from './AsyncSorterContainer';
import { useDragAndDrop } from '@/shared/hooks/useDragAndDrop';
import { getAsyncSortTasksNumber } from '@/api/asyncSort.api';
import { AsyncSorterResults } from './AsyncSorterResults';
import { useAsyncA11y } from './useAsyncA11y';

export default function AsyncSorter() {
  const [task, setTask] = useState<null | AsyncSorterTask>(null);
  const [taskIndex, setTaskIndex] = useState(0);
  const [tasksNumber, setTasksNumber] = useState(0);
  const [selectedItem, setSelectedItem] = useState<AsyncSorterBlock | null>(
    null
  );
  const zoneRefs = useRef<Record<FocusZone, HTMLDivElement | null>>({
    source: null,
    'Call Stack': null,
    Microtasks: null,
    Macrotasks: null,
  });
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
    setAnswer,
    handleDragEnd,
    allDragged,
    isCorrectSolved,
    isIncorrectSolved,
    onNextTaskClick,
    onSubmitClick,
    successfulTasks,
    failedTasks,
    setFailedTasks,
    isSubmitClicked,
    isCompleted,
    checkIsCompleted,
    setIsCompleted,
    getAsyncSortTask,
    isLoading,
    sourceItems,
    dropZones,
  } = useDragAndDrop(
    setSelectedItem,
    task,
    taskIndex,
    tasksNumber,
    setTaskIndex
  );

  const { itemRefs, handleItemKeyDown, handleZoneKeyDown } = useAsyncA11y(
    setSelectedItem,
    setDraggedItem,
    handleDrop,
    zoneRefs
  );

  const [dropIndicator, setDropIndicator] = useState<DropIndicator | null>(
    null
  );

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
            {sourceItems?.map((item, index) => {
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
