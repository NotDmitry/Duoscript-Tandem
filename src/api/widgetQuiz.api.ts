import {
  HTMLQuizParams,
  CSSQuizParams,
  JSQuizParams,
  TSQuizParams,
  GitHubQuizParams,
} from '@/features/WidgetQuiz/WidgetQuiz.mock.ts';
import type {
  QuizType,
  QuizProps,
} from '@/features/WidgetQuiz/WidgetQuiz.types.ts';

const delay = (time: number) =>
  new Promise((emptyHandler) => setTimeout(emptyHandler, time));

async function getQuizData(quizType: QuizType): Promise<QuizProps> {
  await delay(500);
  switch (quizType.type) {
    case 'html':
      return HTMLQuizParams;
    case 'css':
      return CSSQuizParams;
    case 'javascript':
      return JSQuizParams;
    case 'typescript':
      return TSQuizParams;
    case 'github':
      return GitHubQuizParams;
    default:
      return CSSQuizParams;
  }
}

export default getQuizData;
