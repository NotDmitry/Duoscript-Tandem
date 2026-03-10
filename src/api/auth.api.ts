import type { registerData } from '@/shared/types/auth.types';
import { addUser, userExist } from './auth.mock';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function register(registerData: registerData) {
  await delay(1000);
  if (userExist(registerData.nickname)) {
    throw Error('User with this nickname already exists');
  }
  localStorage.setItem('user', registerData.nickname);
  const newUser = {
    nickname: registerData.nickname,
    password: registerData.password,
  };
  const newUserData = addUser(newUser);
  const accessToken = 'access';
  const refreshToken = 'refresh';

  return {
    accessToken,
    refreshToken,
    user: {
      id: newUserData.id,
      nickname: newUserData.nickname,
    },
  };
}
