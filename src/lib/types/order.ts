import type { ProduceSummary } from "./produce";

export type OrderStatus = "new" | "in_transit" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type DeliveryMethod = "standard" | "pickup" | "express";
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

export interface OrderDelivery {
  method: DeliveryMethod;
  name: string;
  phone: string;
  state: string;
  lga: string;
  address: string;
  notes?: string | null;
}

export interface OrderItem {
  id: number;
  listing_id: number;
  farmer_id: number;
  produce_id: number;
  produce_name: string;
  category_name: string;
  unit: string;
  quantity: number;
  unit_price: string;
  discount_amount: string;
  line_total: string;
}

export interface OrderTimelineEvent {
  id: number;
  from_status: OrderStatus | null;
  to_status: OrderStatus;
  changed_by: { id: number; name: string } | null;
  note: string | null;
  occurred_at: string;
}

export interface Order {
  id: number;
  order_number: string;
  user_id: number;
  subtotal: string;
  delivery_fee: string;
  total: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  delivery: OrderDelivery;
  items: OrderItem[];
  // Legacy single-item compatibility fields — present for older consumers.
  listing_id?: number;
  quantity?: number;
  produce?: ProduceSummary;
  // Present on admin order responses only.
  buyer_name?: string;
  buyer?: OrderBuyer;
  farmer?: OrderFarmer;
  // Loaded on the order-detail route only.
  timeline?: OrderTimelineEvent[];
  placed_at: string;
  created_at: string;
  updated_at: string;
  confirmed_at: string;
  processing_at: string;
  out_for_delivery_at: string;
  deliver_by: string | null;
  delivered_at: string;
  cancelled_at: string;
}

export interface CreateOrderItemPayload {
  listing_id: number;
  quantity: number;
}

// Modern multi-item contract.
export interface CreateOrderPayload {
  items: CreateOrderItemPayload[];
  // listing_id: number;
  // quantity: number;
  delivery_method: DeliveryMethod;
  delivery_name: string;
  delivery_phone: string;
  delivery_state: string;
  delivery_lga: string;
  delivery_address: string;
  delivery_notes?: string | null;
}

// Legacy v1 single-item compatibility payload — do not mix with items[].
export interface CreateLegacyOrderPayload {
  listing_id: number;
  quantity: number;
}

export interface OrderListParams {
  search?: string;
  status?: OrderStatus;
  payment_status?: PaymentStatus;
  farmer_id?: number;
  sort?: "created_at" | "order_number" | "total" | "status" | "payment_status";
  order?: "asc" | "desc";
  page?: number;
  per_page?: number;
}

export type PaymentProvider = "paystack";

export interface PaymentInitialization {
  order_id: number;
  order_number: string;
  payment_status: PaymentStatus;
  provider: PaymentProvider;
  reference: string;
  authorization_url: string;
  access_code: string;
  // Paystack's lower denomination (kobo).
  amount: string;
  currency: string;
}

export interface PaymentVerification {
  order_id: number;
  order_number: string;
  payment_status: PaymentStatus;
  provider: PaymentProvider;
  reference: string;
  provider_status: string;
  paid_at: string | null;
}
