import api from "../api";
import type { Farmer, FarmerPayload } from "../types/farmer";

export const getFarmers = async (): Promise<Farmer[]> => {
  const response = await api.get("/admin/farmers");
  return response.data.data;
};

export const getFarmer = async (id: number): Promise<Farmer> => {
  const response = await api.get(`/admin/farmers/${id}`);
  return response.data.data;
};

export const createFarmer = async (payload: FarmerPayload): Promise<Farmer> => {
  const response = await api.post("/admin/farmers", payload);
  return response.data.data;
};

export const updateFarmer = async (
  id: number,
  payload: FarmerPayload,
): Promise<Farmer> => {
  const response = await api.put(`/admin/farmers/${id}`, payload);
  return response.data.data;
};

export const deleteFarmer = async (
  id: number,
): Promise<{ message: string }> => {
  const response = await api.delete(`/admin/farmers/${id}`);
  return response.data;
};
