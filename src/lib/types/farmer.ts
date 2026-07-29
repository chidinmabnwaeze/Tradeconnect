export type FarmerStatus = "active" | "inactive";

export interface Farmer {
  id: number;
  name: string;
  state: string;
  lga: string;
  status: FarmerStatus;
  phone_number: string;
  created_at: string;
  updated_at: string;
}

export interface FarmerSummary {
  id: number;
  name: string;
  state: string;
  lga: string;
}

export interface FarmerPayload {
  name: string;
  state: string;
  lga: string;
  status: FarmerStatus;
  phone_number: string;
}
