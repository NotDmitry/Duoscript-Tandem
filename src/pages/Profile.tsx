import { getUserNameFromLS } from '@/api/auth.api';
import AuthForm from '@/components/AuthForm/AuthForm';
import { useState } from 'react';

function Profile() {
  const [name, setName] = useState(getUserNameFromLS());

  return (
    <AuthForm
      mode="PROFILE"
      profileTitle={name}
      onProfileUpdate={(newName: string) => {
        setName(newName);
      }}
    />
  );
}

export default Profile;
