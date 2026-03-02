import { useState } from 'react';
import type {
  QuizType,
  QuizQuestion,
  UserAnswer,
} from '@/features/WidgetQuiz/WidgetQuiz.types.ts';

export function useWidgetQuiz(quizType: QuizType) {
  console.log(quizType);
  const [quizTask, setQuizTask] = useState<QuizQuestion[]>([]);
  const [quizName, setQuizName] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswer] = useState<UserAnswer>(null);

  const questionsCount = quizTask.length;
  const currentQuestion = quizTask[currentQuestionIndex];

  function handleAnswerSelect(answerIndex: UserAnswer) {
    setSelectedAnswer(answerIndex);
    console.log(selectedAnswerIndex);
  }

  function handleNext() {
    console.log('Next question');
  }

  function handleSkip() {
    console.log('Answer skipped');
  }

  return {
    quizTask,
    setQuizTask,
    quizName,
    setQuizName,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedAnswerIndex,
    questionsCount,
    currentQuestion,
    handleAnswerSelect,
    handleNext,
    handleSkip,
  };
}
