type UserAnswer = number | null;

interface QuizQuestion {
  isText: boolean;
  question: string;
  code?: string;
  answers: [number, string][];
}

export type { UserAnswer, QuizQuestion };
