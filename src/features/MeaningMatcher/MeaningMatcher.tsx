import { Box, CircularProgress, Typography } from '@mui/material';
import type { MeaningMatcherProps } from './MeaningMatcher.types';
import { useMeaningMatcher } from './useMeaningMatcher.ts';
import { LevelGame } from './LevelGame';

export function MeaningMatcher({
  widgetId,
  initialDifficulty,
  onComplete,
}: MeaningMatcherProps) {
  const { difficulty, completedLevels, goToNext, dataState } =
    useMeaningMatcher({
      widgetId,
      initialDifficulty,
      onComplete,
    });

  if (dataState.status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  const levelData = dataState.data[difficulty];

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h5" fontWeight={600}>
        Meaning Matcher
      </Typography>

      <LevelGame
        key={`${widgetId}-${difficulty}`}
        difficulty={difficulty}
        completedLevels={completedLevels}
        title={levelData.title}
        pairs={levelData.pairs}
        onSubmit={(score, total) => {
          goToNext(false, score, total);
        }}
        onNext={() => {
          goToNext(false);
        }}
        onSkip={() => {
          goToNext(true);
        }}
      />
    </Box>
  );
}
