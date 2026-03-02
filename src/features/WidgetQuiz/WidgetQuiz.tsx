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
import type { QuizType } from './WidgetQuiz.types.ts';

function WidgetQuiz(quizType: QuizType) {
  console.log(quizType);
  if (quizType.type !== 'css') {
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
        <FormLabel sx={{ typography: 'h4' }}>CSS Quiz</FormLabel>
        <FormLabel sx={{ typography: 'subtitle1' }}>Question 1 of 45</FormLabel>
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
          <FormLabel>What will be if...</FormLabel>
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
            <code
              style={{ textWrap: 'wrap' }}
            >{`.class {blah-blah-blah}`}</code>
          </Box>
        </Box>
        <Box>
          <RadioGroup
            aria-labelledby="radio-buttons-answers-group-label"
            name="radio-buttons-answers"
            value={'1'}
            sx={{
              marginLeft: 2,
            }}
          >
            {[
              [1, 'one'],
              [2, 'two'],
            ].map(([index, label]) => (
              <FormControlLabel
                key={index}
                value={String(index)}
                control={<Radio size="small" sx={{ padding: '6px' }} />}
                label={label}
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
        <Button variant="contained" color="error">
          Skip
        </Button>
        <Button variant="contained" color="success">
          Next
        </Button>
      </Box>
    </Container>
  );
}

export default WidgetQuiz;
