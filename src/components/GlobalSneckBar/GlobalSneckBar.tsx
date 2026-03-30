import { useUI } from '@hooks/useUI';
import { Snackbar, Alert } from '@mui/material';

export const GlobalSnackbar = () => {
  const { toast, clearToast } = useUI();

  return (
    <Snackbar open={!!toast} autoHideDuration={3000} onClose={clearToast}>
      <Alert
        onClose={clearToast}
        severity={toast?.type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {toast?.message}
      </Alert>
    </Snackbar>
  );
};
