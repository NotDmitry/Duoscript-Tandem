import { Box, Typography, Grid, Stack, Paper } from '@mui/material';
import type {
  AsyncSorterBlock,
  DropIndicator,
  DropZones,
  FocusZone,
  Zone,
} from './types';
interface QueuesProps {
  dropZones: DropZones[];
  handleZoneKeyDown: (
    e: React.KeyboardEvent<HTMLDivElement>,
    zone: FocusZone,
    insertBefore: number,
    index: number
  ) => void;
  draggedItem: AsyncSorterBlock | null;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  isSubmitClicked: boolean;

  setDropIndicator: React.Dispatch<React.SetStateAction<DropIndicator | null>>;
  handleDragEnd: () => void;
  handleDrop: (zone: Zone, insertBeforeInd: number) => void;
  selectedItem: AsyncSorterBlock | null;
  handleItemKeyDown: (
    e: React.KeyboardEvent<HTMLDivElement>,
    item: {
      id: string;
      code: string;
      label: string;
    },
    zone: FocusZone,
    index: number
  ) => void;
  handleDragStart: (item: AsyncSorterBlock) => void;
  dropIndicator: DropIndicator | null;
  setQueuesItemRef: (
    zone: Zone,
    el: HTMLDivElement | null,
    index: number
  ) => void;
  setQueuesContainerRef: (el: HTMLDivElement | null, zone: Zone) => void;
}
export default function Queues({
  dropZones,
  handleZoneKeyDown,
  draggedItem,
  handleDragOver,
  isSubmitClicked,
  setDropIndicator,
  handleDragEnd,
  handleDrop,
  selectedItem,
  handleItemKeyDown,
  handleDragStart,
  dropIndicator,
  setQueuesItemRef,
  setQueuesContainerRef,
}: QueuesProps) {
  return (
    <Box sx={{ m: 3, width: '90%' }}>
      <Grid container spacing={2}>
        {dropZones.map(({ zone, title, items, answerColors }, index) => {
          const zoneId = zone.replace(/\s+/g, '-').toLowerCase();
          const titleId = `async-sorter-zone-title-${zoneId}`;
          return (
            <Grid size={{ xs: 4 }} key={zone}>
              <Paper
                tabIndex={0}
                role="region"
                aria-labelledby={titleId}
                aria-describedby="async-sorter-dnd-instructions"
                ref={(el: HTMLDivElement | null) => {
                  setQueuesContainerRef(el, zone);
                }}
                onKeyDown={(e) => {
                  handleZoneKeyDown(e, zone, items.length, index);
                }}
                sx={{
                  backgroundColor: draggedItem ? '#56f6565b' : '#f0f0f0',
                }}
              >
                <Typography
                  id={titleId}
                  sx={{ fontWeight: 800, textAlign: 'center' }}
                >
                  {title}
                </Typography>
                <Stack
                  direction="row"
                  spacing={items.length < 4 ? 1 : 0}
                  onDragOver={(e) => {
                    handleDragOver(e);
                    if (
                      draggedItem &&
                      !isSubmitClicked &&
                      e.target === e.currentTarget
                    ) {
                      setDropIndicator({
                        zone,
                        insertBefore: items.length,
                      });
                    }
                  }}
                  onDragEnd={handleDragEnd}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleDrop(zone, items.length);
                  }}
                  sx={{ p: 1, minHeight: 60 }}
                >
                  {items.map((item, index) => {
                    const isSelected = selectedItem?.id === item.id;
                    return (
                      <Paper
                        ref={(el: HTMLDivElement | null) => {
                          setQueuesItemRef(zone, el, index);
                        }}
                        key={item.id}
                        tabIndex={0}
                        role="button"
                        aria-pressed={isSelected}
                        aria-describedby="async-sorter-dnd-instructions"
                        draggable={!isSubmitClicked}
                        onKeyDown={(
                          e: React.KeyboardEvent<HTMLDivElement>
                        ): void => {
                          if (selectedItem) {
                            handleZoneKeyDown(e, zone, index, index);
                          } else {
                            handleItemKeyDown(e, item, zone, index);
                          }
                        }}
                        onDragStart={() => {
                          if (!isSubmitClicked) handleDragStart(item);
                        }}
                        onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
                          handleDragOver(e);
                          e.stopPropagation();
                          if (draggedItem && !isSubmitClicked) {
                            setDropIndicator({ zone, insertBefore: index });
                          }
                        }}
                        onDragEnd={handleDragEnd}
                        onDrop={(e: React.DragEvent<HTMLDivElement>) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDrop(zone, index);
                        }}
                        elevation={3}
                        sx={{
                          p: '10px',
                          backgroundColor: isSelected
                            ? '#cbcbcb'
                            : isSubmitClicked
                              ? answerColors?.[index]
                              : '',
                          borderLeft:
                            !isSubmitClicked &&
                            !selectedItem &&
                            draggedItem &&
                            dropIndicator?.zone === zone &&
                            dropIndicator.insertBefore === index
                              ? '3px solid #2e7d32'
                              : '3px solid transparent',
                          boxSizing: 'border-box',
                        }}
                      >
                        {item.label}
                      </Paper>
                    );
                  })}
                </Stack>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
