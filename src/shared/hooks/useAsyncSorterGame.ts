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

  const updateOutput = (
    callStack: AsyncSorterBlock[],
    microtasks: AsyncSorterBlock[],
    macrotasks: AsyncSorterBlock[]
  ) => {
    setOutput([
      ...callStack.map((item) => item.label),
      ...microtasks.map((item) => item.label),
      ...macrotasks.map((item) => item.label),
    ]);
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
