import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  CalendarDays,
  ChartLine,
  ChevronDown,
  ClipboardList,
  LayoutGrid,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  Settings,
  Users,
} from "lucide-react";
import Avatar from "./Avatar";

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: ChartLine },
  {
    label: "Users",
    icon: Users,
    children: [
      { label: "Farmers", path: "/users" },
      { label: "Buyers", path: "/buyers" },
    ],
  },
  { label: "Listings", path: "/listings", icon: Package },
  { label: "Orders", path: "/orders", icon: ClipboardList },
  { label: "Disputes", path: "/disputes", icon: MessageSquare },
];

interface LayoutProps {
  children: React.ReactNode;
  breadcrumb?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

export default function Layout({
  children,
  breadcrumb = "Dashboard / Overview",
  title = "Good morning, Marsai!",
  subtitle = "Here’s what’s happening on TradeConnect today.",
  compact = false,
}: LayoutProps) {
  const location = useLocation();
  const usersSectionActive =
    location.pathname === "/users" || location.pathname === "/buyers";
  const [usersOpen, setUsersOpen] = useState(usersSectionActive);

const [toggle, setToggle] = useState(false)


  return (
    <div className="min-h-screen bg-global-bg text-slate-900">
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
          <aside className="rounded-4xl border border-slate-200 bg-primary p-6 shadow-sm">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                <LayoutGrid className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">TradeConnect</p>
                <h2 className="text-xl font-semibold text-white">
                  Admin Portal
                </h2>
              </div>
              <Menu className="text-white " onClick={()=>setToggle((prev)=>!prev)}/>
            </div>

            <nav className="space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;

                if (item.children) {
                  const open = usersOpen || usersSectionActive;
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => setUsersOpen((prev) => !prev)}
                        className={`flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition ${
                          usersSectionActive
                            ? "bg-white text-primary shadow-lg"
                            : "text-white/40 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="h-5 w-5" />
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {open && (
                        <div className="mt-2 ml-6 space-y-1 border-l border-white/15 pl-4">
                          {item.children.map((child) => {
                            const active = location.pathname === child.path;
                            return (
                              <Link
                                key={child.path}
                                to={child.path}
                                className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                                  active
                                    ? "text-white"
                                    : "text-white/40 hover:text-white"
                                }`}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.label}
                    to={item.path!}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                      active
                        ? "bg-white text-primary shadow-lg"
                        : "text-white/40 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-40 rounded-xl border-t border-white/15 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                Manage
              </p>
              <div className="mt-4 space-y-3">
                <button className="flex w-full items-center justify-between rounded-3xl px-4 py-3 text-sm font-medium text-white/40 shadow-sm hover:bg-white/10 hover:text-white">
                  <span>Settings</span>
                  <Settings className="h-4 w-4" />
                </button>
                <button className="flex w-full items-center justify-between rounded-3xl px-4 py-3 text-sm font-medium text-white/40 shadow-sm hover:bg-white/10 hover:text-white">
                  <span>Log Out</span>
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* header */}
          <main className="space-y-6">
            {compact ? (
              <div className="flex items-center justify-between rounded-4xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
                <p className="text-sm text-slate-500">{breadcrumb}</p>
                <div className="flex items-center gap-4">
                  <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100">
                    <Bell className="h-5 w-5" />
                  </button>
                  <div className="flex items-center gap-3">
                    <Avatar name="Marsai Smith" />
                    <div className="text-sm">
                      <p className="font-medium text-slate-900">
                        Marsai Smith
                      </p>
                      <p className="text-xs text-slate-400">ADM 001</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
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
            )}

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
