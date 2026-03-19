import type { DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { Box, Paper, Typography, Button } from '@mui/material';
import type { MeaningMatcherProps } from './MeaningMatcher.types';

// draggable card (used in options and drop zones)
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

  let bgColor = 'white';
  if (checked) bgColor = correct ? '#c8e6c9' : '#ffcdd2';

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
        backgroundColor: bgColor,
        transition: 'background-color 0.3s',
      }}
    >
      <Typography>{text}</Typography>
    </Paper>
  );
}

// drop zone for matching
function Drop({
  id,
  item,
  checked,
}: {
  id: number;
  item: { id: number; right: string } | null;
  checked?: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  // default/hover background before checking
  let bgColor = isOver ? '#e3f2fd' : '#f5f5f5';

  // after checking - show correct/incorrect
  if (checked && item) {
    bgColor = item.id === id ? '#c8e6c9' : '#ffcdd2';
  }

  return (
    <Paper
      ref={setNodeRef}
      sx={{
        p: 1.5,
        mt: 1,
        minHeight: 60,
        backgroundColor: bgColor,
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
          correct={item.id === id}
          checked={checked}
        />
      ) : (
        <Typography variant="body2">Drop here</Typography>
      )}
    </Paper>
  );
}

export function MeaningMatcher({ title, pairs }: MeaningMatcherProps) {
  const [answers, setAnswers] = useState<Record<number, number | null>>(
    Object.fromEntries(pairs.map((p) => [p.id, null]))
  );
  const [checked, setChecked] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const draggedId = Number(active.id);

    // reset check state when user moves cards
    setChecked(false);

    // move card back to options
    if (over.id === 'options') {
      setAnswers((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((k) => {
          if (updated[Number(k)] === draggedId) {
            updated[Number(k)] = null;
          }
        });
        return updated;
      });
      return;
    }

    const dropId = Number(over.id);

    setAnswers((prev) => {
      const updated = { ...prev };

      // remove card from any previous drop
      Object.keys(updated).forEach((k) => {
        if (updated[Number(k)] === draggedId) {
          updated[Number(k)] = null;
        }
      });

      // assign card to this drop zone
      updated[dropId] = draggedId;

      return updated;
    });
  };

  const usedIds = Object.values(answers).filter(
    (id): id is number => id !== null
  );

  const options = pairs.filter((p) => !usedIds.includes(p.id));

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h6" mb={2}>
        {title}
      </Typography>

      <DndContext onDragEnd={handleDragEnd}>
        {pairs.map((p) => {
          const selected = pairs.find((x) => x.id === answers[p.id]) ?? null;

          return (
            <Box key={p.id} mb={2}>
              <Paper sx={{ p: 1 }}>
                <Typography>{p.left}</Typography>
              </Paper>

              <Drop id={p.id} item={selected} checked={checked} />
            </Box>
          );
        })}

        <Box mt={4} sx={{ minHeight: 80, border: '1px dashed #ccc', p: 1 }}>
          <Typography mb={1}>Options:</Typography>

          <Box display="flex" gap={1} flexWrap="wrap">
            {options.map((o) => (
              <Card key={o.id} id={o.id} text={o.right} />
            ))}
          </Box>
        </Box>
      </DndContext>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => {
          setChecked(true);
        }}
      >
        Check
      </Button>
    </Box>
  );
}
