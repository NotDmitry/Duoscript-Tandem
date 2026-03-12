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

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [isRegistration, setIsRegistration] = useState(false);

  useEffect(() => {
    const message = isRegistration ? 'registered' : 'logged in';
    if (user) {
      navigate('/profile', {
        state: {
          successMessage: `You have successfully ${message}!`,
        },
      });
    } else navigate('/login');
  }, [user, navigate, isRegistration]);

  const loginFunc = async (loginData: loginData) => {
    const response = await login(loginData);
    setIsRegistration(false);
    setUser(response.user);
  };

  const registerFunc = async (registerData: registerData) => {
    const response = await register(registerData);
    setIsRegistration(true);
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
