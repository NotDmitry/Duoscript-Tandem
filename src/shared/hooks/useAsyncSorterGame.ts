import type { AsyncSorterBlock } from '@/features/Async-sorter/types';
import { useState } from 'react';

export const useAsyncSorterGame = () => {
  const [callStackItems, setCallStackItems] = useState<AsyncSorterBlock[]>([]);
  const [microtasksItems, setMicrotasksItems] = useState<AsyncSorterBlock[]>(
    []
  );
  const [macrotasksItems, setMacrotasksItems] = useState<AsyncSorterBlock[]>(
    []
  );
  const [output, setOutput] = useState<string[]>([]);
  const updateOutput = () => {
    const updatedOutput = [
      ...callStackItems.map((item) => item.label),
      ...microtasksItems.map((item) => item.label),
      ...macrotasksItems.map((item) => item.label),
    ];
    setOutput(updatedOutput);
  };

  return {
    callStackItems,
    setCallStackItems,
    microtasksItems,
    setMicrotasksItems,
    macrotasksItems,
    setMacrotasksItems,
    output,
    updateOutput,
  };
};
