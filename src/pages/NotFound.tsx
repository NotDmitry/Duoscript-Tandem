import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { keyframes } from '@emotion/react';
import spongebobImg from '@assets/images/Spongebob_1500x1500.png';

const wobble = keyframes`
  0%, 100% { transform: rotate(-2deg); }
  50% { transform: rotate(2deg); }
`;

const floatBob = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          animation: `${fadeInUp} 0.8s ease-out`,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '6rem', sm: '8rem' },
            fontWeight: 900,
            color: 'text.primary',
          }}
        >
          404
        </Typography>
        <Box
          component="img"
          src={spongebobImg}
          alt="Sad SpongeBob"
          sx={{
            width: { xs: 200, sm: 260 },
            height: 'auto',
            animation: `${floatBob} 3s ease-in-out infinite, ${wobble} 4s ease-in-out infinite`,
            filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
          }}
        />
        <Typography
          variant="h5"
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: 3,
            fontSize: { xs: '1rem', sm: '1.25rem' },
          }}
        >
          Aye-aye, this page is lost at sea!
        </Typography>
        <Typography
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            maxWidth: 400,
            fontSize: { xs: '0.85rem', sm: '0.95rem' },
          }}
        >
          The page you are looking for has drifted away into the deep ocean.
          Even SpongeBob can not find it.
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            navigate('/');
          }}
        >
          Home page
        </Button>
      </Box>
    </Box>
  );
}

export default NotFound;
