import type {
  LoginResponse,
  loginData,
  registerData,
} from '@/shared/types/auth.types';
import {
  addUser,
  getUserId,
  isPasswordCorrect,
  userExist,
  updateUser,
} from './auth.mock';
import {
  createAccessToken,
  createRefreshToken,
} from '@/shared/utils/jwt.utils';
import {
  userStorageSchema,
  type UserStorage,
} from '@/shared/schemas/authSchemas';

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
export function getUserNameFromLS(): string {
  const user = localStorage.getItem('user');
  if (!user) {
    throw Error('User is not logged in');
  }
  const parsedUser: UserStorage = userStorageSchema.parse(JSON.parse(user));
  return parsedUser.nickname;
}
export async function register(
  registerData: registerData
): Promise<LoginResponse> {
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
export async function login(loginData: loginData): Promise<LoginResponse> {
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
export async function updateProfile(
  profileData: loginData
): Promise<LoginResponse> {
  await delay(1000);
  if (userExist(profileData.nickname)) {
    throw Error(`User with nickname ${profileData.nickname} is already exist`);
  }
  const savedUser: string | null = localStorage.getItem('user');
  if (!savedUser) {
    throw Error(`You are not logged in`);
  }
  const parsedUser: UserStorage = userStorageSchema.parse(
    JSON.parse(savedUser)
  );
  const savedNickname = parsedUser.nickname;
  const id = getUserId(savedNickname);
  updateUser({
    nickname: profileData.nickname,
    password: profileData.password,
    id,
  });
  setUserDataToLS(
    parsedUser.accessToken,
    parsedUser.refreshToken,
    profileData.nickname
  );

  return {
    accessToken: parsedUser.accessToken,
    refreshToken: parsedUser.refreshToken,
    user: {
      id,
      nickname: profileData.nickname,
    },
  };
}
