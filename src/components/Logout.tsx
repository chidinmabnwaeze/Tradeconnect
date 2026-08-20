import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../lib/context";
import { LogOut } from "lucide-react";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore((state: any) => state);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    // <button
    //   onClick={handleLogout}
    //   className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
    // >
    //   Logout
    // </button>
    <button
      className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-white/50 hover:bg-white/10 hover:text-white transition"
      onClick={handleLogout}
    >
      <span>Log Out</span>
      <LogOut className="h-4 w-4" />
    </button>
  );
}
