import type { FarmerSummary } from "./farmer";
import type { ProduceSummary } from "./produce";

// Legacy compatibility flag — kept in parallel with publication_status.
export type ListingStatus = "active" | "inactive";
// The field that actually controls marketplace visibility.
export type ListingPublicationStatus = "pending" | "live" | "inactive";
export type ListingLabel = "fresh" | "organic" | "seasonal";
export type ListingAvailability = "available" | "upcoming" | "out_of_stock";

export interface ListingImage {
  id: number;
  url: string;
  original_name: string;
  mime_type: string;
  size: number;
  position: number;
  created_at: string;
}

export interface Listing {
  id: number;
  farmer_id: number;
  produce_id: number;
  price: string;
  original_price?: string | null;
  discount_percent?: string | null;
  discount_amount?: string | null;
  unit?: string | null;
  stock: number;
  delivery_fee_per_unit?: number | null;
  minimum_order_quantity?: number;
  description?: string | null;
  label?: ListingLabel | null;
  grade?: string | null;
  available_from?: string | null;
  is_available?: boolean;
  status: ListingStatus;
  publication_status: ListingPublicationStatus;
  published_at?: string | null;
  primary_image_url?: string | null;
  images?: ListingImage[];
  produce: ProduceSummary;
  farmer: FarmerSummary;
  created_at: string;
  updated_at: string;
}

export interface ListingPayload {
  produce_id: number;
  price: number;
  original_price?: number | null;
  discount_percent?: number | null;
  unit?: string | null;
  stock: number;
  delivery_fee_per_unit?: number | null;
  minimum_order_quantity?: number;
  description?: string | null;
  label?: ListingLabel | null;
  grade?: string | null;
  available_from?: string | null;
  status?: ListingStatus;
  publication_status?: ListingPublicationStatus;
  // Update-only: reassigns the listing to another (active + verified) farmer.
  farmer_id?: number;
}

export interface ListingQueryParams {
  search?: string;
  category_id?: number;
  farmer_id?: number;
  state?: string;
  lga?: string;
  label?: ListingLabel;
  availability?: ListingAvailability;
  min_price?: number;
  max_price?: number;
  sort?: "price" | "stock" | "created_at" | "produce" | "farmer" | "category";
  order?: "asc" | "desc";
  page?: number;
  per_page?: number;
}

export interface ReorderListingImagesPayload {
  image_ids: number[];
}
