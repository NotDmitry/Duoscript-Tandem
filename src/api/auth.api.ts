import type { loginData, registerData } from '@/shared/types/auth.types';
import { addUser, getUserId, isPasswordCorrect, userExist } from './auth.mock';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function setUserDataToLS(
  accessToken: string,
  refreshToken: string,
  nickname: string
) {
  localStorage.setItem(
    'user',
    JSON.stringify({ accessToken, refreshToken, nickname })
  );
}
export async function register(registerData: registerData) {
  await delay(1000);
  if (userExist(registerData.nickname)) {
    throw Error('User with this nickname already exists');
  }
  const newUser = {
    nickname: registerData.nickname,
    password: registerData.password,
  };
  const newUserData = addUser(newUser);
  const accessToken = 'access';
  const refreshToken = 'refresh';
  setUserDataToLS(accessToken, refreshToken, registerData.nickname);
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

  const accessToken = 'access';
  const refreshToken = 'refresh';
  setUserDataToLS(accessToken, refreshToken, loginData.nickname);
  return {
    accessToken,
    refreshToken,
    user: {
      id: getUserId(loginData.nickname),
      nickname: loginData.nickname,
    },
  };
}
