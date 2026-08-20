import type { PaginationLinks, PaginationMeta } from "./pagination";

export interface PayoutReleasedBy {
  id: number;
  account_code: string;
  name: string;
  email: string;
}

export interface FarmerPayout {
  id: number;
  farmer_id: number;
  order_id: number;
  farmer_code: string;
  farmer_name: string;
  order_number: string;
  amount: string;
  reference: string | null;
  notes: string | null;
  paid_at: string;
  released_by: PayoutReleasedBy;
  created_at: string;
}

export interface ReleasePayoutPayload {
  reference?: string;
  notes?: string;
}

export interface FarmerPayoutsSummary {
  farmer_id: number;
  farmer_code: string;
  total_paid_out: string;
  payouts_count: number;
}

export interface FarmerPayoutsResponse {
  data: FarmerPayout[];
  links: PaginationLinks;
  meta: PaginationMeta;
  summary: FarmerPayoutsSummary;
}
