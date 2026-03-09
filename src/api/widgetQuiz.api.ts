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

const isRealData = import.meta.env.MOCK_DATA === 'true';

const delay = (time: number) =>
  new Promise((emptyHandler) => setTimeout(emptyHandler, time));

async function getQuizData(quizType: QuizType): Promise<QuizProps> {
  if (isRealData) {
    return await fetch('http://localhost:8080').then(
      (response): Promise<QuizProps> => {
        if (response.ok) {
          return response.json();
        }
        return Promise.resolve(HTMLQuizParams);
      }
    );
  }

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
