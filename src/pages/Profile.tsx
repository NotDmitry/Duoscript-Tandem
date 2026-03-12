import AuthForm from '@/components/AuthForm/AuthForm';
import { useLocation } from 'react-router';
import { Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
interface LocationState {
  successMessage?: string;
}

function Profile() {
  const [message, setMessage] = useState<string | undefined>('');
  const location = useLocation();
  const state = location.state as LocationState | null;
  useEffect(() => {
    if (state && 'successMessage' in state) {
      setTimeout(() => {
        setMessage(state.successMessage);
        window.history.replaceState({}, '');
      }, 0);
    }
  }, [state]);

  return (
    <>
      <AuthForm mode="PROFILE" profileTitle="John Dou" />
      {message && message !== '' && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={() => {
            setMessage('');
          }}
        >
          <Alert
            onClose={() => {
              setMessage('');
            }}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default Profile;
