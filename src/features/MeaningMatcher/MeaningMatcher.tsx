import { Box, Typography } from '@mui/material';
import type { MeaningMatcherProps } from './MeaningMatcher.types';
import { useMeaningMatcher } from '@/shared/hooks/useMeaningMatcher.ts';
import { LevelGame } from './LevelGame';

export function MeaningMatcher({
  topic,
  initialDifficulty,
  onComplete,
}: MeaningMatcherProps) {
  const { difficulty, completedLevels, goToNext } = useMeaningMatcher({
    initialDifficulty,
    onComplete,
  });

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h5" fontWeight={600}>
        Meaning Matcher
      </Typography>

      <LevelGame
        key={`${topic}-${difficulty}`}
        topic={topic}
        difficulty={difficulty}
        completedLevels={completedLevels}
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
