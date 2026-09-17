import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../lib/context";
import { LogOut } from "lucide-react";
import LogoutModal from "./LogoutModal";
import { useState } from "react";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore((state: any) => state);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <button
        className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-white/50 hover:bg-white/10 hover:text-white transition"
        onClick={() => setShowLogoutModal(true)}
      >
        <span>Log Out</span>
        <LogOut className="h-4 w-4" />
      </button>
      {showLogoutModal && (
        <LogoutModal
          open={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </>
  );
}
