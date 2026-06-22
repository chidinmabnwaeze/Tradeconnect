const statusStyles: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  live: "bg-emerald-100 text-emerald-700",
  delivered: "bg-emerald-100 text-emerald-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-amber-100 text-amber-700",
  "in transit": "bg-sky-100 text-sky-700",
  new: "bg-sky-100 text-sky-700",
  inactive: "bg-rose-100 text-rose-700",
  cancelled: "bg-rose-100 text-rose-700",
  open: "bg-rose-100 text-rose-700",
};

export default function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status.toLowerCase()] ?? "bg-slate-100 text-slate-600";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${style}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
