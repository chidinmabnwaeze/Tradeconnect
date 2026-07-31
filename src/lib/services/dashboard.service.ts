import api from "../api";
import type { DashboardStats } from "../types/dashboard";

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get("/admin/dashboard");
  return response.data.data;
};
