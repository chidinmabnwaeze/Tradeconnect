import api from "../api";
import type {
  AdminDisputeStatusUpdate,
  CreateDisputePayload,
  Dispute,
  DisputeMessage,
} from "../types/dispute";

// Buyer (user)
export const getMyDisputes = async (): Promise<Dispute[]> => {
  const response = await api.get("/disputes");
  return response.data.data;
};

export const getMyDispute = async (id: number): Promise<Dispute> => {
  const response = await api.get(`/disputes/${id}`);
  return response.data.data;
};

export const createDispute = async (
  payload: CreateDisputePayload,
): Promise<Dispute> => {
  const response = await api.post("/disputes", payload);
  return response.data.data;
};

export const sendDisputeMessage = async (
  disputeId: number,
  message: string,
): Promise<DisputeMessage> => {
  const response = await api.post(`/disputes/${disputeId}/messages`, { message });
  return response.data.data;
};

// Admin
export const getAllDisputes = async (): Promise<Dispute[]> => {
  const response = await api.get("/admin/disputes");
  return response.data.data;
};

export const getDispute = async (id: number): Promise<Dispute> => {
  const response = await api.get(`/admin/disputes/${id}`);
  return response.data.data;
};

export const replyToDispute = async (
  disputeId: number,
  message: string,
): Promise<DisputeMessage> => {
  const response = await api.post(`/admin/disputes/${disputeId}/messages`, {
    message,
  });
  return response.data.data;
};

export const updateDisputeStatus = async (
  id: number,
  status: AdminDisputeStatusUpdate,
): Promise<Dispute> => {
  const response = await api.patch(`/admin/disputes/${id}`, { status });
  return response.data.data;
};
