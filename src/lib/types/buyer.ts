import type { AccountStatus, Role } from "./auth";

export interface Buyer {
  id: number;
  account_code: string;
  name: string;
  email: string;
  phone_number?: string | null;
  state?: string | null;
  lga?: string | null;
  address?: string | null;
  avatar_path?: string | null;
  role: Role;
  status: AccountStatus;
  orders_count: number;
  created_at: string;
  updated_at: string;
}

export type BuyerStatusUpdate = AccountStatus;

export interface BuyerListParams {
  search?: string;
  state?: string;
  lga?: string;
  status?: AccountStatus;
  sort?: "name" | "account_code" | "created_at";
  order?: "asc" | "desc";
  page?: number;
  per_page?: number;
}
