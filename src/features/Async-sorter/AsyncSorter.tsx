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
import { useState, useRef, useCallback } from 'react';
import {
  type AsyncSorterAnswer,
  type AsyncSorterBlock,
  type AsyncSorterTask,
  type DropIndicator,
  type FocusZone,
} from './types';
import AsyncSorterContainer from './AsyncSorterContainer';
import { useDragAndDrop } from '@/shared/hooks/useDragAndDrop';
import { AsyncSorterResults } from './AsyncSorterResults';
import { useAsyncA11y } from './useAsyncA11y';
import { useAsyncSorterApi } from './useAsynsSorterApi';
import Source from './Source';

export default function AsyncSorter() {
  const [selectedItem, setSelectedItem] = useState<AsyncSorterBlock | null>(
    null
  );
  const [answer, setAnswer] = useState<AsyncSorterAnswer | undefined>(
    undefined
  );
  const [currentTask, setCurrentTask] = useState<null | AsyncSorterTask>(null);
  const zoneRefs = useRef<Record<FocusZone, HTMLDivElement | null>>({
    source: null,
    'Call Stack': null,
    Microtasks: null,
    Macrotasks: null,
  });
  const { task, taskIndex, setTaskIndex, tasksNumber, isLoading } =
    useAsyncSorterApi(setAnswer, setCurrentTask);

  const {
    handleDragStart,
    handleDragOver,
    handleDrop,
    draggedItem,
    setDraggedItem,
    clearZones,
    setAllDragged,
    output,
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
    sourceItems,
    dropZones,
  } = useDragAndDrop(
    setSelectedItem,
    task,
    currentTask,
    taskIndex,
    tasksNumber,
    setTaskIndex,
    answer
  );

  const { itemRefs, handleItemKeyDown, handleZoneKeyDown, setSourceItemRef } =
    useAsyncA11y(setSelectedItem, setDraggedItem, handleDrop, zoneRefs);
  const setSourceContainerRef = useCallback((el: HTMLDivElement | null) => {
    zoneRefs.current.source = el;
  }, []);

  const [dropIndicator, setDropIndicator] = useState<DropIndicator | null>(
    null
  );

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
      <Source
        onSourceContainerRef={setSourceContainerRef}
        handleZoneKeyDown={handleZoneKeyDown}
        sourceItems={sourceItems}
        draggedItem={draggedItem}
        onSourceItemRef={setSourceItemRef}
        handleItemKeyDown={handleItemKeyDown}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
      ></Source>

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
