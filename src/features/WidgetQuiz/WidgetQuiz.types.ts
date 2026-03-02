interface QuizType {
  type: 'html' | 'css' | 'javascript' | 'typescript' | 'github';
}

type UserAnswer = number | null;

interface QuizQuestion {
  isText: boolean;
  question: string;
  code?: string;
  answers: [number, string][];
}

interface QuizProps {
  quizName: string;
  questions: QuizQuestion[];
  rightAnswers: UserAnswer[];
}

export type { QuizType, UserAnswer, QuizQuestion, QuizProps };
