import api from "../api";
import type {
  AdminOrderStatusUpdate,
  CreateLegacyOrderPayload,
  CreateOrderPayload,
  Order,
  OrderListParams,
  PaymentInitialization,
  PaymentVerification,
} from "../types/order";
import type { Paginated } from "../types/pagination";
import type { FarmerPayout, ReleasePayoutPayload } from "../types/payout";

// Buyer (user)
export const getMyOrders = async (
  params?: OrderListParams,
): Promise<Paginated<Order>> => {
  const response = await api.get("/orders", { params });
  return response.data;
};

export const getMyOrder = async (id: number): Promise<Order> => {
  const response = await api.get(`/orders/${id}`);
  return response.data.data;
};

export const createOrder = async (payload: CreateOrderPayload): Promise<Order> => {
  const response = await api.post("/orders", payload);
  return response.data.data;
};

// Legacy v1 single-item compatibility path — do not mix with createOrder's items[].
export const createLegacyOrder = async (
  payload: CreateLegacyOrderPayload,
): Promise<Order> => {
  const response = await api.post("/orders", payload);
  return response.data.data;
};

export const cancelOrder = async (id: number): Promise<Order> => {
  const response = await api.patch(`/orders/${id}/cancel`);
  return response.data.data;
};

export const initializeOrderPayment = async (
  id: number,
): Promise<PaymentInitialization> => {
  const response = await api.post(`/orders/${id}/payment/initialize`);
  return response.data.data;
};

export const verifyOrderPayment = async (
  id: number,
): Promise<PaymentVerification> => {
  const response = await api.post(`/orders/${id}/payment/verify`);
  return response.data.data;
};

// Admin
export const getAllOrders = async (
  params?: OrderListParams,
): Promise<Paginated<Order>> => {
  const response = await api.get("/admin/orders", { params });
  return response.data;
};

export const getFarmerOrders = async (
  farmerId: number,
  params?: OrderListParams,
): Promise<Paginated<Order>> => {
  const response = await api.get(`/admin/farmers/${farmerId}/orders`, { params });
  return response.data;
};

export const getOrder = async (id: number): Promise<Order> => {
  const response = await api.get(`/admin/orders/${id}`);
  return response.data.data;
};

export const updateOrderStatus = async (
  id: number,
  status: AdminOrderStatusUpdate,
): Promise<Order> => {
  const response = await api.patch(`/admin/orders/${id}`, { status });
  return response.data.data;
};

export const releaseFarmerPayout = async (
  orderId: number,
  farmerId: number,
  payload?: ReleasePayoutPayload,
): Promise<FarmerPayout> => {
  const response = await api.post(
    `/admin/orders/${orderId}/farmers/${farmerId}/payout`,
    payload,
  );
  return response.data.data;
};
