import type { loginData, registerData } from '@/shared/types/auth.types';
import { addUser, getUserId, isPasswordCorrect, userExist } from './auth.mock';
import {
  createAccessToken,
  createRefreshToken,
} from '@/shared/utils/jwt.utils';

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
    throw Error('User with this nickname has already registered');
  }
  const newUser = {
    nickname: registerData.nickname,
    password: registerData.password,
  };
  const newUserData = addUser(newUser);
  const accessToken = createAccessToken(newUserData.id, registerData.nickname);
  const refreshToken = createRefreshToken(
    newUserData.id,
    registerData.nickname
  );
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
  if (!userExist(loginData.nickname)) {
    throw Error(`User with nickname ${loginData.nickname} isn't registered`);
  }
  if (!isPasswordCorrect(loginData.password, loginData.nickname)) {
    throw Error('Password is incorrect');
  }
  const id = getUserId(loginData.nickname);
  const accessToken = createAccessToken(id, loginData.nickname);
  const refreshToken = createRefreshToken(id, loginData.nickname);
  setUserDataToLS(accessToken, refreshToken, loginData.nickname);
  return {
    accessToken,
    refreshToken,
    user: {
      id,
      nickname: loginData.nickname,
    },
  };
}
