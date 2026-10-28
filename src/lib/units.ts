// Units an admin can pick for a listing. Anything else typed via "Other" is
// stored as-is in listing.unit (API allows any string up to 50 chars).
export const UNIT_OPTIONS = [
  { value: "kg", label: "Kilogram (kg)", plural: "kg" },
  { value: "bag", label: "Bag", plural: "bags" },
  { value: "basket", label: "Basket", plural: "baskets" },
  { value: "crate", label: "Crate", plural: "crates" },
  { value: "tuber", label: "Tuber", plural: "tubers" },
  { value: "bunch", label: "Bunch", plural: "bunches" },
  { value: "piece", label: "Piece", plural: "pieces" },
  { value: "paint bucket", label: "Paint bucket", plural: "paint buckets" },
  { value: "litre", label: "Litre", plural: "litres" },
  { value: "tonne", label: "Tonne", plural: "tonnes" },
];

export const DEFAULT_UNIT = "unit";

export function isPresetUnit(unit: string) {
  return UNIT_OPTIONS.some((option) => option.value === unit);
}

// "bag" -> "bags" when qty isn't 1; custom units are left untouched.
export function unitLabel(unit: string | null | undefined, qty = 1) {
  const name = unit?.trim() || DEFAULT_UNIT;
  if (qty === 1) return name;
  if (name === DEFAULT_UNIT) return "units";
  return UNIT_OPTIONS.find((option) => option.value === name)?.plural ?? name;
}

// "10 bags", "1 basket", "5 kg"
export function formatQty(qty: number, unit: string | null | undefined) {
  return `${qty} ${unitLabel(unit, qty)}`;
}
