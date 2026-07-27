import { type RegisterData } from "./types/auth";
import { create } from "zustand";
import { login, register } from "./services/auth.service";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),

  login: async (email: string, password: string) => {
    const response = await login(email, password);
    // localStorage.setItem("token", );
    set({ isAuthenticated: true });
    return response;
  },
  register: async (RegisterData) => {
    const response = await register(RegisterData);
    return response;
  },
}));
