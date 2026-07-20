import {
  Bell,
  ClipboardList,
  LayoutGrid,
  LogOut,
  MessageSquare,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Avatar from "./Avatar";

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const navItems: NavItem[] = [
  { label: "Marketplace", icon: LayoutGrid, path: "/marketplace" },
  { label: "Orders", icon: ClipboardList, path: "/marketplace/orders" },
  { label: "Disputes", icon: MessageSquare, path: "/marketplace/disputes" },
];

export default function BuyerLayout({
  children,
  breadcrumb,
  cartCount = 0,
  onCartClick,
}: {
  children: React.ReactNode;
  breadcrumb?: string;
  cartCount?: number;
  onCartClick?: () => void;
}) {
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-global-bg gap-4 p-4">
      {/* Sidebar — fixed width, full height */}
      <aside className="flex w-[272px] shrink-0 flex-col rounded-3xl bg-primary shadow-sm overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 pt-6 pb-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
            <LayoutGrid className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-white/60">TradeConnect</p>
            <h2 className="text-base font-semibold text-white leading-tight">
              Buyer Portal
            </h2>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1 px-4">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-white shadow"
                    : "text-white/50 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom — Settings & Logout pushed to bottom */}
        <div className="mt-auto border-t border-white/10 px-4 py-4">
          <Link
            to="/marketplace/settings"
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              location.pathname === "/marketplace/settings"
                ? "bg-white/10 text-white"
                : "text-white/50 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link
            to="/login"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/50 hover:bg-white/10 hover:text-white transition"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 min-w-0 flex-col gap-4 overflow-y-auto py-4 pr-4">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between rounded-3xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
          <p className="text-sm text-slate-600">{breadcrumb}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={onCartClick}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100">
              <Bell className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-3">
              <Avatar name="Joy Smith" />
              <div className="text-sm">
                <p className="font-medium text-slate-900">Joy Smith</p>
                <p className="text-xs text-slate-400">BYR-01203</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        {children}
      </div>
    </div>
  );
}
