import type { Role } from "./auth";

// Canonical v1 status, kept backward-compatible by the backend.
export type DisputeStatus = "open" | "resolved" | "closed";
// Richer UI status — "under_review" maps to canonical status "open".
export type DisputeWorkflowStatus = "under_review" | "resolved" | "closed";
// Accepted by the list-query `status` filter (under_review is an alias for open).
export type DisputeListStatusFilter = DisputeStatus | "under_review";
export type AdminDisputeStatusUpdate = Extract<DisputeStatus, "resolved" | "closed">;

export interface DisputeSender {
  id: number;
  name: string;
  role: Role;
}

export interface DisputeAttachment {
  id: number;
  original_name: string;
  mime_type: string;
  size: number;
  created_at: string;
}

export interface DisputeMessage {
  id: number;
  dispute_id: number;
  message: string;
  sender: DisputeSender;
  attachments?: DisputeAttachment[];
  created_at: string;
  updated_at: string;
}

export interface DisputeBuyer {
  id: number;
  name: string;
  email: string;
}

export interface DisputeFarmer {
  id: number;
  name: string;
  farmer_code: string;
}

export interface DisputeOrderItem {
  id: number;
  produce_name: string;
  quantity: number;
  unit: string;
  line_total: string;
}

export interface DisputeOrderSummary {
  id: number;
  order_number: string;
  total: string;
  status: string;
}

export interface Dispute {
  id: number;
  order_id: number;
  order_item_id: number | null;
  user_id: number;
  subject: string;
  status: DisputeStatus;
  workflow_status: DisputeWorkflowStatus;
  unread_count: number;
  is_unread: boolean;
  buyer: DisputeBuyer;
  affected_farmer?: DisputeFarmer | null;
  affected_item?: DisputeOrderItem | null;
  order: DisputeOrderSummary;
  // Full thread — present on "get one" responses; list responses omit this
  // in favor of a compact last-message projection.
  messages?: DisputeMessage[];
  last_message?: Pick<DisputeMessage, "message" | "created_at"> | null;
  under_review_at: string | null;
  resolved_at: string | null;
  closed_at: string | null;
  resolution_note: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateDisputePayload {
  order_id: number;
  order_item_id?: number;
  subject: string;
  message: string;
  attachments?: File[];
}

export interface DisputeListParams {
  search?: string;
  status?: DisputeListStatusFilter;
  unread?: boolean;
  sort?: "created_at" | "updated_at" | "status" | "subject";
  order?: "asc" | "desc";
  page?: number;
  per_page?: number;
}
