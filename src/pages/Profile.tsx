import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { ProfileForm } from '@features/Auth/ProfileForm';

function Profile() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName ?? '');

  return <ProfileForm displayName={displayName} onUpdate={setDisplayName} />;
}

export default Profile;
