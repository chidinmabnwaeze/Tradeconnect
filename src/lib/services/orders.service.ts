import api from "../api";
import type {
  AdminOrderStatusUpdate,
  CreateOrderPayload,
  Order,
} from "../types/order";

// Buyer (user)
export const getMyOrders = async (): Promise<Order[]> => {
  const response = await api.get("/orders");
  return response.data.data;
};

export const getMyOrder = async (id: number): Promise<Order> => {
  const response = await api.get(`/orders/${id}`);
  return response.data.data;
};

export const createOrder = async (payload: CreateOrderPayload): Promise<Order> => {
  const response = await api.post("/orders", payload);
  return response.data.data;
};

export const cancelOrder = async (id: number): Promise<Order> => {
  const response = await api.patch(`/orders/${id}/cancel`);
  return response.data.data;
};

// Admin
export const getAllOrders = async (): Promise<Order[]> => {
  const response = await api.get("/admin/orders");
  return response.data.data;
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
