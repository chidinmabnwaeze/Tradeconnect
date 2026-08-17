import type { Listing } from "./listing";
import type { Order } from "./order";

export type FarmerStatus = "active" | "inactive";

export interface Farmer {
  id: number;
  name: string;
  state: string;
  lga: string;
  status: FarmerStatus;
  phone_number: string;
  listings_count?: number;
  orders_count?: number;
  total_earned?: string;
  listings?: Listing[];
  orders?: Order[];
  created_at: string;
  updated_at: string;
}

export interface FarmerSummary {
  id: number;
  name: string;
  state: string;
  lga: string;
}

export interface FarmerPayload {
  name: string;
  state: string;
  lga: string;
  status: FarmerStatus;
  phone_number: string;
  farm_name?: string;
  farm_size?: number;
  farming_method?: string;
  experience?: string;
  primary_produce?: string;
}
