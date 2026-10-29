import { formatNaira } from "./format";
import { unitLabel } from "./units";

// Delivery pricing set by the admin on each listing:
//   delivery_base_fee      charged for the first unit (covers the trip)
//   delivery_fee_per_unit  charged for each additional unit
//   delivery_fee_cap       optional ceiling on the listing's delivery total
//
// fee = base === null ? qty × per_unit : base + (qty - 1) × per_unit
// fee = min(fee, cap) when cap > 0
//
// This mirrors Listing::standardDeliveryTotal() on the backend; keep the two in
// step. It is standard delivery only (pickup and express are free), and the
// backend's figures after order creation remain authoritative.
export interface DeliveryPricing {
  delivery_base_fee?: number | string | null;
  delivery_fee_per_unit?: number | string | null;
  delivery_fee_cap?: number | string | null;
}

const toNumber = (value: number | string | null | undefined) =>
  value === null || value === undefined || value === "" ? null : Number(value);

// null when the listing has no per-unit fee: the backend rejects standard
// delivery for such listings, so there is no price to preview.
export function calculateDeliveryFee(
  pricing: DeliveryPricing,
  qty: number,
): number | null {
  const perUnit = toNumber(pricing.delivery_fee_per_unit);
  if (perUnit === null) return null;
  if (qty <= 0) return 0;
  const base = toNumber(pricing.delivery_base_fee);
  const cap = toNumber(pricing.delivery_fee_cap);

  const fee = base === null ? qty * perUnit : base + (qty - 1) * perUnit;
  const capped = cap !== null && cap > 0 ? Math.min(fee, cap) : fee;
  return Math.round(capped * 100) / 100;
}

// e.g. "₦2,000 for the first bag, then ₦200 per extra bag (max ₦5,000)"
// null when standard delivery isn't configured for the listing.
export function describeDeliveryPricing(
  pricing: DeliveryPricing,
  unit: string | null | undefined,
) {
  const base = toNumber(pricing.delivery_base_fee);
  const perUnit = toNumber(pricing.delivery_fee_per_unit);
  if (perUnit === null) return null;
  const cap = toNumber(pricing.delivery_fee_cap);
  const one = unitLabel(unit);

  const text =
    base === null
      ? `${formatNaira(perUnit)} per ${one}`
      : `${formatNaira(base)} for the first ${one}, then ${formatNaira(perUnit)} per extra ${one}`;
  return cap !== null && cap > 0 ? `${text} (max ${formatNaira(cap)})` : text;
}
