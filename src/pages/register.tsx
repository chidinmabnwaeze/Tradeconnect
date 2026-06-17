import React from "react";
import logoCover from "../assets/logo-cover.png";
import { User, LockKeyholeIcon, Mail } from "lucide-react";

const register = () => {
  return (
    <div className="bg-global-bg  h-screen w-screen flex justify-center items-center overflow-hidden ">
      <section className="bg-white w-3/5 p-6 border border-primary border-4 rounded-2xl shadow-lg flex flex-col justify-between items-center">
        <section className="flex justify-center items-center">
          <img src={logoCover} alt="Logo-cover" className="hidden md:block" />
          <form
            action=""
            className="flex flex-col justify-center items-center px-4 space-y-4 w-full"
          >
            <h1 className="text-2xl font-bold">Create Admin Account</h1>
            <p className="text-gray-600 font-medium text-center">
              Get started with{" "}
              <span className="font-bold text-primary">Trade Connect</span>{" "}
              operations.
            </p>
            {/* tab */}
            <div className="flex justify-start items-center border border-gray-300 rounded-lg w-3/4 bg-gray ">
              <button className="bg-white justify-start flex font-semibold border border-gray py-1 px-12 rounded-lg">
                Sign Up
              </button>
              <button className="text-gray-800 font-semibold py-1 px-8  rounded-r-lg">
                Log In
              </button>
            </div>
            <div className="flex justify-between items-center space-x-2">
              <div className="flex justify-center items-center border border-gray-300 rounded-lg w-full px-4 ">
                <User className="w-5 text-gray-bg" />
                <input
                  type="text"
                  placeholder="First Name"
                  className="py-2 px-4 w-full"
                />
              </div>
              <div className="flex justify-center items-center border border-gray-300 rounded-lg w-full px-4 ">
                <User className="w-5 text-gray-bg" />
                <input
                  type="text"
                  placeholder="Last Name"
                  className=" py-2 px-4 w-full"
                />
              </div>
            </div>

            <div className="flex justify-center items-center border border-gray-300 rounded-lg w-full pl-4 ">
              <Mail className="w-5 text-gray-bg" />
              <input
                type="email"
                placeholder="Email"
                className="py-2 px-4 w-full"
              />
            </div>
            <div className="flex justify-center items-center border border-gray-300 rounded-lg w-full pl-4 ">
              <LockKeyholeIcon className="w-5 text-gray-bg" />
              <input
                type="password"
                placeholder="Password"
                className="py-2 px-4 w-full"
              />
            </div>

            <div className="flex justify-center items-center border border-gray-300 rounded-lg w-full pl-4 ">
              <LockKeyholeIcon className="w-5 text-gray-bg" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="py-2 px-4 w-full"
              />
            </div>
            <button className="btn-primary text-white py-2 px-4 rounded-lg w-full">
              Sign Up
            </button>
          </form>
        </section>
      </section>
    </div>
  );
};

export default register;
