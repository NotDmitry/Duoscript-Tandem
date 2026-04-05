import { Box, CircularProgress, Typography } from '@mui/material';
import type { MeaningMatcherProps } from './MeaningMatcher.types';
import { useMeaningMatcher } from './useMeaningMatcher';
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
        <CircularProgress aria-label="Loading widget" />
      </Box>
    );
  }

  if (dataState.status === 'error') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
        <Typography color="error">Failed to load widget</Typography>
      </Box>
    );
  }

  const levelData = dataState.data[difficulty];

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 1.5, sm: 2, md: 3 } }}>
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{ fontSize: { xs: '1.1rem', sm: '1.5rem' } }}
      >
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
