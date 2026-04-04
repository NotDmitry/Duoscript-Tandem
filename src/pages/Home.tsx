import { useNavigate } from 'react-router';
import { useAuth } from '@hooks/useAuth';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import landingExample1 from '@assets/images/Landing_Example_1.jpg';
import landingExample2 from '@assets/images/Landing_Example_2.jpg';

const GREETING = 'Hello dear';
const DEFAULT_USERNAME = 'developer';
const APP_DESCRIPTION =
  'Duoscript-Tandem is your best friend during the tough times of preparing\n' +
  'for technical interviews. Its primary aim is to provide you with a\n' +
  'variety of exercises that will aid in the development and enhancement of\n' +
  'your hard-skills. The app contains multiple widgets and a dashboard for\n' +
  'tracking your activity.';
const images = [
  {
    link: landingExample1,
    alt: 'Dashboard example',
  },
  {
    link: landingExample2,
    alt: 'Quiz task example',
  },
];

function Home() {
  const navigate = useNavigate();
  const { user, isUserLoading } = useAuth();
  const displayName: string = user?.displayName ?? DEFAULT_USERNAME;

  if (isUserLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 4,
        maxWidth: { xs: 1, md: 1300, xl: 1600 },
        mx: 'auto',
        px: 3,
        py: 5,
      }}
    >
      <Typography
        typography="h5"
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {GREETING} {displayName}
      </Typography>
      <Typography
        textAlign="center"
        typography="subtitle1"
        sx={{
          width: 'fit-content',
          maxWidth: '700px',
        }}
      >
        {APP_DESCRIPTION}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: 3,
          maxWidth: { xs: 1, md: 1300, xl: 1600 },
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            component="img"
            sx={{
              maxWidth: { xs: 1, md: 350, xl: 500 },
              borderRadius: 2,
              padding: 2,
              boxShadow: '0 0 24px 1px rgba(0,0,0,0.08)',
            }}
            alt={image.alt}
            src={image.link}
          />
        ))}
      </Box>
      {user === null && (
        <Button
          variant="contained"
          onClick={() => {
            navigate('/register');
          }}
        >
          Registration
        </Button>
      )}
    </Box>
  );
}

export default Home;
