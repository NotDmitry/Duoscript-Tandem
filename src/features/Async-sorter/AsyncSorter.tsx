import {
  Box,
  Typography,
  Grid,
  Stack,
  Container,
  Paper,
  Button,
} from '@mui/material';

export default function AsyncSorter() {
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        sx={{ textAlign: 'center', m: 2 }}
      >
        Async Sorter
      </Typography>
      <Typography gutterBottom sx={{ textAlign: 'center', m: 2 }}>
        In what order will 'console.log' be output?
      </Typography>
      <Container>
        <Paper square={false} sx={{ p: 3, backgroundColor: '#f0f0f0' }}>
          <Stack spacing={1}>
            <Box>console.log('1');</Box>
            <Box>setTimeout(() =`{'>'}` console.log('2'), 0);</Box>
            <Box>Promise.resolve().then(() =`{'>'}` console.log('3'));</Box>
            <Box>console.log('4');</Box>
          </Stack>
        </Paper>
      </Container>
      <Typography gutterBottom sx={{ textAlign: 'center', m: 2 }}>
        Drag the blocks into the correct queues:
      </Typography>
      <Container>
        <Paper square={false} sx={{ p: 3, backgroundColor: '#f0f0f0' }}>
          <Stack direction="row" spacing={2}>
            <Paper draggable elevation={3} sx={{ p: 2 }}>
              1
            </Paper>
            <Paper draggable elevation={3} sx={{ p: 2 }}>
              2
            </Paper>
            <Paper draggable elevation={3} sx={{ p: 2 }}>
              3
            </Paper>
            <Paper draggable elevation={3} sx={{ p: 2 }}>
              4
            </Paper>
          </Stack>
        </Paper>
      </Container>

      <Box sx={{ m: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 4 }}>
            <Paper>
              <Typography sx={{ fontWeight: 800, textAlign: 'center' }}>
                Call Stack
              </Typography>
              <Box sx={{ p: 1, height: 80 }}></Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Paper>
              <Typography sx={{ fontWeight: 800, textAlign: 'center' }}>
                Microtasks
              </Typography>
              <Box sx={{ p: 1, height: 80 }}></Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Paper>
              <Typography sx={{ fontWeight: 800, textAlign: 'center' }}>
                Macrotasks
              </Typography>
              <Box sx={{ p: 1, height: 80 }}></Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Container>
        <Typography>Final order of output:</Typography>
        <Paper sx={{ p: 1, mb: 2, backgroundColor: '#f0f0f0' }}>1 2 3 4</Paper>
      </Container>
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button variant="outlined" sx={{ mr: 1 }}>
            Skip
          </Button>
          <Button variant="outlined">Submit</Button>
        </Box>
        <Box>
          <Button variant="contained">Run Loop</Button>
        </Box>
      </Container>
    </Container>
  );
}
