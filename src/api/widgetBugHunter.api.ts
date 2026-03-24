import {
  htmlBugHunterParams,
  cssBugHunterParams,
  jsBugHunterParams,
  tsBugHunterParams,
  gitHubBugHunterParams,
} from '@/features/WidgetBugHunter/WidgetBugHunter.mock';
import type {
  QuizType,
  BugHunterQuiz,
} from '@/features/WidgetBugHunter/WidgetBugHunter.types.ts';

const isRealData = import.meta.env.MOCK_DATA === 'true';

const delay = (time: number) =>
  new Promise((emptyHandler) => setTimeout(emptyHandler, time));

async function getQuizData(quizType: QuizType): Promise<BugHunterQuiz> {
  if (isRealData) {
    return await fetch('http://localhost:8080').then(
      (response): Promise<BugHunterQuiz> => {
        if (response.ok) {
          return response.json();
        }
        return Promise.resolve(jsBugHunterParams);
      }
    );
  }

  await delay(500);
  switch (quizType.type) {
    case 'html':
      return htmlBugHunterParams;
    case 'css':
      return cssBugHunterParams;
    case 'javascript':
      return jsBugHunterParams;
    case 'typescript':
      return tsBugHunterParams;
    case 'github':
      return gitHubBugHunterParams;
    default:
      return cssBugHunterParams;
  }
}

export default getQuizData;
