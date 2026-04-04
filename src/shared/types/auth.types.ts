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
  email?: string;
  displayName?: string;
  password?: string;
}
