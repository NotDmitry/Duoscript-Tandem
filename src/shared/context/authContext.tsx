import { createContext, type ReactNode, useEffect, useState } from 'react';
import type {
  LoginData,
  RegisterData,
  UpdateProfileData,
} from '@shared-types/auth.types';
import type { UserAuthView } from '@models/userModel';
import { toUserAuthView } from '@models/userModel';
import {
  getCurrentUser,
  login,
  register,
  signOut,
  updateUserProfile,
} from '@api/auth.api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

interface AuthContextType {
  user: UserAuthView | null;
  loginFunc: (data: LoginData) => Promise<void>;
  registerFunc: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfileFunc: (data: UpdateProfileData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserAuthView | null>(
    USE_MOCK ? getCurrentUser() : null
  );

  useEffect(() => {
    if (USE_MOCK) return;

    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        try {
          setUser(toUserAuthView(firebaseUser));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });
  }, []);

  const loginFunc = async (data: LoginData): Promise<void> => {
    const authUser = await login(data);
    if (USE_MOCK) setUser(authUser);
  };

  const registerFunc = async (data: RegisterData): Promise<void> => {
    const authUser = await register(data);
    if (USE_MOCK) setUser(authUser);
  };

  const logout = (): void => {
    void signOut();
    if (USE_MOCK) setUser(null);
  };

  const updateProfileFunc = async (data: UpdateProfileData): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    const updatedUser = await updateUserProfile(user.uid, data);
    if (USE_MOCK) setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, loginFunc, registerFunc, logout, updateProfileFunc }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
