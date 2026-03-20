import { useState } from 'react';

export const useAsyncSorterGame = () => {
  const [callStackItems, setCallStackItems] = useState<string[]>([]);
  const [microtasksItems, setMicrotasksItems] = useState<string[]>([]);
  const [macrotasksItems, setMacrotasksItems] = useState<string[]>([]);

  return {
    callStackItems,
    setCallStackItems,
    microtasksItems,
    setMicrotasksItems,
    macrotasksItems,
    setMacrotasksItems,
  };
};
