import api from "../api";
import type {
  AuthResponse,
  AuthUser,
  ChangePasswordPayload,
  RegisterData,
  UpdateProfilePayload,
} from "../types/auth";

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post("/login", {email, password});
    return response.data;
}

export const register = async (registerData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post("/register", registerData);
    return response.data;
};

export const logout = async (): Promise<{ message: string }> => {
    const response = await api.post("/logout");
    return response.data;
}

export const getCurrentUser = async (): Promise<AuthUser> => {
    const response = await api.get("/me");
    return response.data.data;
};

export const updateProfile = async (
  payload: UpdateProfilePayload,
): Promise<AuthUser> => {
  if (payload.avatar) {
    const formData = new FormData();
    if (payload.name !== undefined) formData.append("name", payload.name);
    if (payload.email !== undefined) formData.append("email", payload.email);
    if (payload.phone_number !== undefined && payload.phone_number !== null)
      formData.append("phone_number", payload.phone_number);
    if (payload.state !== undefined && payload.state !== null)
      formData.append("state", payload.state);
    if (payload.lga !== undefined && payload.lga !== null)
      formData.append("lga", payload.lga);
    if (payload.address !== undefined && payload.address !== null)
      formData.append("address", payload.address);
    formData.append("avatar", payload.avatar);
    const response = await api.patch("/me", formData);
    return response.data.data;
  }

  const { avatar: _avatar, ...jsonPayload } = payload;
  const response = await api.patch("/me", jsonPayload);
  return response.data.data;
};

export const removeAvatar = async (): Promise<AuthUser> => {
  const response = await api.delete("/me/avatar");
  return response.data.data;
};

export const changePassword = async (
  payload: ChangePasswordPayload,
): Promise<{ message: string }> => {
  const response = await api.patch("/me/password", payload);
  return response.data;
};

export const sendEmailVerification = async (): Promise<{
  message: string;
  expires_in?: number;
}> => {
  const response = await api.post("/email/verification/send");
  return response.data;
};

export const resendEmailVerification = async (): Promise<{
  message: string;
  expires_in?: number;
}> => {
  const response = await api.post("/email/verification/resend");
  return response.data;
};

export const verifyEmailCode = async (code: string): Promise<{ message: string }> => {
  const response = await api.post("/email/verification/verify", { code });
  return response.data;
};

export const forgotPassword = async (
  email: string,
): Promise<{ message: string; expires_in?: number }> => {
  const response = await api.post("/password/forgot", { email });
  return response.data;
};

export const verifyPasswordResetCode = async (
  email: string,
  code: string,
): Promise<{ message: string; reset_token: string; expires_in: number }> => {
  const response = await api.post("/password/verify-code", { email, code });
  return response.data;
};

export const resetPassword = async (
  email: string,
  resetToken: string,
  password: string,
  passwordConfirmation: string,
): Promise<{ message: string }> => {
  const response = await api.post("/password/reset", {
    email,
    reset_token: resetToken,
    password,
    password_confirmation: passwordConfirmation,
  });
  return response.data;
};
