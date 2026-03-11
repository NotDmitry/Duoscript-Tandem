import type {
  BugHunterQuiz,
  QuizTask,
} from '@/features/WidgetBugHunter/WidgetBugHunter.types.ts';

const htmlMockQuestions: QuizTask[] = [
  {
    code: '',
    answers: [],
  },
];

export const HTMLQuizParams: BugHunterQuiz = {
  quizName: 'HTML quiz',
  tasks: htmlMockQuestions,
  rightAnswers: [12, 12, 22, 21, 32],
};
