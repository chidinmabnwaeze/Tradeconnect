import React, { useState } from "react";
import { LockKeyholeIcon, Mail, Eye, EyeClosed } from "lucide-react";
import { useAuthStore } from "../lib/context";
import { type LoginData } from "../lib/types/auth";
import { getErrorMessage } from "../lib/getErrorMessage";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import AuthTabs from "./AuthTabs";

const Login = () => {
  const login = useAuthStore((state: any) => state.login);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(formData.email, formData.password);
      navigate(response.user.role === "admin" ? "/dashboard" : "/marketplace");
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      cardTitle="Welcome Back!"
      cardSubtitle={
        <>
          Get started with{" "}
          <span className="font-semibold text-primary">Trade Connect</span>{" "}
          operations.
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthTabs active="login" />

        {error && (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-primary">
            {error}
          </div>
        )}

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 focus-within:border-primary">
          <Mail className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 focus-within:border-primary">
          <LockKeyholeIcon className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((pass) => !pass)}
            className="shrink-0 text-slate-400 hover:text-slate-600"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeClosed className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-base font-semibold"
        >
          {loading && <div className="loader" />}
          {loading ? "Logging in" : "Log In"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
