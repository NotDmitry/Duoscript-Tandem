import AuthForm from '@/components/AuthForm/AuthForm';
import { useState } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';

function Profile() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName ?? '');

  return (
    <AuthForm
      mode="PROFILE"
      profileTitle={displayName}
      onProfileUpdate={(newDisplayName: string) => {
        setDisplayName(newDisplayName);
      }}
    />
  );
}

export default Profile;
