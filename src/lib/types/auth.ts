export type Role = "admin" | "user";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: Role;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: AuthUser;
}
