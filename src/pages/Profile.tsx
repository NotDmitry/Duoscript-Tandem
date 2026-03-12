import AuthForm from '@/components/AuthForm/AuthForm';
import { Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';

function Profile() {
  const [message, setMessage] = useState<string | undefined>('');

  useEffect(() => {
    const successMessage = sessionStorage.getItem('showSuccess');
    if (successMessage) {
      const text = `You have been successfully ${successMessage}`;

      setTimeout(() => {
        setMessage(text);
        window.history.replaceState({}, '');
      }, 0);
      sessionStorage.removeItem('showSuccess');
    }
  }, []);

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
