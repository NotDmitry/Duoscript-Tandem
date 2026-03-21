import { Box, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuizIcon from '@mui/icons-material/Quiz';
import BarChartIcon from '@mui/icons-material/BarChart';

const cards = [
  {
    icon: <MenuBookIcon fontSize="large" />,
    title: 'Topic-based Courses',
    description:
      'A library of courses organized by topic — ' +
      'JavaScript, TypeScript, CSS, HTML, GitHub, ' +
      'and algorithms — each broken down into focused lessons.',
  },
  {
    icon: <QuizIcon fontSize="large" />,
    title: 'Interactive Quizzes',
    description:
      'Various widgets with code snippets and multiple-choice ' +
      'answers give you instant feedback on every question.',
  },
  {
    icon: <BarChartIcon fontSize="large" />,
    title: 'Progress Tracking',
    description:
      'A personal dashboard to monitor your stats, track ' +
      'completed lessons, and review your activity history.',
  },
];

function About() {
  console.log(cards);
  return (
    <Box
      sx={{
        maxWidth: { xs: 1, md: 1300, xl: 1600 },
        mx: 'auto',
        px: 3,
        py: 5,
      }}
    >
      <Box textAlign="center" mb={6}>
        <SchoolIcon
          sx={{
            fontSize: 56,
            color: 'rgba(255,0,0,0.6)',
            mb: 1,
          }}
        />
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Duoscript-Tandem
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 720,
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          Your companion for preparing for technical interviews in web
          development. Practice consistently, track your progress, and stay on
          track — whether you're brushing up on fundamentals or tackling
          advanced concepts.
        </Typography>
      </Box>
    </Box>
  );
}

export default About;
