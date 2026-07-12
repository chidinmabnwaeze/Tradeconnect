import { useState } from "react";
import { X, CheckCircle, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const primaryProduceOptions = [
  "Rice", "Cassava", "Maize", "Vegetables", "Palm Oil", "Yam",
];

const farmingMethods = ["Mixed Farming", "Subsistence", "Commercial", "Organic"];

interface AddFarmerModalProps {
  onClose: () => void;
}

export default function AddFarmerModal({ onClose }: AddFarmerModalProps) {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [selectedProduce, setSelectedProduce] = useState<string[]>([]);

  const toggleProduce = (item: string) => {
    setSelectedProduce((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]
    );
  };

  const handleSave = () => setConfirmed(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Add New Farmer</h2>
            <p className="text-sm text-slate-500">Fill in the details to register and add a new farmer</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

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
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">First Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Musa"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Last Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ibrahim"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+234 800 000 0000"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
              </div>
              {/* Photo */}
              <div className="flex flex-col items-center gap-2">
                <div className="h-20 w-20 rounded-2xl bg-global-bg flex items-center justify-center text-slate-300">
                  <Upload className="h-6 w-6" />
                </div>
                <button className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
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
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">State</label>
                  <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                    <option value="">Select state</option>
                    <option>Kaduna</option>
                    <option>Kano</option>
                    <option>Plateau</option>
                    <option>Niger</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">City / LGA</label>
                  <input
                    type="text"
                    placeholder="e.g. Kagarko"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Address</label>
                <textarea
                  rows={2}
                  placeholder="Enter full address"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
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
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Farm Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ibrahim Family Farm"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Farm Size (Hectares)</label>
                  <input
                    type="number"
                    placeholder="e.g. 4.5"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Farming Method</label>
                  <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                    <option value="">Select method</option>
                    {farmingMethods.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Years of Experience</label>
                  <input
                    type="number"
                    placeholder="e.g. 5"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Primary Produce</label>
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
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Farm Address</label>
                <textarea
                  rows={2}
                  placeholder="Enter farm address"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-100 bg-white px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Discard Changes
          </button>
          <button
            onClick={handleSave}
            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
          >
            Save Changes
          </button>
        </div>

        {/* Success confirmation overlay */}
        {confirmed && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/30">
            <div className="w-80 rounded-3xl bg-white p-8 shadow-2xl text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle className="h-9 w-9 text-emerald-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Farmer added successfully</h3>
              <p className="mt-1.5 text-sm text-slate-500">The farmer has been registered on TradeConnect.</p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => { setConfirmed(false); onClose(); }}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Add Another
                </button>
                <button
                  onClick={() => { onClose(); navigate("/users/1"); }}
                  className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
