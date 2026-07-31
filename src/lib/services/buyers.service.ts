import api from "../api";
import type { Buyer } from "../types/buyer";

export const getBuyers = async (): Promise<Buyer[]> => {
  const response = await api.get("/admin/buyers");
  return response.data.data;
};

export const getBuyer = async (id: number): Promise<Buyer> => {
  const response = await api.get(`/admin/buyers/${id}`);
  return response.data.data;
};
