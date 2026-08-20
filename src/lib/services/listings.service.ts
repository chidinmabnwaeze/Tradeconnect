import api from "../api";
import type {
  Listing,
  ListingImage,
  ListingPayload,
  ListingQueryParams,
} from "../types/listing";
import type { Paginated } from "../types/pagination";

// Admin
export const getAllListings = async (
  params?: ListingQueryParams,
): Promise<Paginated<Listing>> => {
  const response = await api.get("/admin/listings", { params });
  return response.data;
};

export const getFarmerListings = async (
  farmerId: number,
  params?: ListingQueryParams,
): Promise<Paginated<Listing>> => {
  const response = await api.get(`/admin/farmers/${farmerId}/listings`, { params });
  return response.data;
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
  payload: Partial<ListingPayload>,
): Promise<Listing> => {
  const response = await api.patch(`/admin/listings/${id}`, payload);
  return response.data.data;
};

export const deleteListing = async (id: number): Promise<{ message: string }> => {
  const response = await api.delete(`/admin/listings/${id}`);
  return response.data;
};

export const uploadListingImages = async (
  listingId: number,
  images: File[],
): Promise<ListingImage[]> => {
  const formData = new FormData();
  images.forEach((file) => formData.append("images[]", file));
  const response = await api.post(`/admin/listings/${listingId}/images`, formData);
  return response.data.data;
};

export const reorderListingImages = async (
  listingId: number,
  imageIds: number[],
): Promise<ListingImage[]> => {
  const response = await api.patch(`/admin/listings/${listingId}/images/reorder`, {
    image_ids: imageIds,
  });
  return response.data.data;
};

export const deleteListingImage = async (
  listingId: number,
  imageId: number,
): Promise<{ message: string }> => {
  const response = await api.delete(
    `/admin/listings/${listingId}/images/${imageId}`,
  );
  return response.data;
};

// Public — marketplace-visible listings only, no auth required
export const getActiveListings = async (
  params?: ListingQueryParams,
): Promise<Paginated<Listing>> => {
  const response = await api.get("/listings", { params });
  return response.data;
};

export const getActiveListing = async (id: number): Promise<Listing> => {
  const response = await api.get(`/listings/${id}`);
  return response.data.data;
};
