import {
  HTMLMatching,
  CSSMatching,
  JSMatching,
  TSMatching,
  GitHubMatching,
} from '@/features/MeaningMatcher/MeaningMatcher.mock';
import type {
  MeaningMatcherType,
  MatchingLevels,
} from '@/features/MeaningMatcher/MeaningMatcher.types';

const isRealData = import.meta.env.MOCK_DATA === 'true';

const delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

async function getMeaningMatcherData(
  topic: MeaningMatcherType
): Promise<MatchingLevels> {
  if (isRealData) {
    return await fetch(`http://localhost:8080/meaning-matcher/${topic}`).then(
      (response): Promise<MatchingLevels> => {
        if (response.ok) {
          return response.json();
        }
        return Promise.resolve(HTMLMatching);
      }
    );
  }

  await delay(500);

  switch (topic) {
    case 'html':
      return HTMLMatching;
    case 'css':
      return CSSMatching;
    case 'js':
      return JSMatching;
    case 'ts':
      return TSMatching;
    case 'github':
      return GitHubMatching;
    default:
      return HTMLMatching;
  }
}

export default getMeaningMatcherData;
