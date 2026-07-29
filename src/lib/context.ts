import { type AuthUser, type RegisterData } from "./types/auth";
import { create } from "zustand";
import { login, register } from "./services/auth.service";

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  setIsAuthenticated: (value: boolean) => void;
  login: (email: string, password: string) => Promise<any>;
  register: (registerData: RegisterData) => Promise<any>;
  logout: () => void;
}

const storedUser = localStorage.getItem("user");

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  user: storedUser ? JSON.parse(storedUser) : null,
  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),

  login: async (email: string, password: string) => {
    const response = await login(email, password);
    localStorage.setItem("token", response.access_token);
    localStorage.setItem("user", JSON.stringify(response.user));
    set({ isAuthenticated: true, user: response.user });
    return response;
  },

  register: async (registerData: RegisterData) => {
    const response = await register(registerData);
    return response;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ isAuthenticated: false, user: null });
  },
}));
