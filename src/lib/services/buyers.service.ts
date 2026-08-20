import api from "../api";
import type { Buyer, BuyerListParams, BuyerStatusUpdate } from "../types/buyer";
import type { Paginated } from "../types/pagination";

export const getBuyers = async (
  params?: BuyerListParams,
): Promise<Paginated<Buyer>> => {
  const response = await api.get("/admin/buyers", { params });
  return response.data;
};

export const getBuyer = async (id: number): Promise<Buyer> => {
  const response = await api.get(`/admin/buyers/${id}`);
  return response.data.data;
};

export const setBuyerStatus = async (
  id: number,
  status: BuyerStatusUpdate,
): Promise<Buyer> => {
  const response = await api.patch(`/admin/buyers/${id}/status`, { status });
  return response.data.data;
};
