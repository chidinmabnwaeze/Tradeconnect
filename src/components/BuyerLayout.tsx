import { LayoutGrid } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  interface NavItem {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    path?: string;
  }

  const navItems: NavItem[] = [
    {
      label: "Marketplace",
      icon: LayoutGrid,
      path: "/marketplace",
    },
    {
      label: "Orders",
      icon: LayoutGrid,
      path: "/orders",
    },
  ];

  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState<string>(location.pathname);

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
              Admin Portal
            </h2>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-2 px-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${activeNavItem === item.path ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
              onClick={() => setActiveNavItem(item.path || "")}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </div>
  );
}
