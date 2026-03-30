import type { MeaningMatcherDifficulty } from '@/shared/models/widgetModel';

export interface CompletedResult {
  difficulty: MeaningMatcherDifficulty;
  score: number;
  total: number;
  skipped: boolean;
}

export interface MeaningMatcherProps {
  widgetId: string;
  initialDifficulty?: MeaningMatcherDifficulty;
  onComplete?: (results: CompletedResult[]) => void;
}
