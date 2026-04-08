import { useState, useEffect, useRef } from 'react';
import type { BugHunterConfig, BugHunterTask } from '@models/widgetModel';
import { getBugHunterWidget } from '@api/widgetBugHunter.api.ts';

export function useWidgetBugHunter(widgetId: string, onComplete?: () => void) {
  const savedQuizType = useRef(widgetId);
  const rightAnswers = useRef<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quizName, setQuizName] = useState('');
  const [tasks, setTasks] = useState<BugHunterTask[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[][]>([]);
  const [failedTasks, setFailedTasks] = useState<string[]>([]);
  const [isFinish, setFinish] = useState<boolean>(false);

  const currentTask = tasks.at(currentTaskIndex);
  let currentSelections = [''];
  let codeParts = [''];

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const widget = await getBugHunterWidget(savedQuizType.current);
        const config: BugHunterConfig = widget.config;
        setQuizName(config.quizName);
        setTasks(config.questions);
        rightAnswers.current = config.rightAnswers;
        setUserAnswers(
          config.questions.map((task) =>
            task.answers.map((options) => options[0])
          )
        );
      } catch {
        console.error('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };
    void loadQuizData();
  }, []);

  if (currentTask) {
    currentSelections = userAnswers[currentTaskIndex];
    codeParts = currentTask.code.split('XDX');
  }

  function handleSelect(dropdownIndex: number, value: string): void {
    setUserAnswers((prev) =>
      prev.map((taskSelections, taskIndex) =>
        taskIndex === currentTaskIndex
          ? taskSelections.map((answer, index) =>
              index === dropdownIndex ? value : answer
            )
          : taskSelections
      )
    );
  }

  function handleNext() {
    if (!currentTask) {
      return;
    }
    const userAnswer = userAnswers[currentTaskIndex]
      .map((selected, index) =>
        String(currentTask.answers[index].indexOf(selected))
      )
      .join('');
    if (userAnswer !== rightAnswers.current[currentTaskIndex]) {
      createFailedCode();
    }
    manageAnswer();
  }

  function handleSkip() {
    createFailedCode();
    setUserAnswers((prev) =>
      prev.map((taskSelections, taskIndex) =>
        taskIndex === currentTaskIndex
          ? taskSelections.map(() => '')
          : taskSelections
      )
    );
    manageAnswer();
  }

  function createFailedCode() {
    if (!currentTask) {
      return;
    }
    const failedCode = codeParts
      .map((part, index) => {
        return part + (currentSelections[index] ?? '');
      })
      .join('');
    setFailedTasks((prev) => [...prev, failedCode]);
  }

  function manageAnswer(): void {
    const isLastTask = currentTaskIndex >= tasks.length - 1;
    setFinish(isLastTask);
    if (isLastTask) {
      onComplete?.();
    } else {
      setCurrentTaskIndex((prev) => prev + 1);
    }
  }

  return {
    isLoading,
    quizName,
    tasks,
    currentTaskIndex,
    currentTask,
    currentSelections,
    codeParts,
    isFinish,
    failedTasks,
    handleSelect,
    handleNext,
    handleSkip,
  };
}
