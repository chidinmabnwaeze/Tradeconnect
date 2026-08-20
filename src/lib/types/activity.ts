export type ActivityType = "order" | "dispute" | "farmer" | "listing" | "buyer";

export interface Activity {
  id: string | number;
  type: ActivityType;
  action: string;
  title: string;
  description?: string | null;
  status?: string | null;
  actor?: { id: number; name: string } | null;
  entity?: { type: string; id: number } | null;
  meta?: Record<string, unknown> | null;
  occurred_at: string;
}

export interface ActivityListParams {
  type?: ActivityType;
  limit?: number;
}
