import type { UserAuthView } from '@/shared/models/userModel';
import type {
  LoginData,
  RegisterData,
  UpdateProfileData,
} from '@/shared/types/auth.types';
import {
  mockGetUidByEmail,
  mockGetUserByUid,
  mockIsPasswordCorrect,
  mockRegisterUser,
  mockUpdateUser,
  mockUserEmailExists,
} from '@/mocks/auth.mock';
import { delay } from '@/shared/utils/delay';

const SESSION_KEY = 'auth_id';

function saveUserSession(uid: string): void {
  localStorage.setItem(SESSION_KEY, uid);
}

function clearUserSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): UserAuthView | null {
  const uid = localStorage.getItem(SESSION_KEY);
  if (!uid) return null;
  try {
    return mockGetUserByUid(uid);
  } catch {
    clearUserSession();
    return null;
  }
}

export async function register(data: RegisterData): Promise<UserAuthView> {
  await delay(1000);
  if (mockUserEmailExists(data.email)) {
    throw new Error(`A user with email ${data.email} is already registered`);
  }
  const newUser = mockRegisterUser(data.email, data.displayName, data.password);
  saveUserSession(newUser.uid);
  return newUser;
}

export async function login(data: LoginData): Promise<UserAuthView> {
  await delay(1000);
  if (!mockUserEmailExists(data.email)) {
    throw new Error(`No user found with email ${data.email}`);
  }
  if (!mockIsPasswordCorrect(data.email, data.password)) {
    throw new Error('Password is incorrect');
  }
  const uid = mockGetUidByEmail(data.email);
  saveUserSession(uid);
  return mockGetUserByUid(uid);
}

export async function updateUserProfile(
  uid: string,
  newData: UpdateProfileData
): Promise<UserAuthView> {
  await delay(1000);
  if (mockUserEmailExists(newData.email)) {
    throw new Error(`User with email ${newData.email} already exists`);
  }
  const updatedUser = mockUpdateUser(uid, {
    email: newData.email,
    displayName: newData.displayName,
    password: newData.password,
  });
  saveUserSession(updatedUser.uid);
  return updatedUser;
}

export async function signOut(): Promise<void> {
  await delay(1000);
  clearUserSession();
}
