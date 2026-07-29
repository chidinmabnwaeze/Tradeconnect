import React, { useState } from "react";
import logoCover from "../assets/logo-cover.png";
import { LockKeyholeIcon, Mail, Eye, EyeClosed } from "lucide-react";
import { useAuthStore } from "../lib/context";
import { type LoginData } from "../lib/types/auth";
import { getErrorMessage } from "../lib/getErrorMessage";
import { useNavigate } from "react-router-dom";

const login = () => {
  const login = useAuthStore((state: any) => state.login);
const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(formData.email, formData.password);
      navigate(response.user.role === "admin" ? "/dashboard" : "/marketplace");
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  return (
    <div className="bg-global-bg min-h-screen w-full flex justify-center items-center px-4 py-8">
      <section className="bg-white w-full max-w-5xl p-6 md:p-10 border border-primary border-4 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-stretch gap-8">
        <section className="hidden md:flex justify-center items-center md:w-1/2">
          <img
            src={logoCover}
            alt="Logo-cover"
            className="w-full max-w-sm object-contain"
          />
        </section>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center w-full md:w-1/2 px-2 sm:px-4 space-y-5"
        >
          <div className="w-full text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Welcome Back !</h1>
            <p className="text-gray-600 font-medium mt-2">
              Get started with{" "}
              <span className="font-bold text-primary">Trade Connect</span>{" "}
              operations.
            </p>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-primary rounded">
              {error}
            </div>
          )}
          <div className="flex w-full flex-col sm:flex-row gap-3 border border-gray-300 rounded-2xl overflow-hidden bg-gray">
            <button className="w-full sm:w-1/2 text-gray-700  font-semibold py-3 sm:px-6 rounded-none sm:rounded-l-2xl">
              Sign Up
            </button>
            <button className="w-full sm:w-1/2 bg-white text-primary font-semibold py-3 sm:px-6 rounded-none sm:rounded-r-2xl">
              Log In
            </button>
          </div>

          <div className="flex items-center border border-gray-300 rounded-2xl w-full px-4 py-2">
            <Mail className="w-5 text-gray-bg" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="ml-3 py-2 px-2 w-full bg-transparent outline-none"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-2xl w-full px-4 py-2">
            <LockKeyholeIcon className="w-5 text-gray-bg" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="ml-3 py-2 px-2 w-full bg-transparent outline-none"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword((pass) => !pass)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeClosed className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <button className="btn-primary text-white py-3 rounded-2xl w-full text-base font-semibold">
            Log In
          </button>
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Create one !
            </a>
          </p>
        </form>
      </section>
    </div>
  );
};

export default login;
