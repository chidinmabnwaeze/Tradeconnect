import type { FarmerSummary } from "./farmer";
import type { ProduceSummary } from "./produce";

export type ListingStatus = "active" | "inactive";

export interface Listing {
  id: number;
  farmer_id: number;
  produce_id: number;
  price: string;
  stock: number;
  status: ListingStatus;
  produce: ProduceSummary;
  farmer: FarmerSummary;
  created_at: string;
  updated_at: string;
}

export interface ListingPayload {
  produce_id: number;
  price: number;
  stock: number;
  status: ListingStatus;
}
