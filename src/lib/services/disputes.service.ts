import api from "../api";
import type {
  AdminDisputeStatusUpdate,
  CreateDisputePayload,
  Dispute,
  DisputeListParams,
  DisputeMessage,
} from "../types/dispute";
import type { Paginated } from "../types/pagination";

function toCreateDisputeFormData(payload: CreateDisputePayload): FormData {
  const formData = new FormData();
  formData.append("order_id", String(payload.order_id));
  if (payload.order_item_id !== undefined) {
    formData.append("order_item_id", String(payload.order_item_id));
  }
  formData.append("subject", payload.subject);
  formData.append("message", payload.message);
  payload.attachments?.forEach((file) => formData.append("attachments[]", file));
  return formData;
}

function toMessageFormData(message: string, attachments?: File[]): FormData {
  const formData = new FormData();
  formData.append("message", message);
  attachments?.forEach((file) => formData.append("attachments[]", file));
  return formData;
}

// Buyer (user)
export const getMyDisputes = async (
  params?: DisputeListParams,
): Promise<Paginated<Dispute>> => {
  const response = await api.get("/disputes", { params });
  return response.data;
};

export const getMyDispute = async (id: number): Promise<Dispute> => {
  const response = await api.get(`/disputes/${id}`);
  return response.data.data;
};

export const createDispute = async (
  payload: CreateDisputePayload,
): Promise<Dispute> => {
  const response = await api.post("/disputes", toCreateDisputeFormData(payload));
  return response.data.data;
};

export const sendDisputeMessage = async (
  disputeId: number,
  message: string,
  attachments?: File[],
): Promise<DisputeMessage> => {
  const body = attachments?.length
    ? toMessageFormData(message, attachments)
    : { message };
  const response = await api.post(`/disputes/${disputeId}/messages`, body);
  return response.data.data;
};

export const markMyDisputeRead = async (id: number): Promise<void> => {
  await api.patch(`/disputes/${id}/read`);
};

export const downloadMyDisputeAttachment = async (
  disputeId: number,
  attachmentId: number,
): Promise<Blob> => {
  const response = await api.get(
    `/disputes/${disputeId}/attachments/${attachmentId}`,
    { responseType: "blob" },
  );
  return response.data;
};

// Admin
export const getAllDisputes = async (
  params?: DisputeListParams,
): Promise<Paginated<Dispute>> => {
  const response = await api.get("/admin/disputes", { params });
  return response.data;
};

export const getDispute = async (id: number): Promise<Dispute> => {
  const response = await api.get(`/admin/disputes/${id}`);
  return response.data.data;
};

export const replyToDispute = async (
  disputeId: number,
  message: string,
  attachments?: File[],
): Promise<DisputeMessage> => {
  const body = attachments?.length
    ? toMessageFormData(message, attachments)
    : { message };
  const response = await api.post(`/admin/disputes/${disputeId}/messages`, body);
  return response.data.data;
};

export const updateDisputeStatus = async (
  id: number,
  status: AdminDisputeStatusUpdate,
  note?: string,
): Promise<Dispute> => {
  const response = await api.patch(`/admin/disputes/${id}`, { status, note });
  return response.data.data;
};

export const markAdminDisputeRead = async (id: number): Promise<void> => {
  await api.patch(`/admin/disputes/${id}/read`);
};

export const downloadAdminDisputeAttachment = async (
  disputeId: number,
  attachmentId: number,
): Promise<Blob> => {
  const response = await api.get(
    `/admin/disputes/${disputeId}/attachments/${attachmentId}`,
    { responseType: "blob" },
  );
  return response.data;
};
