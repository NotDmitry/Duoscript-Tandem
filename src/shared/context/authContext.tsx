import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type {
  AuthContextType,
  User,
  loginData,
  registerData,
} from '../types/auth.types';
import { login, register } from '@/api/auth.api';
import { useNavigate } from 'react-router';
import { getUserId } from '@/api/auth.mock';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);

  useEffect(() => {
    if (user) {
      navigate('/profile');
    } else navigate('/login');
  }, [user, navigate]);
  useEffect(() => {
    const savedUser: string | null = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser) as {
        accessToken?: string;
        refreshToken?: string;
        nickname?: string;
        id?: string;
      };

      const nickname = parsedUser.nickname;
      if (nickname) {
        const user = {
          nickname,
          id: getUserId(nickname),
        };
        setTimeout(() => {
          setUser(user);
        }, 0);
      }
    }
  }, []);

  const loginFunc = async (loginData: loginData) => {
    const response = await login(loginData);
    sessionStorage.setItem('showSuccess', 'logged in');
    setUser(response.user);
  };

  const registerFunc = async (registerData: registerData) => {
    const response = await register(registerData);
    sessionStorage.setItem('showSuccess', 'registered');
    setUser(response.user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loginFunc, registerFunc, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
