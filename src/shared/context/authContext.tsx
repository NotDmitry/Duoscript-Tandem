import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type {
  AuthContextType,
  User,
  loginData,
  registerData,
} from '../types/auth.types';
import { login, register } from '@/api/auth.api';
import { useNavigate } from 'react-router';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);

  const loginFunc = async (loginData: loginData) => {
    const response = await login(loginData);

    setUser(response.user);
    await navigate('/dashboard');
  };

  const registerFunc = async (registerData: registerData) => {
    const response = await register(registerData);
    setUser(response.user);
    await navigate('/dashboard');
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');

    await navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loginFunc, registerFunc, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
