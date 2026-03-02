import type {
  QuizProps,
  QuizQuestion,
} from '@/features/WidgetQuiz/WidgetQuiz.types.ts';

const htmlMockQuestions: QuizQuestion[] = [
  {
    isText: true,
    question: 'Some question about HTML',
    answers: [
      [0, 'Answer one'],
      [1, 'Answer two'],
      [2, 'Answer three'],
    ],
  },
];

const cssMockQuestions: QuizQuestion[] = [
  {
    isText: false,
    question: 'Where is a problem?',
    code:
      '.container {\n' +
      '    display: flex;\n' +
      '    justify-content: center;\n' +
      '    align-items: center;\n' +
      '    width: 100%;\n' +
      '    height: 100vh;\n' +
      '    background-color: #f0f0f0;\n' +
      '    padding 20px;\n' +
      '}',
    answers: [
      [0, 'display property'],
      [1, 'height property'],
      [2, 'padding property'],
    ],
  },
  {
    isText: true,
    question: 'What will happen if you do this?',
    answers: [
      [0, 'Nothing'],
      [1, 'Something'],
      [2, 'Everything'],
    ],
  },
  {
    isText: true,
    question: 'Where to go?',
    answers: [
      [0, 'Back'],
      [1, 'Left'],
      [2, 'Right'],
      [3, 'Up'],
      [4, 'Down'],
    ],
  },
];

const jsMockQuestions: QuizQuestion[] = [
  {
    isText: true,
    question: 'Some question about JavaScript',
    answers: [
      [0, 'Answer one'],
      [1, 'Answer two'],
      [2, 'Answer three'],
    ],
  },
];

const tsMockQuestions: QuizQuestion[] = [
  {
    isText: true,
    question: 'Some question about TypeScript',
    answers: [
      [0, 'Answer one'],
      [1, 'Answer two'],
      [2, 'Answer three'],
    ],
  },
];

const githubMockQuestions: QuizQuestion[] = [
  {
    isText: true,
    question: 'Some question about GitHub',
    answers: [
      [0, 'Answer one'],
      [1, 'Answer two'],
      [2, 'Answer three'],
    ],
  },
];

export const HTMLQuizParams: QuizProps = {
  quizName: 'HTML quiz',
  questions: htmlMockQuestions,
  rightAnswers: [],
};

export const CSSQuizParams: QuizProps = {
  quizName: 'CSS quiz',
  questions: cssMockQuestions,
  rightAnswers: [],
};

export const JSQuizParams: QuizProps = {
  quizName: 'JavaScript quiz',
  questions: jsMockQuestions,
  rightAnswers: [],
};

export const TSQuizParams: QuizProps = {
  quizName: 'TypeScript quiz',
  questions: tsMockQuestions,
  rightAnswers: [],
};

export const GitHubQuizParams: QuizProps = {
  quizName: 'GitHub quiz',
  questions: githubMockQuestions,
  rightAnswers: [],
};
