import type { Produce } from "./produce";

export interface Category {
  id: number;
  name: string;
  produce?: Produce[];
  created_at: string;
  updated_at: string;
}
