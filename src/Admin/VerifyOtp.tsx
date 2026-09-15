import AuthLayout from "../components/AuthLayout";

const OTP_LENGTH = 6;

const VerifyOtp = () => {
  return (
    <AuthLayout
      cardTitle="Verify Your OTP"
      cardSubtitle="Please enter the verification code sent to your email."
    >
      <form className="space-y-4">
        <div className="flex w-full justify-between gap-2">
          {Array.from({ length: OTP_LENGTH }).map((_, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="h-12 w-full rounded-xl border border-slate-200 text-center text-lg font-semibold outline-none focus:border-primary"
            />
          ))}
        </div>

        <button
          type="button"
          className="w-full py-1 text-sm font-semibold text-primary"
        >
          Resend Code
        </button>

        <button
          type="submit"
          className="btn-primary w-full rounded-2xl py-3 text-base font-semibold"
        >
          Verify Code
        </button>
      </form>
    </AuthLayout>
  );
};

export default VerifyOtp;
