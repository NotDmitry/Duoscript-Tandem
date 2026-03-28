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
  type AsyncSorterTask,
  type DropIndicator,
  type FocusZone,
  type Zone,
} from './types';
import AsyncSorterContainer from './AsyncSorterContainer';
import { useDragAndDrop } from '@/shared/hooks/useDragAndDrop';
import { AsyncSorterResults } from './AsyncSorterResults';
import { useAsyncA11y } from './useAsyncA11y';
import { useAsyncSorterApi } from './useAsynsSorterApi';
import Source from './Source';
import ButtonsBox from './ButtonsBox';
import Queues from './Queues';

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
        {isCorrectSolved && (
          <Typography color="success">Your answer is correct</Typography>
        )}
        {isIncorrectSolved && (
          <Typography color="error">Your answer is incorrect</Typography>
        )}
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
