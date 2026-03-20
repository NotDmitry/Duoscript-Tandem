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

    if (zone === 'Call Stack') {
      setCallStackItems((prev) => [...prev, draggedItem]);
      setMicrotasksItems(
        microtasksItems.filter((item) => item !== draggedItem)
      );
      setMacrotasksItems(
        macrotasksItems.filter((item) => item !== draggedItem)
      );
    }
    if (zone === 'Microtasks') {
      setMicrotasksItems((prev) => [...prev, draggedItem]);
      setCallStackItems(callStackItems.filter((item) => item !== draggedItem));
      setMacrotasksItems(
        macrotasksItems.filter((item) => item !== draggedItem)
      );
    }
    if (zone === 'Macrotasks') {
      setMacrotasksItems((prev) => [...prev, draggedItem]);
      setCallStackItems(callStackItems.filter((item) => item !== draggedItem));
      setMicrotasksItems(
        microtasksItems.filter((item) => item !== draggedItem)
      );
    }
    //console.log(macrotasksItems.length, microtasksItems.length,callStackItems.length)

    if (
      macrotasksItems.length +
        microtasksItems.length +
        callStackItems.length +
        1 ===
        currentTask?.blocks.length &&
      !allDragged
    ) {
      setAllDragged(true);
    }

    updateOutput();
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
