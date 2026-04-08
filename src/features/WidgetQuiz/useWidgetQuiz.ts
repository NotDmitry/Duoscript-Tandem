import { useEffect, useRef, useState } from 'react';
import type { QuizConfig, QuizQuestion, UserAnswer } from '@models/widgetModel';
import { getQuizWidget } from '@api/widgetQuiz.api';

export function useWidgetQuiz(widgetId: string, onComplete?: () => void) {
  const savedWidgetId = useRef(widgetId);
  const [isLoading, setIsLoading] = useState(true);
  const [quizName, setQuizName] = useState<string>('');
  const [quizTask, setQuizTask] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] =
    useState<UserAnswer>(null);
  const [quizAnswers, setQuizAnswers] = useState<UserAnswer[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [failedQuiz, setFailedQuiz] = useState<QuizQuestion[]>([]);
  const [isFinish, setIsFinish] = useState<boolean>(false);

  const questionsCount = quizTask.length;
  const currentQuestion = quizTask[currentQuestionIndex];

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const widget = await getQuizWidget(savedWidgetId.current);
        const config: QuizConfig = widget.config;
        setQuizName(config.quizName);
        setQuizTask(config.questions);
        setQuizAnswers(config.rightAnswers);
      } catch {
        console.error('Failed to load quiz widget');
      } finally {
        setIsLoading(false);
      }
    };
    void loadQuizData();
  }, []);

  function handleAnswerSelect(answerIndex: UserAnswer) {
    setSelectedAnswerIndex(answerIndex);
  }

  function handleNext() {
    manageAnswer(selectedAnswerIndex);
  }

  function handleSkip() {
    manageAnswer(null);
  }

  function manageAnswer(answer: UserAnswer) {
    let updatedAnswers = userAnswers;

    if (answer !== quizAnswers[currentQuestionIndex]) {
      setFailedQuiz((prevFails) => [...prevFails, currentQuestion]);
    } else {
      updatedAnswers = [...userAnswers, currentQuestionIndex];
      setUserAnswers((prevAnswers) => [...prevAnswers, currentQuestionIndex]);
    }

    setSelectedAnswerIndex(null);
    if (currentQuestionIndex < questionsCount - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinish(true);
      console.log(updatedAnswers);
      onComplete?.();
    }
  }

  return {
    isLoading,
    isFinish,
    quizTask,
    quizName,
    currentQuestionIndex,
    selectedAnswerIndex,
    questionsCount,
    currentQuestion,
    failedQuiz,
    handleAnswerSelect,
    handleNext,
    handleSkip,
  };
}
