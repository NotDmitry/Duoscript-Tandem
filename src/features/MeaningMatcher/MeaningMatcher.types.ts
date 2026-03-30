export type Difficulty = 'easy' | 'medium' | 'hard';

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Basics',
  medium: 'Intermediate',
  hard: 'Advanced',
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

export interface CompletedResult {
  difficulty: Difficulty;
  score: number;
  total: number;
  skipped: boolean;
}

export interface MeaningMatcherProps {
  widgetId: string;
  initialDifficulty?: Difficulty;
  onComplete?: (results: CompletedResult[]) => void;
}
