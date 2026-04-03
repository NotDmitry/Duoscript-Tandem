import { submitAnswer } from '@api/asyncSort.api';
import { useState } from 'react';

import type {
  AnswerColor,
  AsyncSorterAnswer,
  AsyncSorterBlock,
  DropZones,
} from '@features/Async-sorter/types';
import type { AsyncSorterTask } from '@models/widgetModel';

export const useAsyncSorter = (
  task: null | AsyncSorterTask,
  taskIndex: number,
  tasksNumber: number,
  setTaskIndex: React.Dispatch<React.SetStateAction<number>>,
  answer: AsyncSorterAnswer | undefined,
  setDraggedItem: React.Dispatch<React.SetStateAction<AsyncSorterBlock | null>>,
  setAllDragged: React.Dispatch<React.SetStateAction<boolean>>
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
  const isCorrectAnswer = async (id: number) => {
    const userAnswer = {
      callStack: callStackItems.map((item) => item.label),
      microtasks: microtasksItems.map((item) => item.label),
      macrotasks: macrotasksItems.map((item) => item.label),
      outputOrder: output,
    };
    return await submitAnswer(userAnswer, id);
  };
  const onSubmitClick = async () => {
    if (!task) return;
    try {
      const result = await isCorrectAnswer(task.id);
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
    }
  };
  const onNextTaskClick = () => {
    checkIsCompleted(successfulTasks.size, failedTasks.size);
    setDraggedItem(null);
    setAllDragged(false);
    setIsSubmitClicked(false);
    setIsCorrectSolved(false);
    setIsIncorrectSolved(false);
    if (tasksNumber > taskIndex + 1) setTaskIndex(taskIndex + 1);
  };
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
  };
};
