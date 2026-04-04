import type { UserAuthView } from '@models/userModel';
import { toUserAuthView, userConverter } from '@models/userModel';
import type {
  LoginData,
  RegisterData,
  UpdateProfileData,
} from '@shared-types/auth.types';

// Mock Imports
import {
  mockGetUidByEmail,
  mockGetUserByUid,
  mockIsPasswordCorrect,
  mockRegisterUser,
  mockUpdateUser,
  mockUserEmailExists,
} from '@mocks/auth.mock';
import { delay } from '@utils/delay';

// Firebase Imports
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { throwFirebaseError } from '@utils/firebaseError';

// Switch

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Mock Implementation

const SESSION_KEY = 'auth_id';

function saveUserSession(uid: string): void {
  localStorage.setItem(SESSION_KEY, uid);
}

function clearUserSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): UserAuthView | null {
  if (!USE_MOCK) return null;
  const uid = localStorage.getItem(SESSION_KEY);
  if (!uid) return null;
  try {
    return mockGetUserByUid(uid);
  } catch {
    clearUserSession();
    return null;
  }
}

async function mockRegister(data: RegisterData): Promise<UserAuthView> {
  await delay(1000);
  if (mockUserEmailExists(data.email)) {
    throw new Error(`A user with email ${data.email} is already registered`);
  }
  const newUser = mockRegisterUser(data.email, data.displayName, data.password);
  saveUserSession(newUser.uid);
  return newUser;
}

async function mockLogin(data: LoginData): Promise<UserAuthView> {
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

async function mockUpdateUserProfile(
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

async function mockSignOut(): Promise<void> {
  await delay(1000);
  clearUserSession();
}

// Firebase Implementation

async function fbRegister(data: RegisterData): Promise<UserAuthView> {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    await updateProfile(credential.user, { displayName: data.displayName });

    await setDoc(
      doc(db, 'users', credential.user.uid).withConverter(userConverter),
      {
        uid: credential.user.uid,
        displayName: data.displayName,
        email: data.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        overallProgress: { progressPercent: 0, updatedAt: serverTimestamp() },
        streak: { currentStreak: 0, longestStreak: 0, lastActiveDate: '' },
        dailyStats: { date: '', minutesSpent: 0, activitiesCompleted: 0 },
      }
    );

    return toUserAuthView(credential.user);
  } catch (error) {
    throwFirebaseError(error);
  }
}

async function fbLogin(data: LoginData): Promise<UserAuthView> {
  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    return toUserAuthView(credential.user);
  } catch (error) {
    throwFirebaseError(error);
  }
}

async function fbUpdateUserProfile(
  uid: string,
  newData: UpdateProfileData
): Promise<UserAuthView> {
  const currentUser = auth.currentUser;
  if (currentUser?.uid !== uid) {
    throw new Error('User not authenticated');
  }
  try {
    await updateProfile(currentUser, { displayName: newData.displayName });
    await updateEmail(currentUser, newData.email);
    await updatePassword(currentUser, newData.password);
    await updateDoc(
      doc(db, 'users', currentUser.uid).withConverter(userConverter),
      {
        displayName: newData.displayName,
        email: newData.email,
        updatedAt: serverTimestamp(),
      }
    );
    return toUserAuthView(currentUser);
  } catch (error) {
    throwFirebaseError(error);
  }
}

async function fbSignOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throwFirebaseError(error);
  }
}

// Export Switch

export const register = USE_MOCK ? mockRegister : fbRegister;
export const login = USE_MOCK ? mockLogin : fbLogin;
export const updateUserProfile = USE_MOCK
  ? mockUpdateUserProfile
  : fbUpdateUserProfile;
export const signOut = USE_MOCK ? mockSignOut : fbSignOut;
