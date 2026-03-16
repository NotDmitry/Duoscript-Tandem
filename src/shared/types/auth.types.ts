export interface User {
  id: string;
  nickname: string;
  password: string;
}
export interface loginData {
  nickname: string;
  password: string;
}
export interface registerData {
  nickname: string;
  password: string;
  repeatPassword: string;
}
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    nickname: string;
  };
}
export interface AuthContextType {
  user: Omit<User, 'password'> | null;
  loginFunc: (loginData: loginData) => Promise<void>;
  registerFunc: (registerData: registerData) => Promise<void>;
  logout: () => void;
  updateProfileFunc: (loginData: loginData) => Promise<void>;
}
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    nickname: string;
  };
}
export type AuthMode = 'LOGIN' | 'SIGN UP' | 'PROFILE';
