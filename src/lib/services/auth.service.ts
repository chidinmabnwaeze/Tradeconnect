import api from "../api";
import type { AuthResponse, AuthUser, RegisterData } from "../types/auth";

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post("/login", {email, password});
    return response.data;
}

export const register = async (registerData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post("/register", registerData);
    return response.data;
};

export const getCurrentUser = async (): Promise<AuthUser> => {
    const response = await api.get("/me");
    return response.data.data;
};

export const verifyEmail = async (email: string) => {
    const response = await api.post("/verify-email", { email });
    return response.data;
}

export const verifyOtp = async (email: string, otp: string) => {
    const response = await api.post("/verify-otp", { email, otp });
    return response.data;
}

export const logout = async () => {
    const response = await api.post("/logout");
    return response.data;
}