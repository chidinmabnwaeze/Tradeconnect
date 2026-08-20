import type { Produce } from "./produce";

export interface CategoryProduceSummary {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  // Full produce records on admin routes; lightweight {id, name} on the
  // public /categories route.
  produce?: (Produce | CategoryProduceSummary)[];
  created_at: string;
  updated_at: string;
}
