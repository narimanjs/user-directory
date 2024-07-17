export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  phone?: string;
  description?: string;
}

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface UsersState {
  users: User[];
  user: User | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}
