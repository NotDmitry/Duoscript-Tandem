//import { submitAnswer } from '@api/asyncSort.api';
import { useState } from 'react';

import type {
  AnswerColor,
  AsyncSorterAnswer,
  AsyncSorterBlock,
  DropZones,
} from '@features/Async-sorter/types';
import type { AsyncSorterTask } from '@models/widgetModel';

export const useAsyncSorter = (
  selectedItemSetter: React.Dispatch<
    React.SetStateAction<AsyncSorterBlock | null>
  >,
  task: null | AsyncSorterTask,
  taskIndex: number,
  tasksNumber: number,
  setTaskIndex: React.Dispatch<React.SetStateAction<number>>,
  answer: AsyncSorterAnswer | undefined,
  setDraggedItem: React.Dispatch<React.SetStateAction<AsyncSorterBlock | null>>,
  setAllDragged: React.Dispatch<React.SetStateAction<boolean>>,
  getAsyncSortTaskById: (
    id: number,
    tasks: AsyncSorterTask[]
  ) => AsyncSorterTask | undefined,
  widgetTasks: AsyncSorterTask[],
  onComplete?: (score: number, maxScore: number) => void
) => {
  const [callStackItems, setCallStackItems] = useState<AsyncSorterBlock[]>([]);
  const [microtasksItems, setMicrotasksItems] = useState<AsyncSorterBlock[]>(
    []
  );
  const [macrotasksItems, setMacrotasksItems] = useState<AsyncSorterBlock[]>(
    []
  );
  const [answersColorSchema, setAnswersColorSchema] =
    useState<AnswerColor | null>(null);
  const sourceItems = task?.blocks.filter(
    (item) =>
      !callStackItems.some((csItem) => csItem.id === item.id) &&
      !microtasksItems.some((miItem) => miItem.id === item.id) &&
      !macrotasksItems.some((maItem) => maItem.id === item.id)
  );
  const dropZones: DropZones[] = [
    {
      zone: 'Call Stack',
      title: 'Call Stack',
      items: callStackItems,
      answerColors: answersColorSchema?.callStackBlock,
    },
    {
      zone: 'Microtasks',
      title: 'Microtasks',
      items: microtasksItems,
      answerColors: answersColorSchema?.microBlock,
    },
    {
      zone: 'Macrotasks',
      title: 'Macrotasks',
      items: macrotasksItems,
      answerColors: answersColorSchema?.macroBlock,
    },
  ];

  const [output, setOutput] = useState<string[]>([]);
  const [isCorrectSolved, setIsCorrectSolved] = useState(false);
  const [isIncorrectSolved, setIsIncorrectSolved] = useState(false);

  const [successfulTasks, setSuccessfulTasks] = useState<
    Map<number, AsyncSorterTask>
  >(new Map());
  const [failedTasks, setFailedTasks] = useState<Map<number, AsyncSorterTask>>(
    new Map()
  );
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

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
  function getColor(
    arrayItems: AsyncSorterBlock[],
    answers: string[]
  ): ('green' | 'red')[] {
    return arrayItems.map((item, i) => {
      if (i < answers.length && answers[i] === item.label) return 'green';
      return 'red';
    });
  }
  const determineAnswerColor = (): AnswerColor => {
    if (!answer) throw new Error("The answer wasn't determined");
    const callStackAnswers = getColor(callStackItems, answer.callStack);
    const microAnswers = getColor(microtasksItems, answer.microtasks);
    const macroAnswers = getColor(macrotasksItems, answer.macrotasks);
    return {
      callStackBlock: callStackAnswers,
      microBlock: microAnswers,
      macroBlock: macroAnswers,
    };
  };
  const isCorrectAnswer = (id: number) => {
    const userAnswer = {
      callStack: callStackItems.map((item) => item.label),
      microtasks: microtasksItems.map((item) => item.label),
      macrotasks: macrotasksItems.map((item) => item.label),
      outputOrder: output,
    };
    return submitAnswer(userAnswer, id);
  };
  const onSubmitClick = () => {
    if (!task) return;
    try {
      const result = isCorrectAnswer(task.id);
      setIsCorrectSolved(result);
      if (result) {
        setAnswersColorSchema(determineAnswerColor());
        const newMap = new Map(successfulTasks);
        newMap.set(taskIndex, task);
        setSuccessfulTasks(newMap);
      } else {
        setIsIncorrectSolved(true);
        const newMap = new Map(failedTasks);
        newMap.set(taskIndex, task);
        setFailedTasks(newMap);
        setAnswersColorSchema(determineAnswerColor());
      }
      setIsSubmitClicked(true);
    } catch {
      throw new Error('something went wrong');
    }
  };
  const checkIsCompleted = (successLength: number, failLength: number) => {
    if (successLength + failLength === tasksNumber) {
      setIsCompleted(true);
      onComplete?.(successLength, tasksNumber);
    }
  };
  const clearZones = () => {
    setCallStackItems([]);
    setMicrotasksItems([]);
    setMacrotasksItems([]);
    selectedItemSetter(null);
    setOutput([]);
  };
  const onNextTaskClick = () => {
    checkIsCompleted(successfulTasks.size, failedTasks.size);
    setDraggedItem(null);
    setAllDragged(false);
    setIsSubmitClicked(false);
    setIsCorrectSolved(false);
    setIsIncorrectSolved(false);
    clearZones();
    if (tasksNumber > taskIndex + 1) setTaskIndex(taskIndex + 1);
  };
  const ifAnswersEqual = (
    userAnswer: AsyncSorterAnswer,
    serverAnswer: AsyncSorterAnswer
  ): boolean => {
    return (
      JSON.stringify(userAnswer.callStack) ===
        JSON.stringify(serverAnswer.callStack) &&
      JSON.stringify(userAnswer.microtasks) ===
        JSON.stringify(serverAnswer.microtasks) &&
      JSON.stringify(userAnswer.macrotasks) ===
        JSON.stringify(serverAnswer.macrotasks)
    );
  };
  function submitAnswer(userAnswer: AsyncSorterAnswer, id: number): boolean {
    const task = getAsyncSortTaskById(id, widgetTasks);
    if (!task) throw new Error('Failed to fetch task');
    return ifAnswersEqual(userAnswer, task.answer);
  }

  return {
    callStackItems,
    setCallStackItems,
    microtasksItems,
    setMicrotasksItems,
    macrotasksItems,
    setMacrotasksItems,
    output,
    setOutput,
    updateOutput,
    isCorrectAnswer,
    onSubmitClick,
    onNextTaskClick,
    isCorrectSolved,
    isIncorrectSolved,
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
  };
};
