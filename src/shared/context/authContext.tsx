import type { ReactNode } from 'react';
import { createContext, useState } from 'react';
import type {
  LoginData,
  RegisterData,
  UpdateProfileData,
} from '@shared-types/auth.types';
import type { UserAuthView } from '@models/userModel';
import {
  getCurrentUser,
  login,
  register,
  signOut,
  updateUserProfile,
} from '@api/auth.api';

interface AuthContextType {
  user: UserAuthView | null;
  loginFunc: (data: LoginData) => Promise<void>;
  registerFunc: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfileFunc: (data: UpdateProfileData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserAuthView | null>(() => getCurrentUser());

  const loginFunc = async (data: LoginData): Promise<void> => {
    const authUser = await login(data);
    setUser(authUser);
  };

  const registerFunc = async (data: RegisterData): Promise<void> => {
    const authUser = await register(data);
    setUser(authUser);
  };

  const logout = (): void => {
    void signOut();
    setUser(null);
  };

  const updateProfileFunc = async (data: UpdateProfileData): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    const updatedUser = await updateUserProfile(user.uid, data);
    setUser(updatedUser);
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
