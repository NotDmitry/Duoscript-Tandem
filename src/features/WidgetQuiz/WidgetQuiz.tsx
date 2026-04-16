import {
  Box,
  Radio,
  FormLabel,
  Container,
  RadioGroup,
  CircularProgress,
  FormControlLabel,
  Button,
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useWidgetQuiz } from './useWidgetQuiz';

interface WidgetQuizProps {
  widgetId: string;
  onComplete?: (score: number, maxScore: number) => void;
}

function WidgetQuiz({ widgetId, onComplete }: WidgetQuizProps) {
  const {
    isLoading,
    isFinish,
    quizName,
    currentQuestionIndex,
    questionsCount,
    currentQuestion,
    selectedAnswerIndex,
    failedQuiz,
    handleAnswerSelect,
    handleNext,
    handleSkip,
  } = useWidgetQuiz(widgetId, onComplete);
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
        {failedQuiz.length === 0 ? (
          <FormLabel sx={{ typography: 'h4' }}>
            🎉 Congrats! No mistakes! 🎉
          </FormLabel>
        ) : (
          <>
            <FormLabel sx={{ typography: 'h4' }}>Failed questions</FormLabel>
            {failedQuiz.map((quiz, index) => (
              <Box
                key={index}
                sx={{
                  width: '50vw',
                  borderBottomWidth: '1px',
                  borderBottomStyle: 'solid',
                  borderBottomColor: grey['500'],
                }}
              >
                <FormLabel>
                  {index + 1} {quiz.question}
                </FormLabel>
                {!quiz.isText && (
                  <Box
                    component="pre"
                    sx={{
                      bgcolor: blue['50'],
                      padding: 2,
                      borderRadius: '16px',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: grey['500'],
                    }}
                  >
                    <code style={{ textWrap: 'wrap' }}>{quiz.code}</code>
                  </Box>
                )}
              </Box>
            ))}
          </>
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
          Question {currentQuestionIndex + 1} of {questionsCount}
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
        <Box>
          <FormLabel>{currentQuestion.question}</FormLabel>
          {!currentQuestion.isText && (
            <Box
              component="pre"
              sx={{
                bgcolor: blue['50'],
                padding: 2,
                borderRadius: '16px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: grey['500'],
              }}
            >
              <code style={{ textWrap: 'wrap' }}>{currentQuestion.code}</code>
            </Box>
          )}
        </Box>
        <Box>
          <RadioGroup
            aria-labelledby="radio-buttons-answers-group-label"
            name="radio-buttons-answers"
            value={
              selectedAnswerIndex !== null ? String(selectedAnswerIndex) : ''
            }
            onChange={(event) => {
              handleAnswerSelect(Number(event.target.value));
            }}
            sx={{
              marginLeft: 2,
            }}
          >
            {currentQuestion.answers.map(([index, answerText]) => (
              <FormControlLabel
                key={index}
                value={String(index)}
                sx={{ width: 'fit-content' }}
                control={<Radio size="small" sx={{ padding: '6px' }} />}
                label={answerText}
              />
            ))}
          </RadioGroup>
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
        <Button
          variant="contained"
          color="success"
          onClick={handleNext}
          disabled={selectedAnswerIndex === null}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}

export default WidgetQuiz;
