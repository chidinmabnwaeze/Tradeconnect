import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Package,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import Layout from "../../components/Layout";
import Avatar from "../../components/Avatar";
import StatusBadge from "../../components/StatusBadge";

const tabs = ["Overview", "Listings", "Orders", "Activity Log"] as const;
type Tab = (typeof tabs)[number];

const farmerListings = [
  { name: "Rice", emoji: "🌾", category: "Grains & Cereals", price: "₦180/kg", stock: "200kg", status: "Pending" },
  { name: "Yam", emoji: "🍠", category: "Roots & Tubers", price: "₦180/kg", stock: "180kg", status: "Live" },
  { name: "Cassava", emoji: "🥔", category: "Roots & Tubers", price: "₦220/kg", stock: "120kg", status: "Live" },
];

const farmerOrders = [
  { order: "#1284", item: "Big Tomatoes", buyer: "Ade Coker", amount: "₦12,000", status: "Confirmed", date: "21 Jan 2025" },
  { order: "#1154", item: "Cassava", buyer: "Halima Musa", amount: "₦8,500", status: "In Transit", date: "18 Jan 2025" },
  { order: "#1098", item: "Yam", buyer: "Emeka Obi", amount: "₦22,000", status: "Delivered", date: "10 Jan 2025" },
];

const activityLog = [
  { event: "Order #1284 confirmed", detail: "Big Tomatoes — 5kg", time: "2m ago", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50" },
  { event: "Listing published", detail: "Fresh Onions — ₦750/kg", time: "52m ago", icon: Package, color: "text-sky-600 bg-sky-50" },
  { event: "Order #1154 shipped", detail: "Cassava — in transit", time: "1d ago", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50" },
  { event: "Dispute #07 opened", detail: "Order #1098 · Quality issue", time: "1w ago", icon: AlertTriangle, color: "text-rose-600 bg-rose-50" },
];

export default function FarmerProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <Layout breadcrumb="Users / Farmers / Musa Ibrahim" compact>
      {/* Back */}
      <button
        onClick={() => navigate("/users")}
        className="mb-4 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Farmers
      </button>

      {/* Profile hero card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Top row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar name="Musa Ibrahim" size="lg" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-slate-900">Musa Ibrahim</h1>
                <StatusBadge status="Active" />
              </div>
              <p className="mt-0.5 text-sm text-slate-500">FAR-01923</p>
              <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                <MapPin className="h-3.5 w-3.5" />
                Kagarko, Kaduna State
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Sub Profile
            </button>
            <button className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50">
              Suspend
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 divide-x divide-slate-100 rounded-2xl bg-global-bg">
          <div className="px-6 py-4 text-center">
            <p className="text-2xl font-semibold text-slate-900">12</p>
            <p className="mt-0.5 text-xs text-slate-500">Listings</p>
          </div>
          <div className="px-6 py-4 text-center">
            <p className="text-2xl font-semibold text-slate-900">34</p>
            <p className="mt-0.5 text-xs text-slate-500">Completed Orders</p>
          </div>
          <div className="px-6 py-4 text-center">
            <p className="text-2xl font-semibold text-slate-900">₦100,000</p>
            <p className="mt-0.5 text-xs text-slate-500">Total Earnings</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-1 border-b border-slate-100">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2.5 text-sm font-medium transition ${
                activeTab === tab
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab}
              {tab === "Listings" && (
                <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">3</span>
              )}
              {tab === "Orders" && (
                <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">3</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-6">
          {activeTab === "Overview" && <OverviewTab />}
          {activeTab === "Listings" && <ListingsTab />}
          {activeTab === "Orders" && <OrdersTab />}
          {activeTab === "Activity Log" && <ActivityLogTab />}
        </div>
      </div>
    </Layout>
  );
}

function OverviewTab() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Farm Information */}
      <div className="space-y-5">
        <div className="rounded-2xl border border-slate-100 p-5">
          <h3 className="mb-4 text-sm font-semibold text-slate-800">Farm Information</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Farm Name</dt>
              <dd className="font-medium text-slate-800">Ibrahim Family Farm</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Location</dt>
              <dd className="font-medium text-slate-800">4.3 Hectares</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Farming method</dt>
              <dd className="font-medium text-slate-800">Mixed Farming</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Hometown</dt>
              <dd className="font-medium text-slate-800">Kabarira village, Kagarko LGA, Kaduna State</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-slate-100 p-5">
          <h3 className="mb-4 text-sm font-semibold text-slate-800">Top Products</h3>
          <div className="space-y-3">
            {[
              { name: "Rice", emoji: "🌾", listings: 4, status: "Live" },
              { name: "Yam", emoji: "🍠", listings: 2, status: "Live" },
              { name: "Cassava", emoji: "🥔", listings: 3, status: "Pending" },
            ].map((p) => (
              <div key={p.name} className="flex items-center justify-between rounded-xl bg-global-bg px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{p.emoji}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.listings} listings</p>
                  </div>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personal Information + History */}
      <div className="space-y-5">
        <div className="rounded-2xl border border-slate-100 p-5">
          <h3 className="mb-4 text-sm font-semibold text-slate-800">Personal Information</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Full Name</dt>
              <dd className="font-medium text-slate-800">Musa Ibrahim</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Age</dt>
              <dd className="font-medium text-slate-800">38</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Hometown</dt>
              <dd className="font-medium text-slate-800">Kaduna State</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Experience</dt>
              <dd className="font-medium text-slate-800">5 years</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1.5 text-slate-500">
                <Phone className="h-3.5 w-3.5" /> Phone
              </dt>
              <dd className="font-medium text-slate-800">+234 803 500 7062</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1.5 text-slate-500">
                <Mail className="h-3.5 w-3.5" /> Email
              </dt>
              <dd className="font-medium text-slate-800">musa.ibrahim@farm.ng</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-slate-100 p-5">
          <h3 className="mb-4 text-sm font-semibold text-slate-800">History Timeline</h3>
          <div className="space-y-3">
            {activityLog.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${item.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{item.event}</p>
                    <p className="text-xs text-slate-500">{item.detail}</p>
                  </div>
                  <p className="shrink-0 text-xs text-slate-400">{item.time}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListingsTab() {
  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="text-slate-500">
          <th className="pb-3 font-medium">Produce</th>
          <th className="pb-3 font-medium">Price</th>
          <th className="pb-3 font-medium">Stock</th>
          <th className="pb-3 font-medium">Status</th>
        </tr>
      </thead>
      <tbody>
        {farmerListings.map((item, idx) => (
          <tr key={idx} className="border-t border-slate-100">
            <td className="py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-global-bg text-xl">
                  {item.emoji}
                </div>
                <div>
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.category}</p>
                </div>
              </div>
            </td>
            <td className="py-3 font-medium text-primary">{item.price}</td>
            <td className="py-3 text-slate-600">{item.stock}</td>
            <td className="py-3"><StatusBadge status={item.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function OrdersTab() {
  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="text-slate-500">
          <th className="pb-3 font-medium">Order</th>
          <th className="pb-3 font-medium">Buyer</th>
          <th className="pb-3 font-medium">Amount</th>
          <th className="pb-3 font-medium">Date</th>
          <th className="pb-3 font-medium">Status</th>
        </tr>
      </thead>
      <tbody>
        {farmerOrders.map((order, idx) => (
          <tr key={idx} className="border-t border-slate-100">
            <td className="py-3">
              <p className="font-medium text-slate-900">{order.order}</p>
              <p className="text-xs text-slate-400">{order.item}</p>
            </td>
            <td className="py-3 text-slate-600">{order.buyer}</td>
            <td className="py-3 font-medium text-slate-900">{order.amount}</td>
            <td className="py-3 text-slate-500">{order.date}</td>
            <td className="py-3"><StatusBadge status={order.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ActivityLogTab() {
  return (
    <div className="space-y-4">
      {activityLog.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="flex items-start gap-4 rounded-2xl bg-global-bg px-5 py-4">
            <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-800">{item.event}</p>
              <p className="text-sm text-slate-500">{item.detail}</p>
            </div>
            <p className="shrink-0 text-sm text-slate-400">{item.time}</p>
          </div>
        );
      })}
    </div>
  );
}
