import { useState, useEffect, useRef } from 'react';
import type {
  Difficulty,
  CompletedResult,
  MatchingLevels,
  MeaningMatcherProps,
} from '@/features/MeaningMatcher/MeaningMatcher.types.ts';
import getMeaningMatcherData from '@/api/meaningMatcher.api.ts';

const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;

type DataState =
  | { status: 'loading' }
  | { status: 'ready'; data: MatchingLevels };

export function useMeaningMatcher({
  topic,
  initialDifficulty = 'easy',
  onComplete,
}: MeaningMatcherProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);
  const [completedLevels, setCompletedLevels] = useState<Difficulty[]>([]);
  const [results, setResults] = useState<CompletedResult[]>([]);
  const [dataState, setDataState] = useState<DataState>({ status: 'loading' });

  const topicRef = useRef(topic);

  useEffect(() => {
    void getMeaningMatcherData(topicRef.current).then((result) => {
      setDataState({ status: 'ready', data: result });
    });
  }, []);

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

  return { difficulty, completedLevels, goToNext, dataState };
}
