import { Stack, Container, Paper } from '@mui/material';
import type { AsyncSorterBlock, FocusZone } from './types';

interface SourceProps {
  onSourceContainerRef: (el: HTMLDivElement | null) => void;
  onSourceItemRef: (index: number, el: HTMLDivElement | null) => void;
  handleZoneKeyDown: (
    e: React.KeyboardEvent<HTMLDivElement>,
    zone: FocusZone,
    insertBefore: number,
    index: number
  ) => void;
  sourceItems: AsyncSorterBlock[] | undefined;
  draggedItem: AsyncSorterBlock | null;
  handleItemKeyDown: (
    e: React.KeyboardEvent<HTMLDivElement>,
    item: AsyncSorterBlock,
    zone: FocusZone,
    index: number
  ) => void;
  handleDragStart: (item: AsyncSorterBlock) => void;
  handleDragEnd: () => void;
}

export default function Source({
  onSourceContainerRef,
  onSourceItemRef,
  handleZoneKeyDown,
  sourceItems,
  draggedItem,
  handleItemKeyDown,
  handleDragStart,
  handleDragEnd,
}: SourceProps) {
  return (
    <Container>
      <Paper
        ref={onSourceContainerRef}
        role="region"
        aria-labelledby="async-sorter-dnd-title"
        aria-describedby="async-sorter-dnd-instructions"
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>): void => {
          handleZoneKeyDown(e, 'source', 0, 0);
        }}
        square={false}
        sx={{ p: 3, backgroundColor: '#f0f0f0', minHeight: 92 }}
      >
        <Stack direction="row" spacing={2}>
          {sourceItems?.map((item, index) => {
            const isDragging = draggedItem?.id === item.id;
            return (
              <Paper
                ref={(el: HTMLDivElement | null) => {
                  onSourceItemRef(index, el);
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isDragging}
                aria-describedby="async-sorter-dnd-instructions"
                onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>): void => {
                  handleItemKeyDown(e, item, 'source', index);
                }}
                draggable
                onDragStart={() => {
                  handleDragStart(item);
                }}
                onDragEnd={handleDragEnd}
                elevation={3}
                sx={{
                  p: '10px',
                  background: isDragging ? '#cbcbcb' : 'white',
                }}
                key={item.id}
              >
                {item.label}
              </Paper>
            );
          })}
        </Stack>
      </Paper>
    </Container>
  );
}
