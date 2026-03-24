interface QuizType {
  type: 'html' | 'css' | 'javascript' | 'typescript' | 'github';
}

interface QuizTask {
  code: string;
  answers: string[][];
}

interface BugHunterQuiz {
  quizName: string;
  tasks: QuizTask[];
  rightAnswers: string[];
}

export type { QuizType, QuizTask, BugHunterQuiz };
