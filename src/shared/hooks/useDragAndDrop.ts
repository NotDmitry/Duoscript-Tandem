import type {
  AsyncSorterBlock,
  AsyncSorterTask,
  Zone,
} from '@/features/Async-sorter/types';
import { useState } from 'react';
import { useAsyncSorter } from './useAsyncSorter';

function insertInto(
  baseItems: AsyncSorterBlock[],
  item: AsyncSorterBlock,
  insertIndex: number
): AsyncSorterBlock[] {
  return [
    ...baseItems.slice(0, insertIndex),
    item,
    ...baseItems.slice(insertIndex),
  ];
}

export const useDragAndDrop = (
  selectedItemSetter: React.Dispatch<
    React.SetStateAction<AsyncSorterBlock | null>
  >,
  task: null | AsyncSorterTask,
  taskIndex: number,
  tasksNumber: number,
  setTaskIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  const [draggedItem, setDraggedItem] = useState<AsyncSorterBlock | null>(null);
  const [allDragged, setAllDragged] = useState(false);
  const {
    callStackItems,
    setCallStackItems,
    microtasksItems,
    setMicrotasksItems,
    macrotasksItems,
    setMacrotasksItems,
    output,
    setOutput,
    updateOutput,
    setAnswer,
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
  } = useAsyncSorter(
    task,
    taskIndex,
    tasksNumber,
    setTaskIndex,
    setDraggedItem,
    setAllDragged
  );

  const [currentTask, setCurrentTask] = useState<null | AsyncSorterTask>(null);

  const handleDragStart = (item: AsyncSorterBlock) => {
    setDraggedItem(item);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDragEnd = () => {
    setDraggedItem(null);
  };
  const handleDrop = (zone: Zone, insertBeforeInd: number) => {
    if (!draggedItem) return;
    setDraggedItem(null);

    const withoutDragged = (arr: AsyncSorterBlock[]) =>
      arr.filter((item) => item.id !== draggedItem.id);

    let nextCall = withoutDragged(callStackItems);
    let nextMicro = withoutDragged(microtasksItems);
    let nextMacro = withoutDragged(macrotasksItems);

    if (zone === 'Call Stack') {
      nextCall = insertInto(nextCall, draggedItem, insertBeforeInd);
    } else if (zone === 'Microtasks') {
      nextMicro = insertInto(nextMicro, draggedItem, insertBeforeInd);
    } else {
      nextMacro = insertInto(nextMacro, draggedItem, insertBeforeInd);
    }
    setCallStackItems(nextCall);
    setMicrotasksItems(nextMicro);
    setMacrotasksItems(nextMacro);

    if (
      nextCall.length + nextMicro.length + nextMacro.length ===
        currentTask?.blocks.length &&
      !allDragged
    ) {
      setAllDragged(true);
    }

    updateOutput(nextCall, nextMicro, nextMacro);
  };
  const clearZones = () => {
    setCallStackItems([]);
    setMicrotasksItems([]);
    setMacrotasksItems([]);
    selectedItemSetter(null);
    setOutput([]);
  };
  const onNextTaskClickExtended = () => {
    onNextTaskClick();
    clearZones();
  };

  return {
    getAsyncSortTask,
    isLoading,
    handleDragStart,
    handleDragOver,
    draggedItem,
    handleDrop,
    callStackItems,
    setCallStackItems,
    microtasksItems,
    setMicrotasksItems,
    macrotasksItems,
    setMacrotasksItems,
    clearZones,
    setDraggedItem,
    output,
    setAllDragged,
    allDragged,
    setCurrentTask,
    setAnswer,
    handleDragEnd,
    isCorrectSolved,
    isIncorrectSolved,
    onNextTaskClick: onNextTaskClickExtended,
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
  };
};
