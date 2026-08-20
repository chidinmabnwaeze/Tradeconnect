import type { PaginationLinks, PaginationMeta } from "./pagination";

export type NotificationType =
  | "order"
  | "payment"
  | "dispute"
  | "farmer"
  | "listing"
  | "buyer"
  | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  action_url: string | null;
  entity: { type: string; id: number } | null;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
}

export interface NotificationListParams {
  status?: "all" | "unread" | "read";
  type?: NotificationType;
  page?: number;
  per_page?: number;
}

export interface NotificationsResponse {
  data: Notification[];
  links: PaginationLinks;
  meta: PaginationMeta & { unread_count: number };
}

export interface MarkAllNotificationsReadResult {
  marked_read_count: number;
  unread_count: number;
}
