import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  CalendarDays,
  ChartLine,
  ClipboardList,
  LayoutGrid,
  MessageSquare,
  Package,
  ShieldCheck,
  Users,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: ChartLine },
  { label: "Users", path: "/users", icon: Users },
  { label: "Listings", path: "/listings", icon: Package },
  { label: "Orders", path: "/orders", icon: ClipboardList },
  { label: "Disputes", path: "/disputes", icon: MessageSquare },
];

interface LayoutProps {
  children: React.ReactNode;
  breadcrumb?: string;
  title?: string;
  subtitle?: string;
}

export default function Layout({
  children,
  breadcrumb = "Dashboard / Overview",
  title = "Good morning, Marsai!",
  subtitle = "Here’s what’s happening on TradeConnect today.",
}: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-global-bg text-slate-900">
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
          <aside className="rounded-4xl border border-slate-200 bg-primary p-6 shadow-sm">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                <LayoutGrid className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">TradeConnect</p>
                <h2 className="text-xl font-semibold">Admin Portal</h2>
              </div>
            </div>

            <nav className="space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                      active
                        ? "bg-primary text-white shadow-lg border-l-4"
                        : "text-white/40 hover:bg-slate-100 hover:text-primary"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-40 rounded-xl border-t border-global-bg p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Manage
              </p>
              <div className="mt-4 space-y-3">
                <button className="flex w-full items-center justify-between rounded-3xl px-4 py-3 text-sm font-medium text-white/40 shadow-sm hover:bg-slate-100">
                  <span>Settings</span>
                  <Bell className="h-4 w-4 text-slate-500" />
                </button>
                <button className="flex w-full items-center justify-between rounded-3xl px-4 py-3 text-sm font-medium text-white/40 shadow-sm hover:bg-slate-100">
                  <span>Logout</span>
                  <ShieldCheck className="h-4 w-4 text-slate-500" />
                </button>
              </div>
            </div>
          </aside>

          {/* header */}
          <main className="space-y-6">
            <div className="flex flex-col gap-4 rounded-4xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-500">{breadcrumb}</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                  {title}
                </h1>
                <p className="mt-2 text-slate-500">{subtitle}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100">
                  <CalendarDays className="mr-2 inline-block h-4 w-4" />
                  Wednesday, 13 May 2026
                </button>
                <button className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90">
                  <Bell className="mr-2 inline-block h-4 w-4" />
                  Notifications
                </button>
              </div>
            </div>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
