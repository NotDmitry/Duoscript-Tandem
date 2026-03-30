import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import type {
  MatcherPair,
  MeaningMatcherDifficulty,
} from '@/shared/models/widgetModel';

const OPTIONS_ZONE_ID = 'options';
const DIFFICULTIES: MeaningMatcherDifficulty[] = ['easy', 'medium', 'hard'];
const DIFFICULTY_LABELS: Record<MeaningMatcherDifficulty, string> = {
  easy: 'Basics',
  medium: 'Intermediate',
  hard: 'Advanced',
};

function getResultColor(checked: boolean, correct: boolean): string {
  if (!checked) return '';
  return correct ? '#c8e6c9' : '#ffcdd2';
}

function clearDragged(
  prev: Record<number, number | null>,
  draggedId: number
): Record<number, number | null> {
  const updated = { ...prev };
  Object.keys(updated).forEach((k) => {
    if (updated[Number(k)] === draggedId) updated[Number(k)] = null;
  });
  return updated;
}

function ProgressBar({
  difficulty,
  completedLevels,
}: {
  difficulty: MeaningMatcherDifficulty;
  completedLevels: MeaningMatcherDifficulty[];
}) {
  return (
    <Box display="flex" alignItems="center" mb={3}>
      {DIFFICULTIES.map((level, index) => {
        const isDone = completedLevels.includes(level);
        const isActive = level === difficulty;

        return (
          <Box key={level} display="flex" alignItems="center">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={0.5}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 500,
                  border: '1px solid',
                  borderColor: isDone
                    ? '#81c784'
                    : isActive
                      ? 'primary.main'
                      : 'grey.300',
                  backgroundColor: isDone
                    ? '#c8e6c9'
                    : isActive
                      ? 'primary.main'
                      : 'grey.100',
                  color: isDone
                    ? '#2e7d32'
                    : isActive
                      ? 'white'
                      : 'text.disabled',
                }}
              >
                {isDone ? '✓' : index + 1}
              </Box>
              <Typography variant="caption" color="text.secondary">
                {DIFFICULTY_LABELS[level]}
              </Typography>
            </Box>

            {index < DIFFICULTIES.length - 1 && (
              <Box
                sx={{
                  width: 40,
                  height: 1,
                  backgroundColor: 'grey.300',
                  mb: 2.5,
                  mx: 0.5,
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

function Card({
  id,
  text,
  correct,
  checked,
}: {
  id: number;
  text: string;
  correct?: boolean;
  checked?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  const resultColor = getResultColor(Boolean(checked), Boolean(correct));

  return (
    <Paper
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        p: 1.5,
        cursor: 'grab',
        transform: transform
          ? `translate3d(${String(transform.x)}px,${String(transform.y)}px,0)`
          : undefined,
        opacity: isDragging ? 0.7 : 1,
        minWidth: 150,
        textAlign: 'center',
        backgroundColor: resultColor || 'white',
        transition: 'background-color 0.3s',
      }}
    >
      <Typography>{text}</Typography>
    </Paper>
  );
}

function Drop({
  id,
  item,
  checked,
}: {
  id: number;
  item: MatcherPair | null;
  checked?: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const isCorrect = item?.id === id;
  const resultColor = item ? getResultColor(Boolean(checked), isCorrect) : '';

  return (
    <Paper
      ref={setNodeRef}
      sx={{
        p: 1.5,
        minHeight: 60,
        height: '100%',
        boxSizing: 'border-box',
        backgroundColor: resultColor || (isOver ? '#e3f2fd' : '#f5f5f5'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s',
      }}
    >
      {item ? (
        <Card
          id={item.id}
          text={item.right}
          correct={isCorrect}
          checked={checked}
        />
      ) : (
        <Typography variant="body2">Drop here</Typography>
      )}
    </Paper>
  );
}

function OptionsZone({ children }: { children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id: OPTIONS_ZONE_ID });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        border: '1px dashed #ccc',
        borderRadius: 1,
        p: 1.5,
        position: { xs: 'static', md: 'sticky' },
        top: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography mb={0.5}>Options:</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', md: 'column' },
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function ResultBlock({
  score,
  total,
  isLast,
  onNext,
  onSkip,
}: {
  score: number;
  total: number;
  isLast: boolean;
  onNext: () => void;
  onSkip: () => void;
}) {
  return (
    <Box
      mt={3}
      p={2.5}
      sx={{
        backgroundColor: 'grey.50',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Box>
        <Typography fontWeight={500}>
          {score === total ? '🎉' : '📝'} {score}/{total} correct
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {score === total
            ? 'Perfect score!'
            : `${String(total - score)} incorrect — review and try again`}
        </Typography>
      </Box>

      {isLast ? (
        <Typography variant="body2" color="success.main" fontWeight={500}>
          All levels completed!
        </Typography>
      ) : (
        <Box display="flex" gap={1}>
          <Button variant="outlined" size="small" onClick={onSkip}>
            Skip
          </Button>
          <Button variant="contained" size="small" onClick={onNext}>
            Next →
          </Button>
        </Box>
      )}
    </Box>
  );
}

export function LevelGame({
  difficulty,
  completedLevels,
  title,
  pairs,
  onSubmit,
  onNext,
  onSkip,
}: {
  difficulty: MeaningMatcherDifficulty;
  completedLevels: MeaningMatcherDifficulty[];
  title: string;
  pairs: MatcherPair[];
  onSubmit: (score: number, total: number) => void;
  onNext: () => void;
  onSkip: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, number | null>>(
    Object.fromEntries(pairs.map((p) => [p.id, null]))
  );
  const [checked, setChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const [shuffledIds] = useState<number[]>(() =>
    [...pairs].sort(() => Math.random() - 0.5).map((p) => p.id)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const draggedId = Number(active.id);
    setChecked(false);

    if (over.id === OPTIONS_ZONE_ID) {
      setAnswers((prev) => clearDragged(prev, draggedId));
      return;
    }

    setAnswers((prev) => {
      const updated = clearDragged(prev, draggedId);
      updated[Number(over.id)] = draggedId;
      return updated;
    });
  };

  const usedIds = Object.values(answers).filter(
    (id): id is number => id !== null
  );

  const options = shuffledIds
    .filter((id) => !usedIds.includes(id))
    .map((id) => pairs.find((p) => p.id === id))
    .filter((p): p is MatcherPair => p !== undefined);

  const getScore = () => pairs.filter((p) => answers[p.id] === p.id).length;

  const handleSubmit = () => {
    const result = getScore();
    setScore(result);
    setSubmitted(true);
    onSubmit(result, pairs.length);
  };

  const fullTitle = `${DIFFICULTY_LABELS[difficulty]}: ${title}`;

  return (
    <>
      <Typography variant="h6" sx={{ color: 'text.secondary', mt: 0.5, mb: 3 }}>
        {fullTitle}
      </Typography>

      <ProgressBar difficulty={difficulty} completedLevels={completedLevels} />

      <DndContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 260px' },
            gap: 2,
            alignItems: 'start',
          }}
        >
          <Box>
            {pairs.map((p) => {
              const selected =
                pairs.find((x) => x.id === answers[p.id]) ?? null;
              return (
                <Box
                  key={p.id}
                  mb={1.5}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 1,
                    alignItems: 'stretch',
                  }}
                >
                  <Paper sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                    <Typography>{p.left}</Typography>
                  </Paper>
                  <Drop id={p.id} item={selected} checked={checked} />
                </Box>
              );
            })}

            <Box mt={2} display="flex" gap={2}>
              <Button
                variant="contained"
                onClick={() => {
                  setChecked(true);
                }}
              >
                Check
              </Button>
              <Button
                variant="outlined"
                disabled={!checked}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>

            {submitted && (
              <ResultBlock
                score={score}
                total={pairs.length}
                isLast={difficulty === 'hard'}
                onNext={onNext}
                onSkip={onSkip}
              />
            )}
          </Box>

          <OptionsZone>
            {options.map((o) => (
              <Card key={o.id} id={o.id} text={o.right} />
            ))}
          </OptionsZone>
        </Box>
      </DndContext>
    </>
  );
}
