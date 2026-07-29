import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../lib/context";
import type { Role } from "../lib/types/auth";

const ROLE_HOME: Record<Role, string> = {
  admin: "/dashboard",
  user: "/marketplace",
};

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: Role[];
}) {
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  const user = useAuthStore((state: any) => state.user);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role as Role] ?? "/login"} replace />;
  }

  return <>{children}</>;
}
