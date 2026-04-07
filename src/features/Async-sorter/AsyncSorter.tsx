import {
  Box,
  Typography,
  Stack,
  Container,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useState, useRef, useCallback } from 'react';
import {
  type AsyncSorterAnswer,
  type AsyncSorterBlock,
  type DropIndicator,
  type FocusZone,
  type Zone,
} from './types';
import AsyncSorterContainer from './AsyncSorterContainer';
import { useDragAndDrop } from './useDragAndDrop';
import { AsyncSorterResults } from './AsyncSorterResults';
import { useAsyncA11y } from './useAsyncA11y';
import { useAsyncSorterApi } from './useAsynsSorterApi';
import Source from './Source';
import ButtonsBox from './ButtonsBox';
import Queues from './Queues';
import type { AsyncSorterTask } from '@models/widgetModel';
interface AsyncSorterProps {
  widgetId: string;
}

export default function AsyncSorter({ widgetId }: AsyncSorterProps) {
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
  const setSourceContainerRef = useCallback((el: HTMLDivElement | null) => {
    zoneRefs.current.source = el;
  }, []);
  const setQueuesContainerRef = useCallback(
    (el: HTMLDivElement | null, zone: Zone) => {
      zoneRefs.current[zone] = el;
    },
    []
  );
  const { task, taskIndex, setTaskIndex, tasksNumber, isLoading } =
    useAsyncSorterApi(setAnswer, setCurrentTask, widgetId);

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

  const {
    handleItemKeyDown,
    handleZoneKeyDown,
    setSourceItemRef,
    setQueuesItemRef,
  } = useAsyncA11y(setSelectedItem, setDraggedItem, handleDrop, zoneRefs);

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
          The task soon will be shown
        </Typography>
      </AsyncSorterContainer>
    );
  }
  return (
    <AsyncSorterContainer>
      <Typography gutterBottom sx={{ textAlign: 'center', m: 2 }}>
        What is the order of the console output?
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
      <Typography
        id="async-sorter-dnd-title"
        gutterBottom
        sx={{ textAlign: 'center', m: 2 }}
      >
        Drag the blocks into the correct queues:
      </Typography>
      <Box
        id="async-sorter-dnd-instructions"
        sx={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
        }}
      >
        Use left/right arrow keys to move between zones and blocks, ud/down
        arrow to get into/out zone. Press Enter to select a block, then move to
        a queue and press Enter to drop it. Use tab to move to submit button,
        when all the blocks are placed in queues
      </Box>
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
      <Queues
        dropZones={dropZones}
        handleZoneKeyDown={handleZoneKeyDown}
        draggedItem={draggedItem}
        handleDragOver={handleDragOver}
        isSubmitClicked={isSubmitClicked}
        setDropIndicator={setDropIndicator}
        handleDragEnd={handleDragEnd}
        handleDrop={handleDrop}
        selectedItem={selectedItem}
        handleItemKeyDown={handleItemKeyDown}
        handleDragStart={handleDragStart}
        dropIndicator={dropIndicator}
        setQueuesItemRef={setQueuesItemRef}
        setQueuesContainerRef={setQueuesContainerRef}
      ></Queues>

      <Container>
        <Typography>Final order of output:</Typography>
        <Paper sx={{ p: 1, mb: 2, backgroundColor: '#f0f0f0', minHeight: 40 }}>
          {allDragged &&
            output.map((item) => {
              return item + '  ';
            })}
        </Paper>
        <Box role="status" aria-live="polite" aria-atomic="true">
          {isCorrectSolved && (
            <Typography color="success">Your answer is correct</Typography>
          )}
          {isIncorrectSolved && (
            <Typography color="error">Your answer is incorrect</Typography>
          )}
        </Box>
      </Container>
      <ButtonsBox
        isSubmitClicked={isSubmitClicked}
        clearZones={clearZones}
        setDraggedItem={setDraggedItem}
        setAllDragged={setAllDragged}
        failedTasks={failedTasks}
        taskIndex={taskIndex}
        task={task}
        setFailedTasks={setFailedTasks}
        checkIsCompleted={checkIsCompleted}
        successfulTasks={successfulTasks}
        tasksNumber={tasksNumber}
        setTaskIndex={setTaskIndex}
        allDragged={allDragged}
        onSubmitClick={onSubmitClick}
        onNextTaskClick={onNextTaskClick}
      />
    </AsyncSorterContainer>
  );
}
