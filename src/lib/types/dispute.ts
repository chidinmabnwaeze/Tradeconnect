import type { Role } from "./auth";

export type DisputeStatus = "open" | "resolved" | "closed";
export type AdminDisputeStatusUpdate = Extract<DisputeStatus, "resolved" | "closed">;

export interface DisputeSender {
  id: number;
  name: string;
  role: Role;
}

export interface DisputeMessage {
  id: number;
  dispute_id: number;
  body: string;
  sender: DisputeSender;
  created_at: string;
  updated_at: string;
}

export interface DisputeBuyer {
  id: number;
  name: string;
  email: string;
}

export interface DisputeOrderSummary {
  id: number;
  quantity: number;
  total: string;
  status: string;
  produce: {
    id: number;
    name: string;
    image_url: string;
  };
}

export interface Dispute {
  id: number;
  order_id: number;
  user_id: number;
  subject: string;
  status: DisputeStatus;
  buyer: DisputeBuyer;
  order: DisputeOrderSummary;
  // Only present on "get one" responses, not on list responses
  messages?: DisputeMessage[];
  messages_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateDisputePayload {
  order_id: number;
  subject: string;
  message: string;
}
