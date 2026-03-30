import type { UserAuthView } from '@/shared/models/userModel';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  displayName: string;
  password: string;
  repeatPassword: string;
}

export interface UpdateProfileData {
  email: string;
  displayName: string;
  password: string;
}

export interface AuthContextType {
  user: UserAuthView | null;
  loginFunc: (data: LoginData) => Promise<void>;
  registerFunc: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfileFunc: (data: UpdateProfileData) => Promise<void>;
}
