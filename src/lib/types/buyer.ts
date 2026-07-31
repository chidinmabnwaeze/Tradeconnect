import type { Role } from "./auth";

export interface Buyer {
  id: number;
  name: string;
  email: string;
  role: Role;
  orders_count: number;
  created_at: string;
  updated_at: string;
}
