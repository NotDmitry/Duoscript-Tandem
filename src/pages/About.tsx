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
  return <div>About Page</div>;
}

export default About;
