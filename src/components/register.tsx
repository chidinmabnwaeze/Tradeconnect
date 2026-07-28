import React, { useState } from "react";
import logoCover from "../assets/logo-cover.png";
import { User, LockKeyholeIcon, Mail } from "lucide-react";
import { useAuthStore } from "../lib/context";
import { type RegisterData } from "../lib/types/auth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const handleRegister = useAuthStore((state: any) => state.register);

  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "user",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "firstName") {
      setFirstName(value);
      setFormData((prev: RegisterData) => ({
        ...prev,
        name: `${value} ${lastName}`.trim(),
      }));
      return;
    }

    if (name === "lastName") {
      setLastName(value);
      setFormData((prev: RegisterData) => ({
        ...prev,
        name: `${firstName} ${value}`.trim(),
      }));
      return;
    }

    setFormData((prev: RegisterData) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your first and last name");
      return;
    }

    if (
      !formData.email ||
      !formData.password ||
      !formData.password_confirmation
    ) {
      setError("Please input all fields");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords don't match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Passwords should be at least 8 digits");
      return;
    }
    setLoading(true);

    try {
      const registrationData: RegisterData = {
        name: `${firstName.trim()} ${lastName.trim()}`.trim(),
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        role: "user",
      };

      console.log(registrationData)
      await handleRegister(registrationData);
      navigate("/login");
    } catch (error: any) {
      console.log("Registration Failed :", error);
      const validationErrors = error?.response?.data?.errors;
      const firstValidationError = validationErrors
        ? (Object.values(validationErrors)[0] as string[])?.[0]
        : undefined;
      setError(
        firstValidationError ||
          error?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-global-bg min-h-screen w-full flex justify-center items-center px-4 py-8">
      <section className="bg-white w-full max-w-5xl p-6 md:p-10 border-4 border-primary rounded-3xl shadow-lg flex flex-col md:flex-row md:items-stretch gap-8">
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
            <h1 className="text-3xl md:text-4xl font-bold">
              Create an Account
            </h1>

            <p className="text-gray-600 font-medium mt-2">
              " Get started with{" "}
              <span className="font-bold text-primary">Trade Connect</span>{" "}
              operations. "
            </p>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-primary rounded">
              {error}
            </div>
          )}

          <div className="flex w-full flex-col sm:flex-row gap-3 border border-gray-300 rounded-2xl overflow-hidden bg-gray">
            <button className="w-full sm:w-1/2 bg-white text-primary font-semibold py-3 sm:px-6 rounded-none sm:rounded-l-2xl">
            <Link to={"/register"}>
              Sign Up
            </Link>
            </button>
            <button className="w-full sm:w-1/2 text-gray-700 font-semibold py-3 sm:px-6 rounded-none sm:rounded-r-2xl">
              <Link to={"/login"}>
              Log In
            </Link>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex items-center border border-gray-300 rounded-2xl w-full px-4 py-2">
              <User className="w-5 text-gray-bg" />
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                className="ml-3 py-2 px-2 w-full bg-transparent outline-none"
                value={firstName}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-2xl w-full px-4 py-2">
              <User className="w-5 text-gray-bg" />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="ml-3 py-2 px-2 w-full bg-transparent outline-none"
                value={lastName}
                onChange={handleChange}
              />
            </div>
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
              type="password"
              placeholder="Password"
              className="ml-3 py-2 px-2 w-full bg-transparent outline-none"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-2xl w-full px-4 py-2">
            <LockKeyholeIcon className="w-5 text-gray-bg" />
            <input
              name="password_confirmation"
              type="password"
              placeholder="Confirm Password"
              className="ml-3 py-2 px-2 w-full bg-transparent outline-none"
              value={formData.password_confirmation}
              onChange={handleChange}
            />
          </div>

          <button
            className="btn-primary flex items-center justify-center text-white py-3 rounded-2xl w-full text-base font-semibold"
            type="submit"
            disabled={loading}
          >
            {loading && <div className="loader"></div>}
            {loading ? "Creating your account" : "Sign Up"}
          </button>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Log in
            </a>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Register;
