import type { ReactNode } from "react";
import awning from "../assets/Awning.png";
import logo from "../assets/Logo.png";
import whiteLogo from "../assets/TradeConnnect1-04.png";

interface AuthLayoutProps {
  cardTitle: string;
  cardSubtitle?: ReactNode;
  children: ReactNode;
}

export default function AuthLayout({
  cardTitle,
  cardSubtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-global-bg md:flex-row">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-primary px-12 py-12 text-white md:flex md:w-1/2">
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold">TradeConnect</p>
          <img src={whiteLogo} alt="TradeConnect" className="h-8 w-auto" />
        </div>

        <div>
          <div className="mb-6 h-0.5 w-10 bg-dash-brown" />
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-dash-brown">
            ADMIN CONSOLE
          </p>
          <h1 className="max-w-md text-4xl font-bold leading-tight">
            Every stall, trade and payout — in one place.
          </h1>
          <p className="mt-4 max-w-sm text-white/80">
            Manage vendors, approve listings and keep TradeConnect operations
            running smoothly.
          </p>
        </div>

        <p className="text-xs text-white/60">
          © {new Date().getFullYear()} TradeConnect
        </p>
      </section>

      <section className="flex flex-1 flex-col justify-between px-4 py-10 sm:px-8 md:px-16">
        <div className="mx-auto flex w-full max-w-md flex-6 flex-col justify-center">
          {/* Stall wrapper */}
          <div className="relative w-full pt-24">
            {/* Awning */}
            <img
              src={awning}
              alt="stall umbrella"
              className="
          absolute
          top-0
          left-1/2
          z-10
          w-[125%]
          max-w-none
          -translate-x-1/2
        "
            />

            {/* Form card */}
            <div className="relative z-0 rounded-3xl rounded-t border-2 border-primary bg-white px-6 py-8 shadow-xl sm:px-10 sm:py-10">
              <img
                src={logo}
                alt="TradeConnect"
                className="mx-auto h-24 w-auto object-contain"
              />

              <div className="mt-2 text-center">
                <h2 className="text-2xl font-bold text-slate-900">
                  {cardTitle}
                </h2>

                {cardSubtitle && (
                  <p className="mt-1 text-sm text-slate-500">{cardSubtitle}</p>
                )}
              </div>

              <div className="mt-6 space-y-4">{children}</div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400 md:text-right">
          Privacy · Terms · Support
        </p>
      </section>
    </div>
  );
}
