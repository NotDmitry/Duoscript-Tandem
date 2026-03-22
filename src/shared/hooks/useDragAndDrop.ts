import type {
  AsyncSorterBlock,
  AsyncSorterTask,
  DropZone,
} from '@/features/Async-sorter/types';
import { useState } from 'react';
import { useAsyncSorterGame } from './useAsyncSorterGame';

export const useDragAndDrop = () => {
  const {
    callStackItems,
    setCallStackItems,
    microtasksItems,
    setMicrotasksItems,
    macrotasksItems,
    setMacrotasksItems,
    output,
    updateOutput,
  } = useAsyncSorterGame();
  const [draggedItem, setDraggedItem] = useState<AsyncSorterBlock | null>(null);
  const [allDragged, setAllDragged] = useState(false);
  const [currentTask, setCurrentTask] = useState<null | AsyncSorterTask>(null);

  const handleDragStart = (item: AsyncSorterBlock) => {
    setDraggedItem(item);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDrop = (zone: DropZone) => {
    if (!draggedItem) return;

    const withoutDragged = (arr: AsyncSorterBlock[]) =>
      arr.filter((item) => item.id !== draggedItem.id);

    let nextCall = callStackItems;
    let nextMicro = microtasksItems;
    let nextMacro = macrotasksItems;

    if (zone === 'Call Stack') {
      nextCall = [...withoutDragged(callStackItems), draggedItem];
      nextMicro = withoutDragged(microtasksItems);
      nextMacro = withoutDragged(macrotasksItems);
    } else if (zone === 'Microtasks') {
      nextMicro = [...withoutDragged(microtasksItems), draggedItem];
      nextCall = withoutDragged(callStackItems);
      nextMacro = withoutDragged(macrotasksItems);
    } else {
      nextMacro = [...withoutDragged(macrotasksItems), draggedItem];
      nextCall = withoutDragged(callStackItems);
      nextMicro = withoutDragged(microtasksItems);
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
  };

  return {
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
  };
};
