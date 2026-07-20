import { useState } from "react";
import {
  CircleCheck,
  Clock,
  MapPin,
  PackageCheck,
  PackagePlus,
  Truck,
} from "lucide-react";
import BuyerLayout from "../components/BuyerLayout";
import StatusBadge from "../components/StatusBadge";
import { useCart } from "./CartContext";
import { formatNaira } from "../lib/format";

interface OrderItem {
  name: string;
  emoji: string;
  category: string;
  qty: number;
  unit: string;
  price: number;
}

interface Order {
  id: string;
  dateRange: string;
  status: "Delivered" | "Processing" | "Cancelled";
  items: OrderItem[];
  deliveryAddress: string;
  deliveryMethod: string;
}

const orders: Order[] = [
  {
    id: "#ORD-1234",
    dateRange: "16th Jun 2026 - 18th Jun 2026",
    status: "Delivered",
    items: [
      { name: "Yam", emoji: "🍠", category: "Roots & Tubers", qty: 5, unit: "kg", price: 1100 },
      { name: "Sweet Potatoes", emoji: "🍠", category: "Roots & Tubers", qty: 5, unit: "kg", price: 1040 },
      { name: "Lettuce", emoji: "🥬", category: "Vegetables", qty: 5, unit: "kg", price: 2000 },
    ],
    deliveryAddress: "14 Wuse Zone 4, Abuja, FCT",
    deliveryMethod: "Standard Delivery",
  },
  {
    id: "#ORD-1198",
    dateRange: "10th Jun 2026 - 12th Jun 2026",
    status: "Cancelled",
    items: [
      { name: "Rice", emoji: "🌾", category: "Grains & Cereals", qty: 5, unit: "kg", price: 1000 },
      { name: "Maize (Corn)", emoji: "🌽", category: "Grains & Cereals", qty: 3, unit: "kg", price: 1000 },
    ],
    deliveryAddress: "22 Garki Estate, Abuja, FCT",
    deliveryMethod: "Pickup at Depot",
  },
  {
    id: "#ORD-1150",
    dateRange: "2nd Jun 2026 - 4th Jun 2026",
    status: "Processing",
    items: [
      { name: "Cassava", emoji: "🥔", category: "Roots & Tubers", qty: 4, unit: "kg", price: 1000 },
      { name: "Okra", emoji: "🌿", category: "Vegetables", qty: 2, unit: "kg", price: 900 },
    ],
    deliveryAddress: "8 Jabi Close, Abuja, FCT",
    deliveryMethod: "Standard Delivery",
  },
];

const steps = [
  { label: "Order Created", icon: PackagePlus },
  { label: "Order Confirmed", icon: CircleCheck },
  { label: "Processing", icon: Clock },
  { label: "Out for Delivery", icon: Truck },
  { label: "Delivered", icon: PackageCheck },
];

export default function Orders() {
  const [selected, setSelected] = useState(orders[0]);
  const { count } = useCart();

  const orderTotal = selected.items.reduce((sum, item) => sum + item.qty * item.price, 0);

  const activeStep =
    selected.status === "Processing" ? 3 : selected.status === "Delivered" ? 5 : 0;

  return (
    <BuyerLayout breadcrumb="Orders / My Orders" cartCount={count}>
      <div className="grid grid-cols-1 gap-6 pb-10 lg:grid-cols-[340px_1fr]">
        <div className="rounded-4xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="px-2 text-lg font-semibold text-slate-900">
            All Orders <span className="text-sm font-normal text-slate-400">({orders.length} orders)</span>
          </h2>
          <div className="mt-3 space-y-2">
            {orders.map((order) => {
              const total = order.items.reduce((sum, item) => sum + item.qty * item.price, 0);
              return (
                <button
                  key={order.id}
                  onClick={() => setSelected(order)}
                  className={`flex w-full flex-col gap-2 rounded-2xl p-4 text-left transition ${
                    selected.id === order.id ? "bg-global-bg" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900">{order.id}</p>
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="text-xs text-slate-400">{order.dateRange}</p>
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-slate-500">{order.items.length} items</p>
                    <p className="font-semibold text-slate-900">{formatNaira(total)}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-slate-900">{selected.id}</h2>
                <StatusBadge status={selected.status} />
              </div>
              <p className="mt-1 text-sm text-slate-500">{selected.dateRange}</p>
            </div>
            <p className="text-lg font-bold text-slate-900">{formatNaira(orderTotal)}</p>
          </div>

          <div className="mt-8 flex items-center justify-between px-2">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const done = idx < activeStep;
              return (
                <div key={step.label} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full ${
                        done ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-2 max-w-[80px] text-[11px] font-medium text-slate-700">
                      {step.label}
                    </p>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`mx-2 h-0.5 flex-1 ${
                        idx < activeStep - 1 ? "bg-primary" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Order Items</h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="pb-2 font-medium">Item</th>
                  <th className="pb-2 font-medium">Qty</th>
                  <th className="pb-2 font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {selected.items.map((item) => (
                  <tr key={item.name} className="border-t border-slate-100">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-global-bg text-xl">
                          {item.emoji}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{item.name}</p>
                          <p className="text-xs text-slate-400">{item.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-slate-600">
                      {item.qty}
                      {item.unit}
                    </td>
                    <td className="py-3 font-medium text-slate-900">
                      {formatNaira(item.qty * item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 flex items-center justify-end gap-6 border-t border-slate-100 pt-3">
              <p className="text-sm font-medium text-slate-500">Total</p>
              <p className="text-base font-bold text-slate-900">{formatNaira(orderTotal)}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-100 bg-global-bg p-4">
            <h3 className="text-sm font-semibold text-slate-900">Delivery Details</h3>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-600">
              <MapPin className="h-4 w-4 text-primary" />
              {selected.deliveryAddress}
            </p>
            <p className="mt-1 text-sm text-slate-500">{selected.deliveryMethod}</p>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
}