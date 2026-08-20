import type { Listing } from "./listing";
import type { Order } from "./order";

export type FarmerStatus = "active" | "inactive";
export type FarmerVerificationStatus = "pending" | "verified" | "rejected";

export interface FarmerPrimaryProduce {
  id: number;
  name: string;
}

export interface FarmerProfileCompleteness {
  percentage: number;
  completed_fields: number;
  total_fields: number;
  missing_fields: string[];
}

export interface FarmProfile {
  name: string | null;
  size_hectares: string | null;
  farming_method: string | null;
  years_experience: number | null;
  address: string | null;
}

export interface FarmerSalesSummary {
  paid_orders_count: number;
  total_earned: string;
  payouts_count: number;
  total_paid_out: string;
}

export interface FarmerSummaryBlock {
  listings: Record<string, unknown>;
  orders: Record<string, unknown>;
  sales: FarmerSalesSummary;
}

export interface Farmer {
  id: number;
  farmer_code: string;
  name: string;
  email?: string | null;
  phone_number: string;
  state: string;
  lga: string;
  address?: string | null;
  gender?: string | null;
  date_of_birth?: string | null;
  // Masked projection only — the raw NIN is never returned by the API.
  nin?: string | null;
  has_nin?: boolean;
  photo_url?: string | null;
  primary_produce?: FarmerPrimaryProduce[];
  status: FarmerStatus;
  verification_status: FarmerVerificationStatus;
  can_publish_listings?: boolean;
  profile_completeness?: FarmerProfileCompleteness;
  farm?: FarmProfile;
  listings_count?: number;
  orders_count?: number;
  completed_orders_count?: number;
  // Legacy meaning retained — gross revenue, not a payout figure.
  total_earned?: string;
  // The correct field for the "paid out" concept.
  total_paid_out?: string;
  summary?: FarmerSummaryBlock;
  listings?: Listing[];
  orders?: Order[];
  recent_listings?: Listing[];
  recent_orders?: Order[];
  verified_at?: string | null;
  suspended_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface FarmerSummary {
  id: number;
  name: string;
  state: string;
  lga: string;
}

interface FarmerBasePayload {
  name: string;
  email?: string | null;
  phone_number: string;
  state: string;
  lga: string;
  address?: string | null;
  gender?: string | null;
  date_of_birth?: string | null;
  nin?: string | null;
  photo?: File | null;
  primary_produce_ids?: number[];
  farm_name?: string | null;
  farm_size_hectares?: number | null;
  farming_method?: string | null;
  years_experience?: number | null;
  farm_address?: string | null;
}

// `status` defaults to "active" on create if omitted.
export interface FarmerCreatePayload extends FarmerBasePayload {
  status?: FarmerStatus;
}

// The full update route requires `status` explicitly.
export interface FarmerUpdatePayload extends FarmerBasePayload {
  status: FarmerStatus;
}

export interface FarmerListParams {
  search?: string;
  state?: string;
  lga?: string;
  status?: FarmerStatus;
  verification_status?: FarmerVerificationStatus;
  sort?: "name" | "farmer_code" | "created_at" | "listings_count";
  order?: "asc" | "desc";
  page?: number;
  per_page?: number;
}
