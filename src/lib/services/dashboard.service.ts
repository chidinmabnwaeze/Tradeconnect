import api from "../api";
import type {
  DashboardMetricParams,
  DashboardPayouts,
  DashboardRevenue,
  DashboardStats,
} from "../types/dashboard";
import type { Activity, ActivityListParams } from "../types/activity";
import type {
  MarkAllNotificationsReadResult,
  Notification,
  NotificationListParams,
  NotificationsResponse,
} from "../types/notification";

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get("/admin/dashboard");
  return response.data.data;
};

export const getDashboardRevenue = async (
  params?: DashboardMetricParams,
): Promise<DashboardRevenue> => {
  const response = await api.get("/admin/dashboard/revenue", { params });
  return response.data.data;
};

export const getDashboardPayouts = async (
  params?: DashboardMetricParams,
): Promise<DashboardPayouts> => {
  const response = await api.get("/admin/dashboard/payouts", { params });
  return response.data.data;
};

export const getRecentActivities = async (
  params?: ActivityListParams,
): Promise<Activity[]> => {
  const response = await api.get("/admin/activities", { params });
  return response.data.data;
};

export const getNotifications = async (
  params?: NotificationListParams,
): Promise<NotificationsResponse> => {
  const response = await api.get("/admin/notifications", { params });
  return response.data;
};

export const markNotificationRead = async (id: string): Promise<Notification> => {
  const response = await api.patch(`/admin/notifications/${id}/read`);
  return response.data.data;
};

export const markAllNotificationsRead =
  async (): Promise<MarkAllNotificationsReadResult> => {
    const response = await api.patch("/admin/notifications/read-all");
    return response.data.data;
  };
