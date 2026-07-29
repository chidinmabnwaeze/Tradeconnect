import type { ProduceSummary } from "./produce";

export type OrderStatus = "new" | "in_transit" | "cancelled" | "delivered";
export type AdminOrderStatusUpdate = Extract<
  OrderStatus,
  "in_transit" | "cancelled" | "delivered"
>;

export interface Order {
  id: number;
  user_id: number;
  listing_id: number;
  quantity: number;
  total: string;
  status: OrderStatus;
  produce: ProduceSummary;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderPayload {
  listing_id: number;
  quantity: number;
}
