// The order-action-queue item shape isn't given a literal example in the API
// doc (only "includes only non-terminal new and in_transit orders"); this is
// a best-effort shape inferred from the Order resource — verify against a
// real response before relying on fields beyond id/order_number/status.
export interface OrderActionQueueItem {
  id: number;
  order_number: string;
  status: string;
  total: string;
  buyer_name?: string;
  placed_at: string;
}

export interface DashboardComparison {
  basis: string;
  current_period: Record<string, unknown>;
  previous_period: Record<string, unknown>;
}

export interface DashboardStats {
  total_orders: number;
  orders_change_percent: number;
  orders_today: number;
  total_listings: number;
  listings_change_percent: number;
  pending_listings: number;
  active_farmers: number;
  farmers_change_percent: number;
  pending_farmer_verifications: number;
  active_buyers: number;
  buyers_change_percent: number;
  // Legacy meaning retained — all buyer/user-role accounts, not just active ones.
  active_users: number;
  new_buyers_this_week: number;
  comparison: DashboardComparison;
  order_action_queue: OrderActionQueueItem[];
  order_action_queue_count: number;
}

export type DashboardPeriod = "week" | "month" | "year";

// The `series` shape isn't documented with a literal example (shown as `[]`
// in both revenue and payout responses) — treat entries as unknown until
// confirmed against a real response.
export interface DashboardRevenue {
  metric: "gross_paid_order_item_revenue";
  period: DashboardPeriod;
  farmer_id: number | null;
  range: {
    start: string;
    end: string;
    previous_start: string;
    previous_end: string;
  };
  summary: {
    revenue: string;
    previous_period_revenue: string;
    change_percent: number;
    paid_orders: number;
    paid_order_items: number;
    unallocated_paid_revenue: string;
    unallocated_paid_order_items: number;
  };
  series: unknown[];
}

export interface DashboardPayouts {
  metric: "farmer_payouts";
  period: DashboardPeriod;
  farmer_id: number | null;
  range: Record<string, unknown>;
  summary: {
    paid_out: string;
    previous_period_paid_out: string;
    change_percent: number;
    payouts_count: number;
    active_farmers: number;
    average_per_bucket: string;
    peak: Record<string, unknown>;
  };
  series: unknown[];
}

export interface DashboardMetricParams {
  period?: DashboardPeriod;
  farmer_id?: number;
}
