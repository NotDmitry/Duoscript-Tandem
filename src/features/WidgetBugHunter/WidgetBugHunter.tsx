import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import type { QuizType } from './WidgetBugHunter.types.ts';
import { blue, grey } from '@mui/material/colors';
import { useWidgetBugHunter } from '@/shared/hooks/useWidgetBugHunter.ts';

function WidgetBugHunter(quizType: QuizType) {
  const {
    isLoading,
    quizName,
    tasks,
    currentTaskIndex,
    currentTask,
    currentSelections,
    codeParts,
    isFinish,
    failedTasks,
    handleSelect,
    handleNext,
    handleSkip,
  } = useWidgetBugHunter(quizType);

  if (isLoading) {
    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '-webkit-fill-available',
        }}
      >
        <CircularProgress size={40} color="primary" />
        <FormLabel>Loading quiz...</FormLabel>
      </Container>
    );
  }

  if (isFinish) {
    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: 4,
          height: '-webkit-fill-available',
        }}
      >
        {failedTasks.length !== 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <FormLabel
              sx={{
                typography: 'h4',
              }}
            >
              Something was wrong 🐞
            </FormLabel>
            {failedTasks.map((task, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '-webkit-fill-available',
                  width: '100%',
                }}
              >
                <Box
                  component="pre"
                  sx={{
                    bgcolor: blue['50'],
                    padding: 2,
                    borderRadius: '16px',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: grey['500'],
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  <code>{task}</code>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <FormLabel
            sx={{
              typography: 'h4',
            }}
          >
            🎉 Congrats! No mistakes! 🎉
          </FormLabel>
        )}
      </Container>
    );
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '-webkit-fill-available',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: 1,
          paddingBottom: 1,
        }}
      >
        <FormLabel sx={{ typography: 'h4' }}>{quizName}</FormLabel>
        <FormLabel sx={{ typography: 'subtitle1' }}>
          Task {currentTaskIndex + 1} of {tasks.length}
        </FormLabel>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '-webkit-fill-available',
        }}
      >
        <Typography
          sx={{
            typography: 'subtitle1',
            color: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          Fix the next block:
        </Typography>
        <Box
          component="pre"
          sx={{
            bgcolor: blue['50'],
            padding: 2,
            borderRadius: '16px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: grey['500'],
            whiteSpace: 'pre-wrap',
          }}
        >
          <code>
            {codeParts.map((part, index) => (
              <span key={index}>
                {part}
                {index < codeParts.length - 1 && (
                  <Select
                    value={currentSelections[index]}
                    onChange={(event): void => {
                      handleSelect(index, event.target.value);
                    }}
                    size="small"
                    sx={{
                      mx: 0.5,
                      height: '1.6em',
                      verticalAlign: 'middle',
                      fontSize: 'inherit',
                    }}
                  >
                    {currentTask?.answers[index].map((answer) => (
                      <MenuItem key={answer} value={answer}>
                        {answer}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </span>
            ))}
          </code>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          columnGap: 10,
        }}
      >
        <Button variant="contained" color="error" onClick={handleSkip}>
          Skip
        </Button>
        <Button variant="contained" color="success" onClick={handleNext}>
          {currentTaskIndex === tasks.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Container>
  );
}

export default WidgetBugHunter;
