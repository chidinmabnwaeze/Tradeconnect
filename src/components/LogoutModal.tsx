import { LogOut, X } from "lucide-react";

export default function LogoutModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Logout</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-2xl bg-rose-50 p-3 text-xs text-rose-700">
          <LogOut className="mt-0.5 h-4 w-4 shrink-0" />
          <p>You're about to log out. Confirm logout?</p>
        </div>

        <button
          onClick={onConfirm}
          className="mt-5 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary/90"
        >
          Confirm Logout
        </button>
      </div>
    </div>
  );
}
