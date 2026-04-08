import type {
  AsyncSorterAnswer,
  AsyncSorterBlock,
  Zone,
} from '@features/Async-sorter/types';
import { useState } from 'react';
import { useAsyncSorter } from './useAsyncSorter';
import type { AsyncSorterTask } from '@models/widgetModel';

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
  currentTask: null | AsyncSorterTask,
  taskIndex: number,
  tasksNumber: number,

  setTaskIndex: React.Dispatch<React.SetStateAction<number>>,
  answer: AsyncSorterAnswer | undefined,
  getAsyncSortTaskById: (
    id: number,
    tasks: AsyncSorterTask[]
  ) => AsyncSorterTask | undefined,
  widgetTasks: AsyncSorterTask[],
  onComplete?: () => void
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
    updateOutput,
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
    clearZones,
  } = useAsyncSorter(
    selectedItemSetter,
    task,
    taskIndex,
    tasksNumber,
    setTaskIndex,
    answer,
    setDraggedItem,
    setAllDragged,
    getAsyncSortTaskById,
    widgetTasks,
    onComplete
  );

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

  return {
    handleDragStart,
    handleDragOver,
    draggedItem,
    handleDrop,
    setCallStackItems,
    setMicrotasksItems,
    setMacrotasksItems,
    clearZones,
    setDraggedItem,
    output,
    setAllDragged,
    allDragged,
    handleDragEnd,
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
  };
};
