import { FormLabel, Container, CircularProgress } from '@mui/material';
import type { QuizType } from '@/features/WidgetQuiz/WidgetQuiz.types.ts';

function WidgetQuiz(quizType: QuizType) {
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
    ></Container>
  );
}

export default WidgetQuiz;
