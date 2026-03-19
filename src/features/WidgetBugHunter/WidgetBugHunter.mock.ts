import type {
  BugHunterQuiz,
  QuizTask,
} from '@/features/WidgetBugHunter/WidgetBugHunter.types.ts';

const jsMockQuestions: QuizTask[] = [
  {
    code: 'XDX(value){\n' + '    return value * value\n' + '}',
    answers: ['fun', 'bun', 'def', 'function', 'const'],
  },
  {
    code: 'XDX(value){\n' + '    XDX value * 10\n' + '}',
    answers: [
      ['fun', 'bun', 'def', 'function', 'const'],
      ['give', 'return', 'send'],
    ],
  },
];

export const jsQuizParams: BugHunterQuiz = {
  quizName: 'JavaScript Bug Hunter',
  tasks: jsMockQuestions,
  rightAnswers: [12, 12, 22, 21, 32],
};
