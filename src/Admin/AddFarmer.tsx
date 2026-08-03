import { useState } from "react";
import { ArrowLeft, CheckCircle, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import type { FarmerPayload, FarmerStatus } from "../lib/types/farmer";
import { getErrorMessage } from "../lib/getErrorMessage";
import { createFarmer } from "../lib/services/farmers.service";
import { lgasByState, nigerianStates } from "../lib/data/nigeria-lgas";

const primaryProduceOptions = ["Rice", "Cassava", "Maize", "Vegetables", "Palm Oil", "Yam"];
const farmingMethods = ["Mixed Farming", "Subsistence", "Commercial", "Organic"];

const emptyPayload: FarmerPayload = {
  name: "",
  state: "",
  lga: "",
  status: "active",
  phone_number: "",
};

export default function AddFarmer() {
  const navigate = useNavigate();

  // Fields actually sent to the API
  const [payload, setPayload] = useState<FarmerPayload>(emptyPayload);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Cosmetic-only fields — the /admin/farmers API doesn't accept or store
  // these yet, so they stay local until the backend supports them.
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [farmName, setFarmName] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [farmingMethod, setFarmingMethod] = useState("");
  const [experience, setExperience] = useState("");
  const [farmAddress, setFarmAddress] = useState("");
  const [selectedProduce, setSelectedProduce] = useState<string[]>([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [createdFarmerId, setCreatedFarmerId] = useState<number | null>(null);

  const toggleProduce = (item: string) => {
    setSelectedProduce((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item],
    );
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFirstName(value);
    setPayload((prev) => ({ ...prev, name: `${value} ${lastName}`.trim() }));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLastName(value);
    setPayload((prev) => ({ ...prev, name: `${firstName} ${value}`.trim() }));
  };

  const handlePayloadChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setPayload((prev) => ({ ...prev, state: value, lga: "" }));
  };

  const resetForm = () => {
    setPayload(emptyPayload);
    setFirstName("");
    setLastName("");
    setEmail("");
    setAddress("");
    setFarmName("");
    setFarmSize("");
    setFarmingMethod("");
    setExperience("");
    setFarmAddress("");
    setSelectedProduce([]);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter the farmer's first and last name");
      return;
    }
    if (!payload.state) {
      setError("Please select a state");
      return;
    }
    if (!payload.lga) {
      setError("Please select a city/LGA");
      return;
    }
    if (!payload.phone_number.trim()) {
      setError("Please enter a phone number");
      return;
    }

    setLoading(true);
    try {
      const created = await createFarmer(payload);
      setCreatedFarmerId(created.id);
      setConfirmed(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout breadcrumb="Users / Farmers / Add Farmer" compact>
      <button
        onClick={() => navigate("/users")}
        className="mb-4 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Farmers
      </button>

      <form
        onSubmit={handleSubmit}
        className="relative rounded-3xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">Add New Farmer</h2>
          <p className="text-sm text-slate-500">
            Fill in the details to register and add a new farmer
          </p>
        </div>

        {error && (
          <div className="mx-6 mt-6 rounded-lg bg-red-50 p-3 text-sm text-primary">
            {error}
          </div>
        )}

        <div className="space-y-8 px-6 py-6">
          {/* Personal Information */}
          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">
              Personal Information
            </h3>
            <div className="flex gap-6">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="e.g. Musa"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      value={firstName}
                      onChange={handleFirstNameChange}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      placeholder="e.g. Ibrahim"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      value={lastName}
                      onChange={handleLastNameChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div> */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Phone Number
                    </label>
                    <input
                      name="phone_number"
                      type="tel"
                      placeholder="+234 800 000 0000"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      value={payload.phone_number}
                      onChange={handlePayloadChange}
                    />
                  </div>
                </div>
              </div>
              {/* Photo */}
              <div className="flex flex-col items-center gap-2">
                <div className="h-20 w-20 rounded-2xl bg-global-bg flex items-center justify-center text-slate-300">
                  <Upload className="h-6 w-6" />
                </div>
                <button
                  type="button"
                  className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Change Photo
                </button>
              </div>
            </div>
          </section>

          {/* Location Information */}
          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">
              Location Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    State
                  </label>
                  <select
                    name="state"
                    value={payload.state}
                    onChange={handleStateChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">Select state</option>
                    {nigerianStates.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    City / LGA
                  </label>
                  <select
                    name="lga"
                    value={payload.lga}
                    onChange={handlePayloadChange}
                    disabled={!payload.state}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
                  >
                    <option value="">
                      {payload.state ? "Select LGA" : "Select a state first"}
                    </option>
                    {(lgasByState[payload.state] ?? []).map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Address
                </label>
                <textarea
                  rows={2}
                  placeholder="Enter full address"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div> */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status
                </label>
                <div className="flex gap-2">
                  {(["active", "inactive"] as FarmerStatus[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setPayload((prev) => ({ ...prev, status: s }))}
                      className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${
                        payload.status === s
                          ? "bg-primary text-white"
                          : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Farm Information */}
          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">
              Farm Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Farm Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ibrahim Family Farm"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Farm Size (Hectares)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 4.5"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    value={farmSize}
                    onChange={(e) => setFarmSize(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Farming Method
                  </label>
                  <select
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    value={farmingMethod}
                    onChange={(e) => setFarmingMethod(e.target.value)}
                  >
                    <option value="">Select method</option>
                    {farmingMethods.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 5"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Primary Produce
                </label>
                <div className="flex flex-wrap gap-2">
                  {primaryProduceOptions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleProduce(item)}
                      className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                        selectedProduce.includes(item)
                          ? "bg-primary text-white"
                          : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Farm Address
                </label>
                <textarea
                  rows={2}
                  placeholder="Enter farm address"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  value={farmAddress}
                  onChange={(e) => setFarmAddress(e.target.value)}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Discard Changes
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Success confirmation overlay */}
        {confirmed && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/30">
            <div className="w-80 rounded-3xl bg-white p-8 shadow-2xl text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle className="h-9 w-9 text-emerald-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Farmer added successfully
              </h3>
              <p className="mt-1.5 text-sm text-slate-500">
                The farmer has been registered on TradeConnect.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setConfirmed(false);
                    resetForm();
                  }}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Add Another
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/users/${createdFarmerId}`)}
                  className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </Layout>
  );
}
