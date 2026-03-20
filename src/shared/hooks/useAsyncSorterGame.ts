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

  return {
    callStackItems,
    setCallStackItems,
    microtasksItems,
    setMicrotasksItems,
    macrotasksItems,
    setMacrotasksItems,
  };
};
