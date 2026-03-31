import { CssBaseline } from '@mui/material';
import AppRouter from '@/App/router/AppRouter';
import { GlobalSnackbar } from '@components/GlobalSneckBar/GlobalSneckBar';

function App() {
  return (
    <>
      <CssBaseline />
      <AppRouter />
      <GlobalSnackbar />
    </>
  );
}

export default App;
