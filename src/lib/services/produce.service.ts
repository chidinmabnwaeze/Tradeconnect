import api from "../api";
import type { Produce, ProducePayload } from "../types/produce";

function toProduceFormData({ category_id, name, image }: ProducePayload): FormData {
  const formData = new FormData();
  formData.append("category_id", String(category_id));
  formData.append("name", name);
  if (image) {
    formData.append("image", image);
  }
  return formData;
}

export const getProduce = async (): Promise<Produce[]> => {
  const response = await api.get("/admin/produce");
  return response.data.data;
};

export const getProduceById = async (id: number): Promise<Produce> => {
  const response = await api.get(`/admin/produce/${id}`);
  return response.data.data;
};

export const createProduce = async (payload: ProducePayload): Promise<Produce> => {
  const response = await api.post("/admin/produce", toProduceFormData(payload));
  return response.data.data;
};

export const updateProduce = async (
  id: number,
  payload: ProducePayload,
): Promise<Produce> => {
  const response = await api.put(`/admin/produce/${id}`, toProduceFormData(payload));
  return response.data.data;
};

export const deleteProduce = async (id: number): Promise<{ message: string }> => {
  const response = await api.delete(`/admin/produce/${id}`);
  return response.data;
};
