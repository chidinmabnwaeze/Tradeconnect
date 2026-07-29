import api from "../api";
import type { Category } from "../types/category";

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get("/admin/categories");
  return response.data.data;
};

export const getCategory = async (id: number): Promise<Category> => {
  const response = await api.get(`/admin/categories/${id}`);
  return response.data.data;
};

export const createCategory = async (name: string): Promise<Category> => {
  const response = await api.post("/admin/categories", { name });
  return response.data.data;
};

export const updateCategory = async (
  id: number,
  name: string,
): Promise<Category> => {
  const response = await api.put(`/admin/categories/${id}`, { name });
  return response.data.data;
};

export const deleteCategory = async (id: number): Promise<{ message: string }> => {
  const response = await api.delete(`/admin/categories/${id}`);
  return response.data;
};
