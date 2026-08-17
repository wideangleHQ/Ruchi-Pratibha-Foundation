export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'MEMBER';

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
