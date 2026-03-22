export type MeaningMatcherType =
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'github';

export type Difficulty = 'easy' | 'medium' | 'hard';

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Basics',
  medium: 'Intermediate',
  hard: 'Advanced',
};

export const TOPIC_LABELS: Record<MeaningMatcherType, string> = {
  html: 'HTML',
  css: 'CSS',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  github: 'GitHub',
};

export interface Pair {
  id: number;
  left: string;
  right: string;
}

export interface MatchingData {
  title: string;
  pairs: Pair[];
}

export type MatchingLevels = Record<Difficulty, MatchingData>;

export interface CompletedResult {
  difficulty: Difficulty;
  score: number;
  total: number;
  skipped: boolean;
}

export interface MeaningMatcherProps {
  topic: MeaningMatcherType;
  initialDifficulty?: Difficulty;
  onComplete?: (results: CompletedResult[]) => void;
}
