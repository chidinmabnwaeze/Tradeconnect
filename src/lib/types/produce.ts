export interface ProduceCategory {
  id: number;
  name: string;
}

export interface Produce {
  id: number;
  category_id: number;
  name: string;
  // Legacy base64 field — null for filesystem-backed rows. Prefer image_url.
  image: string | null;
  image_path: string | null;
  image_mime: string | null;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface ProduceSummary {
  id: number;
  name: string;
  image_url: string;
  category: ProduceCategory;
}

export interface ProducePayload {
  category_id: number;
  name: string;
  image?: File;
}
