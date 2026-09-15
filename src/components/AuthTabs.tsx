import { Link } from "react-router-dom";

export default function AuthTabs({ active }: { active: "signup" | "login" }) {
  return (
    <div className="grid w-full grid-cols-2 gap-1 rounded-2xl bg-slate-100 p-1">
      <Link
        to="/register"
        className={`rounded-xl py-2.5 text-center text-sm font-semibold transition ${
          active === "signup"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-400 hover:text-slate-600"
        }`}
      >
        Sign up
      </Link>
      <Link
        to="/login"
        className={`rounded-xl py-2.5 text-center text-sm font-semibold transition ${
          active === "login"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-400 hover:text-slate-600"
        }`}
      >
        Log in
      </Link>
    </div>
  );
}
