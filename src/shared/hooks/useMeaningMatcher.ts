import { useState } from 'react';
import type {
  Difficulty,
  CompletedResult,
} from '@/features/MeaningMatcher/MeaningMatcher.types.ts';

const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;

export function useMeaningMatcher({
  initialDifficulty = 'easy',
  onComplete,
}: {
  initialDifficulty?: Difficulty;
  onComplete?: (results: CompletedResult[]) => void;
}) {
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);
  const [completedLevels, setCompletedLevels] = useState<Difficulty[]>([]);
  const [results, setResults] = useState<CompletedResult[]>([]);

  const goToNext = (skipped: boolean, score = 0, total = 0) => {
    const currentIndex = DIFFICULTIES.indexOf(difficulty);
    const next = DIFFICULTIES.at(currentIndex + 1);

    const result: CompletedResult = { difficulty, score, total, skipped };
    const updatedResults = [...results, result];
    setResults(updatedResults);

    if (!skipped) {
      setCompletedLevels((prev) => [...prev, difficulty]);
    }

    if (next) {
      setDifficulty(next);
    } else {
      onComplete?.(updatedResults);
    }
  };

  return { difficulty, completedLevels, goToNext };
}
