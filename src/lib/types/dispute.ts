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

// Confirmed against a real API response — the message text field is `body`,
// not `message` (the `message` field only exists on the *request* payload).
export interface DisputeMessage {
  id: number;
  dispute_id: number;
  body: string;
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

// Admin actor summary — matches the shape used for `buyer`/`released_by`
// elsewhere in the API (payout resource, etc.).
export interface DisputeAdminActor {
  id: number;
  account_code: string;
  name: string;
  email: string;
}

export interface DisputeFarmerSummary {
  id: number;
  name: string;
  state: string;
  lga: string;
  phone_number: string;
}

export interface DisputeProduceSummary {
  id: number;
  name: string;
  image_url: string;
  category: { id: number; name: string };
}

export interface DisputeOrderItem {
  id: number;
  listing_id: number;
  farmer_id: number;
  produce_id: number;
  produce_name: string;
  category_name: string;
  unit: string | null;
  quantity: number;
  unit_price: string;
  discount_amount: string;
  line_total: string;
  produce: DisputeProduceSummary;
  farmer: DisputeFarmerSummary;
  created_at: string;
  updated_at: string;
}

export interface DisputeOrderSummary {
  id: number;
  order_number: string;
  quantity: number;
  total: string;
  status: string;
  payment_status: string;
  items: DisputeOrderItem[];
  // Legacy single-produce compatibility field, same as on the Order resource.
  produce: {
    id: number;
    name: string;
    image_url: string;
  };
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
  messages_count: number;
  buyer: DisputeBuyer;
  affected_farmer?: DisputeFarmerSummary | null;
  affected_item?: DisputeOrderItem | null;
  order: DisputeOrderSummary;
  // Full thread — present on "get one" responses; list responses omit this
  // in favor of the compact `last_message` projection.
  messages?: DisputeMessage[];
  last_message?: DisputeMessage | null;
  under_review_at: string | null;
  resolved_at: string | null;
  resolved_by: DisputeAdminActor | null;
  closed_at: string | null;
  closed_by: DisputeAdminActor | null;
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
