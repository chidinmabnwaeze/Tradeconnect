import React from "react";
import logoCover from "../assets/logo-cover.png";

const VerifyOtp = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold">Verify Your OTP</h1>
            <p className="text-gray-600 font-medium mt-2">
              Please enter the verification code sent to your email.
            </p>
          </div>

          <div className="flex w-full justify-center items-center gap-4">
            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-xl"
            />
             <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-xl"
            />
             <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-xl"
            />
             <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-xl"
            />
             <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-xl"
            />
             <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-xl"
            />
          </div>
          <button className=" py-3 text-primary font-semibold">
            Resend Code
          </button>
          <button className="btn-primary text-white py-3 rounded-2xl w-full text-base font-semibold">
            Verify Code
          </button>
        </form>
      </section>
    </div>
  );
};

export default VerifyOtp;
