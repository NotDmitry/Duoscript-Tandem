import { useState, useEffect, useRef } from 'react';
import type {
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
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  const questionsCount = quizTask.length;
  const currentQuestion = quizTask[currentQuestionIndex];

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const quizData = await getQuizData(savedQuizType.current);
        setQuizName(quizData.quizName);
        setQuizTask(quizData.questions);
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
    console.log(selectedAnswerIndex);
  }

  function handleNext() {
    console.log('Next question');
    setSelectedAnswer(selectedAnswerIndex);
    manageAnswer();
  }

  function handleSkip() {
    console.log('Answer skipped');
    setSelectedAnswer(null);
    manageAnswer();
  }

  function manageAnswer() {
    if (currentQuestionIndex < questionsCount - 1) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = selectedAnswerIndex;
      setUserAnswers(newAnswers);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  }

  return {
    isLoading,
    quizTask,
    quizName,
    currentQuestionIndex,
    selectedAnswerIndex,
    questionsCount,
    currentQuestion,
    handleAnswerSelect,
    handleNext,
    handleSkip,
  };
}
