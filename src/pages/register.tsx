import React from "react";
import logoCover from "../assets/logo-cover.png";
import { User, LockKeyholeIcon, Mail } from "lucide-react";

const register = () => {
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
          action=""
          className="flex flex-col justify-center items-center w-full md:w-1/2 px-2 sm:px-4 space-y-5"
        >
          <div className="w-full text-center">
            <h1 className="text-3xl md:text-4xl font-bold">
              Create Admin Account
            </h1>
            <p className="text-gray-600 font-medium mt-2">
              Get started with{" "}
              <span className="font-bold text-primary">Trade Connect</span>{" "}
              operations.
            </p>
          </div>

          <div className="flex w-full flex-col sm:flex-row gap-3 border border-gray-300 rounded-2xl overflow-hidden bg-gray">
            <button className="w-full sm:w-1/2 bg-white text-primary font-semibold py-3 sm:px-6 rounded-none sm:rounded-l-2xl">
              Sign Up
            </button>
            <button className="w-full sm:w-1/2 text-gray-700 font-semibold py-3 sm:px-6 rounded-none sm:rounded-r-2xl">
              Log In
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex items-center border border-gray-300 rounded-2xl w-full px-4 py-2">
              <User className="w-5 text-gray-bg" />
              <input
                type="text"
                placeholder="First Name"
                className="ml-3 py-2 px-2 w-full bg-transparent outline-none"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-2xl w-full px-4 py-2">
              <User className="w-5 text-gray-bg" />
              <input
                type="text"
                placeholder="Last Name"
                className="ml-3 py-2 px-2 w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex items-center border border-gray-300 rounded-2xl w-full px-4 py-2">
            <Mail className="w-5 text-gray-bg" />
            <input
              type="email"
              placeholder="Email"
              className="ml-3 py-2 px-2 w-full bg-transparent outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-2xl w-full px-4 py-2">
            <LockKeyholeIcon className="w-5 text-gray-bg" />
            <input
              type="password"
              placeholder="Password"
              className="ml-3 py-2 px-2 w-full bg-transparent outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-2xl w-full px-4 py-2">
            <LockKeyholeIcon className="w-5 text-gray-bg" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="ml-3 py-2 px-2 w-full bg-transparent outline-none"
            />
          </div>

          <button className="btn-primary text-white py-3 rounded-2xl w-full text-base font-semibold">
            Sign Up
          </button>
        </form>
      </section>
    </div>
  );
};

export default register;
