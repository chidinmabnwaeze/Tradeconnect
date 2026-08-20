import api from "../api";
import type {
  Farmer,
  FarmerCreatePayload,
  FarmerListParams,
  FarmerStatus,
  FarmerUpdatePayload,
  FarmerVerificationStatus,
} from "../types/farmer";
import type { Paginated } from "../types/pagination";
import type { Activity, ActivityListParams } from "../types/activity";
import type { FarmerPayoutsResponse } from "../types/payout";

function toFarmerFormData(
  payload: FarmerCreatePayload | FarmerUpdatePayload,
): FormData {
  const formData = new FormData();
  const append = (key: string, value: unknown) => {
    if (value === undefined || value === null) return;
    formData.append(key, String(value));
  };

  append("name", payload.name);
  append("email", payload.email);
  append("phone_number", payload.phone_number);
  append("state", payload.state);
  append("lga", payload.lga);
  append("address", payload.address);
  append("gender", payload.gender);
  append("date_of_birth", payload.date_of_birth);
  append("nin", payload.nin);
  append("status", payload.status);
  append("farm_name", payload.farm_name);
  append("farm_size_hectares", payload.farm_size_hectares);
  append("farming_method", payload.farming_method);
  append("years_experience", payload.years_experience);
  append("farm_address", payload.farm_address);
  if (payload.photo) formData.append("photo", payload.photo);
  payload.primary_produce_ids?.forEach((id) =>
    formData.append("primary_produce_ids[]", String(id)),
  );

  return formData;
}

function needsFormData(payload: FarmerCreatePayload | FarmerUpdatePayload): boolean {
  return Boolean(payload.photo) || Boolean(payload.primary_produce_ids?.length);
}

export const getFarmers = async (
  params?: FarmerListParams,
): Promise<Paginated<Farmer>> => {
  const response = await api.get("/admin/farmers", { params });
  return response.data;
};

export const getFarmer = async (id: number): Promise<Farmer> => {
  const response = await api.get(`/admin/farmers/${id}`);
  return response.data.data;
};

export const createFarmer = async (
  payload: FarmerCreatePayload,
): Promise<Farmer> => {
  const body = needsFormData(payload) ? toFarmerFormData(payload) : payload;
  const response = await api.post("/admin/farmers", body);
  return response.data.data;
};

export const updateFarmer = async (
  id: number,
  payload: FarmerUpdatePayload,
): Promise<Farmer> => {
  const body = needsFormData(payload) ? toFarmerFormData(payload) : payload;
  const response = await api.put(`/admin/farmers/${id}`, body);
  return response.data.data;
};

export const deleteFarmer = async (
  id: number,
): Promise<{ message: string }> => {
  const response = await api.delete(`/admin/farmers/${id}`);
  return response.data;
};

export const setFarmerStatus = async (
  id: number,
  status: FarmerStatus,
): Promise<Farmer> => {
  const response = await api.patch(`/admin/farmers/${id}/status`, { status });
  return response.data.data;
};

export const setFarmerVerification = async (
  id: number,
  verification_status: FarmerVerificationStatus,
): Promise<Farmer> => {
  const response = await api.patch(`/admin/farmers/${id}/verification`, {
    verification_status,
  });
  return response.data.data;
};

export const getFarmerActivities = async (
  id: number,
  params?: ActivityListParams,
): Promise<Activity[]> => {
  const response = await api.get(`/admin/farmers/${id}/activities`, { params });
  return response.data.data;
};

export const getFarmerPayouts = async (
  id: number,
  params?: { per_page?: number; page?: number },
): Promise<FarmerPayoutsResponse> => {
  const response = await api.get(`/admin/farmers/${id}/payouts`, { params });
  return response.data;
};
