import { useState, useEffect, useRef } from 'react';
import type {
  CompletedResult,
  MeaningMatcherProps,
} from '@/features/MeaningMatcher/MeaningMatcher.types';
import { getMeaningMatcherWidget } from '@/api/meaningMatcher.api';
import type {
  MeaningMatcherConfig,
  MeaningMatcherDifficulty,
} from '@/shared/models/widgetModel';

const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;

type DataState =
  | { status: 'loading' }
  | { status: 'ready'; data: MeaningMatcherConfig };

export function useMeaningMatcher({
  widgetId,
  initialDifficulty = 'easy',
  onComplete,
}: MeaningMatcherProps) {
  const [difficulty, setDifficulty] =
    useState<MeaningMatcherDifficulty>(initialDifficulty);
  const [completedLevels, setCompletedLevels] = useState<
    MeaningMatcherDifficulty[]
  >([]);
  const [results, setResults] = useState<CompletedResult[]>([]);
  const [dataState, setDataState] = useState<DataState>({ status: 'loading' });

  const widgetIdRef = useRef(widgetId);

  useEffect(() => {
    void getMeaningMatcherWidget(widgetIdRef.current)
      .then((widget) => {
        setDataState({ status: 'ready', data: widget.config });
      })
      .catch(() => {
        console.error('Failed to load meaning matcher widget');
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
