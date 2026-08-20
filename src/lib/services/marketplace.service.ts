import api from "../api";
import type { MarketplaceSummary } from "../types/marketplace";

export const getMarketplaceSummary = async (): Promise<MarketplaceSummary> => {
  const response = await api.get("/marketplace/summary");
  return response.data.data;
};
