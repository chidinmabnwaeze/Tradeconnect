import api from "../api";

export const getHealth = async (): Promise<{ status: string; service: string }> => {
  const response = await api.get("/health");
  return response.data;
};
