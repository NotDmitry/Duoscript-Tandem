import { useState, useEffect, useRef } from 'react';
import type {
  QuizProps,
  QuizType,
  QuizQuestion,
  UserAnswer,
} from '@/features/WidgetQuiz/WidgetQuiz.types.ts';
import getQuizData from '@/api/widgetQuiz.api.ts';

export function useWidgetQuiz(quizType: QuizType) {
  const savedQuizType = useRef(quizType);
  const [isLoading, setIsLoading] = useState(true);
  const [quizName, setQuizName] = useState<string>('');
  const [quizTask, setQuizTask] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswer] = useState<UserAnswer>(null);
  const [quizAnswers, setQuizAnswers] = useState<UserAnswer[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [failedQuiz, setFailedQuiz] = useState<QuizQuestion[]>([]);
  const [isFinish, setFinish] = useState<boolean>(false);

  const questionsCount = quizTask.length;
  const currentQuestion = quizTask[currentQuestionIndex];

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const quizData: QuizProps = await getQuizData(savedQuizType.current);
        setQuizName(quizData.quizName);
        setQuizTask(quizData.questions);
        setQuizAnswers(quizData.rightAnswers);
      } catch {
        console.error('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };
    void loadQuizData();
  }, []);

  function handleAnswerSelect(answerIndex: UserAnswer) {
    setSelectedAnswer(answerIndex);
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

    setSelectedAnswer(null);
    if (currentQuestionIndex < questionsCount - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setFinish(true);
      console.log(updatedAnswers);
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
