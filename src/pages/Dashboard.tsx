import {
  Bell,
  CalendarDays,
  ChartLine,
  ClipboardList,
  LayoutGrid,
  MessageSquare,
  Package,
  ShoppingBag,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    label: "Total Orders",
    value: "1,284",
    subtext: "12 new today",
    icon: ShoppingBag,
    iconBg: "bg-dash-brown text-white",
  },
  {
    label: "Total Listings",
    value: "342",
    subtext: "5 pending review",
    icon: Package,
    iconBg: "bg-dash-brown text-white",
  },
  {
    label: "Active Farmers",
    value: "84",
    subtext: "3 pending verify",
    icon: Users,
    iconBg: "bg-dash-brown text-white",
  },
  {
    label: "Active Buyers",
    value: "916",
    subtext: "31 new this week",
    icon: ClipboardList,
    iconBg: "bg-dash-brown text-white",
  },
];

const revenueData = [
  { month: "Jan", revenue: 22 },
  { month: "Feb", revenue: 38 },
  { month: "Mar", revenue: 45 },
  { month: "Apr", revenue: 55 },
  { month: "May", revenue: 62 },
  { month: "Jun", revenue: 73 },
  { month: "Jul", revenue: 88 },
];

const recentActivity = [
  {
    title: "Order #1284 confirmed",
    subtitle: "Big Tomatoes - Musa Farm",
    status: "Confirmed",
    time: "2m ago",
    icon: ShieldCheck,
  },
  {
    title: "New farmer - Amina S.",
    subtitle: "Kaduna, Jarigi Farm",
    status: "New",
    time: "14h ago",
    icon: Users,
  },
  {
    title: "Listing published",
    subtitle: "Fresh Onions - N750/kg",
    status: "Live",
    time: "52m ago",
    icon: Package,
  },
  {
    title: "Dispute #07 opened",
    subtitle: "Order #1271 · Quality issue",
    status: "Open",
    time: "1w ago",
    icon: MessageSquare,
  },
];

const ordersQueue = [
  {
    order: "#1285",
    item: "5kg Peppers",
    status: "Confirm",
    time: "8 mins ago",
  },
  {
    order: "#1286",
    item: "2kg Tomatoes",
    status: "Confirm",
    time: "22 mins ago",
  },
  {
    order: "#1287",
    item: "10kg Onions",
    status: "Confirm",
    time: "41 mins ago",
  },
  { order: "#1288", item: "20kg Rice", status: "Confirm", time: "1 hr ago" },
];

const Dashboard = () => {
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
              {[
                { label: "Dashboard", active: true, icon: ChartLine },
                { label: "Users", active: false, icon: Users },
                { label: "Listings", active: false, icon: Package },
                { label: "Orders", active: false, icon: ClipboardList },
                { label: "Disputes", active: false, icon: MessageSquare },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                      item.active
                        ? "bg-primary text-white shadow-lg border-l-4"
                        : "text-white/40 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
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

          <main className="space-y-6">
            <div className="flex flex-col gap-4 rounded-4xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-500">Dashboard / Overview</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                  Good morning, Marsai!
                </h1>
                <p className="mt-2 text-slate-500">
                  Here’s what’s happening on TradeConnect today.
                </p>
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

            <div className="grid gap-4 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border-3 border-slate-50 border-b-primary bg-white p-5 shadow-sm"
                  >
                      <div
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl ${stat.iconBg}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    <div className="flex items-center justify-between gap-4">
                    
                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          {stat.label}
                        </p>
                        <p className="mt-3 text-3xl font-semibold text-slate-900">
                          {stat.value}
                        </p>
                      </div>
                      {/* <div
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl ${stat.iconBg}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div> */}
                    </div>
                    <p className="mt-4 text-sm text-slate-500">
                      {stat.subtext}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
              <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Farmer’s revenue flow
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                      Monthly payouts recovered to verified farmers
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    Week
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-4">
                  <div className="rounded-3xl bg-global-bg p-4 text-sm">
                    <p className="font-semibold text-slate-900">
                      Total paid out
                    </p>
                    <p className="mt-3 text-2xl font-semibold">₦327,000</p>
                    <p className="mt-2 text-success">+3.6% vs prior period</p>
                  </div>
                  <div className="rounded-3xl bg-global-bg p-4 text-sm">
                    <p className="font-semibold text-slate-900">Peak month</p>
                    <p className="mt-3 text-2xl font-semibold">July</p>
                    <p className="mt-2 text-success">Highest on record</p>
                  </div>
                  <div className="rounded-3xl bg-global-bg p-4 text-sm">
                    <p className="font-semibold text-slate-900">Avg monthly</p>
                    <p className="mt-3 text-2xl font-semibold">₦46,700</p>
                    <p className="mt-2 text-success">+12.6% vs last month</p>
                  </div>
                  <div className="rounded-3xl bg-global-bg p-4 text-sm">
                    <p className="font-semibold text-slate-900">
                      Active Farmers
                    </p>
                    <p className="mt-3 text-2xl font-semibold">84</p>
                    <p className="mt-2 text-success">
                      Earnings for this period
                    </p>
                  </div>
                </div>

                <div className="mt-6 h-120">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={revenueData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        stroke="#95321C"
                        strokeDasharray="4 4"
                        vertical={true}
                      />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip formatter={(value: any) => `₦${value}k`} />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#27AE60"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#27AE60" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 ml-8 flex items-center sm: gap-4">
                  <div className="bg-success  w-6 text-transparent rounded-full">
                    .
                  </div>
                  <p className=" font-medium text-primary">
                    Farmer Payout (₦) --
                  </p>
                  <h2 className=" text-xl font-semibold text-slate-900">
                    ₦327,000
                  </h2>
                </div>
              </section>

              <section className="space-y-6">
                <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Recent activity</h3>
                    <button className="text-sm font-medium text-primary">
                      See all
                    </button>
                  </div>
                  <div className="mt-5 space-y-4">
                    {recentActivity.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.title}
                          className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">
                                  {item.title}
                                </p>
                                <p className="text-sm text-slate-500">
                                  {item.subtitle}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-1 text-right">
                              <p className="text-sm font-semibold text-slate-900">
                                {item.status}
                              </p>
                              <p className="text-xs text-slate-500">
                                {item.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Orders queue</h3>
                      <p className="text-sm text-slate-500">Needs action</p>
                    </div>
                    <button className="text-sm font-medium text-primary">
                      View all
                    </button>
                  </div>
                  <div className="mt-5 space-y-4">
                    {ordersQueue.map((order) => (
                      <div
                        key={order.order}
                        className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <div>
                          <p className="font-medium text-slate-900">
                            {order.order} - {order.item}
                          </p>
                          <p className="text-sm text-slate-500">{order.time}</p>
                        </div>
                        <button className="rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
                          {order.status}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
