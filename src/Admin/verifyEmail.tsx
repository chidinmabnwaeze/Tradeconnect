import { Mail } from "lucide-react";
import AuthLayout from "../components/AuthLayout";

const VerifyEmail = () => {
  return (
    <AuthLayout
      cardTitle="Verify Your Email"
      cardSubtitle="We'll send a verification code to your email."
    >
      <form className="space-y-4">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 focus-within:border-primary">
          <Mail className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            required
          />
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
          Send Verification Code
        </button>
      </form>
    </AuthLayout>
  );
};

export default VerifyEmail;
