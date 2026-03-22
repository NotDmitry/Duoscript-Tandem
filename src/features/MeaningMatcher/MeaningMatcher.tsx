import type { DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { Box, Paper, Typography, Button } from '@mui/material';
import type { MeaningMatcherProps, Pair } from './MeaningMatcher.types';

const OPTIONS_ZONE_ID = 'options';

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

  const resultColor = getResultColor(!!checked, !!correct);

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
  item: Pair | null;
  checked?: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  const isCorrect = item?.id === id;
  const resultColor = item ? getResultColor(!!checked, isCorrect) : '';

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

export function MeaningMatcher({
  title,
  pairs,
  onSubmit,
}: MeaningMatcherProps) {
  const [answers, setAnswers] = useState<Record<number, number | null>>(
    Object.fromEntries(pairs.map((p) => [p.id, null]))
  );
  const [checked, setChecked] = useState(false);

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
    .filter((p): p is Pair => p !== undefined);

  const getScore = () => pairs.filter((p) => answers[p.id] === p.id).length;

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h5" fontWeight={600}>
        Meaning Matcher
      </Typography>
      <Typography variant="h6" sx={{ color: 'text.secondary', mt: 0.5, mb: 5 }}>
        {title}
      </Typography>

      <DndContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 260px' },
            gap: 2,
            alignItems: 'start',
          }}
        >
          {/* Left column — pairs */}
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
                onClick={() => onSubmit?.(getScore(), pairs.length)}
              >
                Submit
              </Button>
            </Box>
          </Box>

          {/* Right column — Options */}
          <OptionsZone>
            {options.map((o) => (
              <Card key={o.id} id={o.id} text={o.right} />
            ))}
          </OptionsZone>
        </Box>
      </DndContext>
    </Box>
  );
}
