import React from "react";
import logoCover from "../assets/logo-cover.png";
import { LockKeyholeIcon, Mail } from "lucide-react";

const VerifyEmail = () => {
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
              Verify Your Email
            </h1>
            <p className="text-gray-600 font-medium mt-2">
              We’ll send a verification code to your email.
            </p>
          </div>

          <div className="flex items-center border border-gray-300 rounded-2xl w-full px-4 py-2">
            <Mail className="w-5 text-gray-bg" />
            <input
              type="email"
              placeholder="Email"
              className="ml-3 py-2 px-2 w-full bg-transparent outline-none"
            />
          </div>
          <button className=" py-3 text-primary font-semibold">
            Resend Code
          </button>
          <button className="btn-primary text-white py-3 rounded-2xl w-full text-base font-semibold">
            Send Verification Code
          </button>
        </form>
      </section>
    </div>
  );
};

export default VerifyEmail;
