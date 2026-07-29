import api from "../api";
import type { Listing, ListingPayload } from "../types/listing";

// Admin
export const getAllListings = async (): Promise<Listing[]> => {
  const response = await api.get("/admin/listings");
  return response.data.data;
};

export const getFarmerListings = async (farmerId: number): Promise<Listing[]> => {
  const response = await api.get(`/admin/farmers/${farmerId}/listings`);
  return response.data.data;
};

export const createFarmerListing = async (
  farmerId: number,
  payload: ListingPayload,
): Promise<Listing> => {
  const response = await api.post(`/admin/farmers/${farmerId}/listings`, payload);
  return response.data.data;
};

export const getListing = async (id: number): Promise<Listing> => {
  const response = await api.get(`/admin/listings/${id}`);
  return response.data.data;
};

export const updateListing = async (
  id: number,
  payload: ListingPayload,
): Promise<Listing> => {
  const response = await api.put(`/admin/listings/${id}`, payload);
  return response.data.data;
};

export const deleteListing = async (id: number): Promise<{ message: string }> => {
  const response = await api.delete(`/admin/listings/${id}`);
  return response.data;
};

// Buyer (user) — active listings only
export const getActiveListings = async (): Promise<Listing[]> => {
  const response = await api.get("/listings");
  return response.data.data;
};

export const getActiveListing = async (id: number): Promise<Listing> => {
  const response = await api.get(`/listings/${id}`);
  return response.data.data;
};
