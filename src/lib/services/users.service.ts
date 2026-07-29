import api from "../api";
import type { AuthUser } from "../types/auth";

export const getUsers = async (): Promise<AuthUser[]> => {
  const response = await api.get("/admin/users");
  return response.data.data;
};

export const getUser = async (id: number): Promise<AuthUser> => {
  const response = await api.get(`/admin/users/${id}`);
  return response.data.data;
};
