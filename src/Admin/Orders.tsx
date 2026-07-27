import { useState } from "react";
import {
  CircleCheck,
  Clock,
  Funnel,
  MapPin,
  PackageCheck,
  PackagePlus,
  Truck,
} from "lucide-react";
import Layout from "../components/Layout";
import Avatar from "../components/Avatar";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";

interface Order {
  id: string;
  date: string;
  buyer: string;
  buyerCode: string;
  location: string;
  produce: string;
  emoji: string;
  category: string;
  price: string;
  qty: string;
  total: string;
  status: "New" | "In Transit" | "Delivered" | "Cancelled";
}

const orders: Order[] = [
  { id: "#ORD-1285", date: "Today, 08:14", buyer: "Hauwa Makurdi", buyerCode: "BYR-01803", location: "Kaduna - Kagarko LGA", produce: "Rice", emoji: "🌾", category: "Grains & Cereals", price: "₦1000/kg", qty: "5kg", total: "₦1000", status: "New" },
  { id: "#ORD-1286", date: "Today, 08:14", buyer: "Hauwa Makurdi", buyerCode: "BYR-01803", location: "Kaduna - Kagarko LGA", produce: "Spinach", emoji: "🥬", category: "Vegetables", price: "₦1000/kg", qty: "20 bundles", total: "₦1000", status: "In Transit" },
  { id: "#ORD-1287", date: "Today, 08:14", buyer: "Hauwa Makurdi", buyerCode: "BYR-01803", location: "Kaduna - Kagarko LGA", produce: "Cassava", emoji: "🥔", category: "Roots & Tubers", price: "₦1000/kg", qty: "10kg", total: "₦1000", status: "Delivered" },
  { id: "#ORD-1288", date: "Today, 08:14", buyer: "Hauwa Makurdi", buyerCode: "BYR-01803", location: "Kaduna - Kagarko LGA", produce: "Spinach", emoji: "🥬", category: "Vegetables", price: "₦1000/kg", qty: "20 bundles", total: "₦1000", status: "Cancelled" },
  { id: "#ORD-1289", date: "Today, 08:14", buyer: "Hauwa Makurdi", buyerCode: "BYR-01803", location: "Kaduna - Kagarko LGA", produce: "Maize (Corn)", emoji: "🌽", category: "Grains & Cereals", price: "₦1000/kg", qty: "15kg", total: "₦1000", status: "In Transit" },
  { id: "#ORD-1290", date: "Today, 08:14", buyer: "Hauwa Makurdi", buyerCode: "BYR-01803", location: "Kaduna - Kagarko LGA", produce: "Lettuce", emoji: "🥬", category: "Vegetables", price: "₦1000/kg", qty: "20 bundles", total: "₦1000", status: "New" },
  { id: "#ORD-1291", date: "Today, 08:14", buyer: "Hauwa Makurdi", buyerCode: "BYR-01803", location: "Kaduna - Kagarko LGA", produce: "Lettuce", emoji: "🥬", category: "Vegetables", price: "₦1000/kg", qty: "20 bundles", total: "₦1000", status: "Delivered" },
  { id: "#ORD-1292", date: "Today, 08:14", buyer: "Hauwa Makurdi", buyerCode: "BYR-01803", location: "Kaduna - Kagarko LGA", produce: "Lettuce", emoji: "🥬", category: "Vegetables", price: "₦1000/kg", qty: "20 bundles", total: "₦1000", status: "Cancelled" },
  { id: "#ORD-1293", date: "Today, 08:14", buyer: "Hauwa Makurdi", buyerCode: "BYR-01803", location: "Kaduna - Kagarko LGA", produce: "Lettuce", emoji: "🥬", category: "Vegetables", price: "₦1000/kg", qty: "20 bundles", total: "₦1000", status: "New" },
];

const steps = [
  { label: "Order Created", date: "25 Jul 2026", icon: PackagePlus },
  { label: "Order Confirmed", date: "26 Jul 2026", icon: CircleCheck },
  { label: "Processing", date: "26 Jul 2026", icon: Clock },
  { label: "Out for Delivery", date: "28 Jul 2026", icon: Truck },
  { label: "Delivered", date: "29 Jul 2026", icon: PackageCheck },
];

const PAGE_SIZE = 9;

export default function Orders() {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(orders[0]);
  const pageCount = Math.ceil(orders.length / PAGE_SIZE) || 1;

  const activeStep =
    selected.status === "New"
      ? 1
      : selected.status === "In Transit"
      ? 3
      : selected.status === "Delivered"
      ? 5
      : 0;

  return (
    <Layout breadcrumb="Orders / All orders" compact>
      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Order Summary</h2>
          <p className="mt-1 text-sm text-slate-500">Click on any order to preview</p>
        </div>

        <div className="flex items-center justify-between gap-6 rounded-3xl border border-slate-100 bg-global-bg p-6">
          <div className="flex items-center gap-4">
            <Avatar name={selected.buyer} size="md" />
            <div>
              <p className="font-semibold text-slate-900">{selected.buyer}</p>
              <p className="text-xs text-slate-500">{selected.buyerCode}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5" />
                {selected.location}
              </p>
            </div>
          </div>

          <div className="text-sm">
            <p className="font-semibold text-slate-900">{selected.id}</p>
          </div>

          <div className="flex gap-8 text-sm">
            <div>
              <p className="text-slate-500">PRICE/KG</p>
              <p className="mt-1 font-semibold text-slate-900">{selected.price}</p>
            </div>
            <div>
              <p className="text-slate-500">QTY</p>
              <p className="mt-1 font-semibold text-slate-900">{selected.qty}</p>
            </div>
            <div>
              <p className="text-slate-500">TOTAL</p>
              <p className="mt-1 font-semibold text-slate-900">{selected.total}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl shadow-sm">
              {selected.emoji}
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-500">
              {selected.category}
            </span>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between px-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const done = idx < activeStep;
            return (
              <div key={step.label} className="flex flex-1 items-center">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      done ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-2 text-xs font-medium text-slate-700">{step.label}</p>
                  <p className="text-xs text-slate-400">{step.date}</p>
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
      </div>

      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Order Lists</h2>
            <p className="mt-1 text-sm text-slate-500">View all customers orders</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              placeholder="Search orders..."
              className="w-[260px] rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none"
            />
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <Funnel className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-500">
              <th className="pb-3 font-medium">Order</th>
              <th className="pb-3 font-medium">Produce</th>
              <th className="pb-3 font-medium">Buyer</th>
              <th className="pb-3 font-medium">Qty</th>
              <th className="pb-3 font-medium">Total</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                onClick={() => setSelected(order)}
                className={`cursor-pointer border-t border-slate-100 ${
                  selected.id === order.id ? "bg-global-bg" : "hover:bg-slate-50"
                }`}
              >
                <td className="py-3">
                  <p className="font-medium text-slate-900">{order.id}</p>
                  <p className="text-xs text-slate-400">{order.date}</p>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-global-bg text-xl">
                      {order.emoji}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{order.produce}</p>
                      <p className="text-xs text-slate-400">{order.category}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-slate-600">{order.buyer}</td>
                <td className="py-3 text-slate-600">{order.qty}</td>
                <td className="py-3 text-slate-600">{order.total}</td>
                <td className="py-3">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          page={page}
          pageCount={pageCount}
          total={orders.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>
    </Layout>
  );
}
