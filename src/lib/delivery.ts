import { formatNaira } from "./format";
import { unitLabel } from "./units";

// Delivery pricing set by the admin on each listing:
//   delivery_base_fee      charged for the first unit (covers the trip)
//   delivery_fee_per_unit  charged for each additional unit
//   delivery_fee_cap       optional ceiling on the listing's delivery total
//
// fee = min(cap, base + (qty - 1) × per_unit)
//
// Listings without a base fee keep the legacy rule (qty × per_unit), which is
// what the backend charges until it supports the new fields. The backend's
// figures after order creation remain authoritative; this is a preview.
export interface DeliveryPricing {
  delivery_base_fee?: number | string | null;
  delivery_fee_per_unit?: number | string | null;
  delivery_fee_cap?: number | string | null;
}

const toNumber = (value: number | string | null | undefined) =>
  value === null || value === undefined || value === "" ? null : Number(value);

export function calculateDeliveryFee(pricing: DeliveryPricing, qty: number) {
  if (qty <= 0) return 0;
  const base = toNumber(pricing.delivery_base_fee);
  const perUnit = toNumber(pricing.delivery_fee_per_unit) ?? 0;
  const cap = toNumber(pricing.delivery_fee_cap);

  const fee = base === null ? qty * perUnit : base + (qty - 1) * perUnit;
  return cap !== null && cap > 0 ? Math.min(fee, cap) : fee;
}

// e.g. "₦2,000 for the first bag, then ₦200 per extra bag (max ₦5,000)"
export function describeDeliveryPricing(
  pricing: DeliveryPricing,
  unit: string | null | undefined,
) {
  const base = toNumber(pricing.delivery_base_fee);
  const perUnit = toNumber(pricing.delivery_fee_per_unit) ?? 0;
  const cap = toNumber(pricing.delivery_fee_cap);
  const one = unitLabel(unit);

  const text =
    base === null
      ? `${formatNaira(perUnit)} per ${one}`
      : `${formatNaira(base)} for the first ${one}, then ${formatNaira(perUnit)} per extra ${one}`;
  return cap !== null && cap > 0 ? `${text} (max ${formatNaira(cap)})` : text;
}
