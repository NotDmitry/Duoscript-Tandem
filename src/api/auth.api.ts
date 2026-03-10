import type { loginData, registerData } from '@/shared/types/auth.types';
import { addUser, getUserId, isPasswordCorrect, userExist } from './auth.mock';

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
export async function login(loginData: loginData) {
  await delay(1000);
  if (
    !userExist(loginData.nickname) ||
    !isPasswordCorrect(loginData.password, loginData.nickname)
  ) {
    throw Error('LogIn failed');
  }

  localStorage.setItem('user', loginData.nickname);
  const accessToken = 'access';
  const refreshToken = 'refresh';

  return {
    accessToken,
    refreshToken,
    user: {
      id: getUserId(loginData.nickname),
      nickname: loginData.nickname,
    },
  };
}
