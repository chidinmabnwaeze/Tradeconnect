import { ShieldCheck, X } from "lucide-react";
import { useCart } from "./CartContext";
import { formatNaira } from "../lib/format";

export default function OrderSummaryModal({
  open,
  onClose,
  onPay,
}: {
  open: boolean;
  onClose: () => void;
  onPay: () => void;
}) {
  const { items, subtotal, deliveryFee, total } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-64 space-y-4 overflow-y-auto pr-1">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-global-bg text-xl">
                {item.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-400">{item.category}</p>
              </div>
              <p className="text-xs text-slate-500">
                {item.qty}
                {item.unit}
              </p>
              <p className="w-20 text-right text-sm font-semibold text-slate-900">
                {formatNaira(item.qty * item.price)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm">
          <div className="flex items-center justify-between text-slate-500">
            <p>Subtotal</p>
            <p>{formatNaira(subtotal)}</p>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <p>Delivery fee</p>
            <p>{formatNaira(deliveryFee)}</p>
          </div>
          <div className="flex items-center justify-between pt-1 text-base font-bold text-slate-900">
            <p>Total</p>
            <p>{formatNaira(total)}</p>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-2xl bg-emerald-50 p-3 text-xs text-emerald-700">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            You'll pay securely via Paystack. Your order is placed once payment is confirmed.
          </p>
        </div>

        <button
          onClick={onPay}
          className="mt-5 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary/90"
        >
          Pay with Paystack
        </button>
      </div>
    </div>
  );
}
