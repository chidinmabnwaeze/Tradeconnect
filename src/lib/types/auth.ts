export type Role = "admin" | "user";
export type AccountStatus = "active" | "inactive";

export interface RegisterData {
  name?: string;
  first_name?: string;
  last_name?: string;
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
  account_code: string;
  name: string;
  email: string;
  email_verified_at?: string | null;
  is_email_verified?: boolean;
  phone_number?: string | null;
  state?: string | null;
  lga?: string | null;
  address?: string | null;
  avatar_path?: string | null;
  avatar_url?: string | null;
  role: Role;
  status: AccountStatus;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: AuthUser;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  phone_number?: string | null;
  state?: string | null;
  lga?: string | null;
  address?: string | null;
  avatar?: File | null;
}

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
}
