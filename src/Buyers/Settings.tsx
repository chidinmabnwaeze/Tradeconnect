import { useState } from "react";
import BuyerLayout from "../components/BuyerLayout";
import Avatar from "../components/Avatar";
import { useCart } from "./CartContext";

export default function Settings() {
  const { count } = useCart();
  const [profile, setProfile] = useState({
    fullName: "Joy Smith",
    email: "joysmith@gmail.com",
    phone: "+234 803 234 5678",
    address: "12 Wuse Zone 4, Abuja, FCT",
  });
  const [password, setPassword] = useState({ current: "", next: "" });

  const updateProfile = (field: keyof typeof profile) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));

  const updatePassword = (field: keyof typeof password) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <BuyerLayout breadcrumb="Settings / Buyer" cartCount={count}>
      <div className="flex flex-col gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Profile &amp; Account</h2>
          <p className="mt-1 text-sm text-slate-500">Manage your profile and account information.</p>

          <div className="mt-5 flex items-center gap-4">
            <Avatar name={profile.fullName} size="lg" />
            <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Change Photo
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div> 
              <label className="mb-1.5 block text-xs font-medium text-slate-500">Full Name</label>
              <input
                value={profile.fullName}
                onChange={updateProfile("fullName")}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500">Buyer ID</label>
              <input
                value="BYR-01203"
                disabled
                className="w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm text-slate-400"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500">Email Address</label>
              <input
                value={profile.email}
                onChange={updateProfile("email")}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500">Phone Number</label>
              <input
                value={profile.phone}
                onChange={updateProfile("phone")}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-slate-500">Address</label>
              <input
                value={profile.address}
                onChange={updateProfile("address")}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Change Password</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500">Password</label>
              <input
                type="password"
                value={password.current}
                onChange={updatePassword("current")}
                placeholder="Current password"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500">New Password</label>
              <input
                type="password"
                value={password.next}
                onChange={updatePassword("next")}
                placeholder="New password"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Discard Changes
          </button>
          <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90">
            Save Changes
          </button>
        </div>
      </div>
    </BuyerLayout>
  );
}
