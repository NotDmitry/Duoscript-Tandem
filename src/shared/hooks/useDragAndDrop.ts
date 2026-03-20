import type { AsyncSorterBlock, DropZone } from '@/features/Async-sorter/types';
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
  } = useAsyncSorterGame();
  const [draggedItem, setDraggedItem] = useState<AsyncSorterBlock | null>(null);

  const handleDragStart = (item: AsyncSorterBlock) => {
    setDraggedItem(item);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDrop = (zone: DropZone) => {
    if (draggedItem) {
      if (zone === 'Call Stack')
        setCallStackItems((prev) => [...prev, draggedItem.label]);
      console.log(callStackItems);
    }
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
  };
};
