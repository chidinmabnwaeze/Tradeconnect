import type { ProduceSummary } from "./produce";

export type OrderStatus = "new" | "in_transit" | "cancelled" | "delivered";
export type AdminOrderStatusUpdate = Extract<
  OrderStatus,
  "in_transit" | "cancelled" | "delivered"
>;

export interface OrderBuyer {
  id: number;
  name: string;
  email: string;
}

export interface OrderFarmer {
  id: number;
  name: string;
  state: string;
  lga: string;
  phone_number: string;
}

export interface Order {
  id: number;
  user_id: number;
  listing_id: number;
  quantity: number;
  total: string;
  status: OrderStatus;
  produce: ProduceSummary;
  // Present on admin order responses only
  buyer_name?: string;
  buyer?: OrderBuyer;
  farmer?: OrderFarmer;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderPayload {
  listing_id: number;
  quantity: number;
}
