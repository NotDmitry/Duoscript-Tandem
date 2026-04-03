import { Box, Container, Button } from '@mui/material';
import type { AsyncSorterBlock } from './types';
import type { AsyncSorterTask } from '@models/widgetModel';
interface ButtonBoxProps {
  isSubmitClicked: boolean;
  clearZones: () => void;
  setDraggedItem: React.Dispatch<React.SetStateAction<AsyncSorterBlock | null>>;
  setAllDragged: React.Dispatch<React.SetStateAction<boolean>>;
  failedTasks: Map<number, AsyncSorterTask>;
  taskIndex: number;
  task: AsyncSorterTask;
  setFailedTasks: React.Dispatch<
    React.SetStateAction<Map<number, AsyncSorterTask>>
  >;

  checkIsCompleted: (successLength: number, failLength: number) => void;
  successfulTasks: Map<number, AsyncSorterTask>;
  tasksNumber: number;
  setTaskIndex: React.Dispatch<React.SetStateAction<number>>;
  allDragged: boolean;
  onSubmitClick: () => Promise<void>;
  onNextTaskClick: () => void;
}
export default function ButtonsBox({
  isSubmitClicked,
  clearZones,
  setDraggedItem,
  setAllDragged,
  failedTasks,
  taskIndex,
  task,
  setFailedTasks,
  checkIsCompleted,
  successfulTasks,
  tasksNumber,
  setTaskIndex,
  allDragged,
  onSubmitClick,
  onNextTaskClick,
}: ButtonBoxProps) {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Button
          disabled={isSubmitClicked}
          onClick={() => {
            clearZones();
            setDraggedItem(null);
            setAllDragged(false);
            const newMap = new Map(failedTasks);
            newMap.set(taskIndex, task);
            setFailedTasks(newMap);

            checkIsCompleted(successfulTasks.size, newMap.size);
            if (tasksNumber > taskIndex + 1) {
              setTaskIndex(taskIndex + 1);
            }
          }}
          variant="contained"
          sx={{ mr: 1 }}
        >
          Skip
        </Button>
        <Button
          variant="contained"
          disabled={!allDragged}
          onClick={
            !isSubmitClicked
              ? () => {
                  void onSubmitClick();
                }
              : () => {
                  onNextTaskClick();
                }
          }
        >
          {isSubmitClicked ? 'Next Task' : 'Submit'}
        </Button>
      </Box>
    </Container>
  );
}
