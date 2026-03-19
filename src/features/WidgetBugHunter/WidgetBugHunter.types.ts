interface QuizType {
  type: 'html' | 'css' | 'javascript' | 'typescript' | 'github';
}

interface QuizTask {
  code: string;
  answers: string[] | string[][];
}

interface BugHunterQuiz {
  quizName: string;
  tasks: QuizTask[];
  rightAnswers: number[];
}

export type { QuizType, QuizTask, BugHunterQuiz };
