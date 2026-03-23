import { getAsyncSortTaskByIndex, submitAnswer } from '@/api/asyncSort.api';
import { useCallback, useState } from 'react';
import { useUI } from './useUI';
import type {
  AnswerColor,
  AsyncSorterAnswer,
  AsyncSorterBlock,
} from '@/features/Async-sorter/types';

export const useAsyncSorter = () => {
  const [callStackItems, setCallStackItems] = useState<AsyncSorterBlock[]>([]);
  const [microtasksItems, setMicrotasksItems] = useState<AsyncSorterBlock[]>(
    []
  );
  const [macrotasksItems, setMacrotasksItems] = useState<AsyncSorterBlock[]>(
    []
  );
  const [output, setOutput] = useState<string[]>([]);
  const { showToast } = useUI();
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<AsyncSorterAnswer | undefined>(
    undefined
  );
  const getAsyncSortTask = useCallback(
    async (index: number) => {
      setIsLoading(true);
      try {
        const task = await getAsyncSortTaskByIndex(index);
        return task;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Ups, task can not be shown';
        showToast(message, 'error');
      } finally {
        setIsLoading(false);
      }
    },
    [showToast]
  );
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
  const determineAnswerColor = (): AnswerColor => {
    if (!answer) throw new Error("The answer wasn't determined");
    const callStackAnswers = callStackItems.map((item, i) => {
      if (i < answer.callStack.length && answer.callStack[i] === item.label)
        return 'green';
      return 'red';
    }); //вынести в функцию
    const microAnswers = microtasksItems.map((item, i) => {
      if (i < answer.microtasks.length && answer.microtasks[i] === item.label)
        return 'green';
      return 'red';
    });
    const macroAnswers = macrotasksItems.map((item, i) => {
      if (i < answer.macrotasks.length && answer.macrotasks[i] === item.label)
        return 'green';
      return 'red';
    });
    return {
      callStackBlock: callStackAnswers,
      microBlock: microAnswers,
      macroBlock: macroAnswers,
    };
  };
  const isCorrectAnswer = async (id: number) => {
    const userAnswer = {
      callStack: callStackItems.map((item) => item.label),
      microtasks: microtasksItems.map((item) => item.label),
      macrotasks: macrotasksItems.map((item) => item.label),
      outputOrder: output,
    };
    return await submitAnswer(userAnswer, id);
  };
  return {
    getAsyncSortTask,
    isLoading,
    setIsLoading,
    callStackItems,
    setCallStackItems,
    microtasksItems,
    setMicrotasksItems,
    macrotasksItems,
    setMacrotasksItems,
    output,
    updateOutput,
    isCorrectAnswer,
    setAnswer,
    determineAnswerColor,
  };
};
