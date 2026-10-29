import { useState } from "react";
import { calculateDeliveryFee } from "../lib/delivery";
import { formatNaira } from "../lib/format";
import { UNIT_OPTIONS, formatQty, isPresetUnit, unitLabel } from "../lib/units";

const inputClass =
  "border border-[#4A7C2A]/30 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C2A]";

const OTHER = "__other__";

export function UnitSelect({
  unit,
  onChange,
}: {
  unit: string;
  onChange: (unit: string) => void;
}) {
  // Custom units (anything not in UNIT_OPTIONS) switch the field to free text.
  const [custom, setCustom] = useState(unit !== "" && !isPresetUnit(unit));

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-medium">Unit of measurement</label>
      <select
        className={inputClass}
        value={custom ? OTHER : unit}
        onChange={(e) => {
          if (e.target.value === OTHER) {
            setCustom(true);
            onChange("");
          } else {
            setCustom(false);
            onChange(e.target.value);
          }
        }}
      >
        <option value="" disabled>
          Select unit
        </option>
        {UNIT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        <option value={OTHER}>Other</option>
      </select>
      {custom && (
        <input
          type="text"
          maxLength={50}
          placeholder="e.g. sack, carton, mudu"
          className={inputClass}
          value={unit}
          onChange={(e) => onChange(e.target.value.toLowerCase())}
        />
      )}
    </div>
  );
}

function NairaInput({
  label,
  hint,
  suffix,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  hint: string;
  suffix?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-medium">{label}</label>
      <div className="flex items-center border border-[#4A7C2A]/30 rounded-md focus-within:ring-2 focus-within:ring-[#4A7C2A]">
        <span className="p-2.5 border-r border-gray-300 bg-global-bg text-sm text-gray-400">
          N
        </span>
        <input
          type="number"
          min={0}
          placeholder={placeholder}
          className="w-full py-2 px-3 focus:outline-none rounded-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {suffix && (
          <span className="p-2.5 border-l border-gray-300 bg-global-bg text-sm text-gray-400 whitespace-nowrap">
            {suffix}
          </span>
        )}
      </div>
      <p className="text-gray-400 text-sm">{hint}</p>
    </div>
  );
}

const PREVIEW_QUANTITIES = [1, 5, 10, 20];

export function DeliveryPricingFields({
  unit,
  baseFee,
  perUnitFee,
  cap,
  onBaseFeeChange,
  onPerUnitFeeChange,
  onCapChange,
}: {
  unit: string;
  baseFee: string;
  perUnitFee: string;
  cap: string;
  onBaseFeeChange: (value: string) => void;
  onPerUnitFeeChange: (value: string) => void;
  onCapChange: (value: string) => void;
}) {
  const one = unitLabel(unit);
  const pricing = {
    delivery_base_fee: baseFee,
    delivery_fee_per_unit: perUnitFee,
    delivery_fee_cap: cap,
  };

  return (
    <section className="bg-white p-6 rounded-lg mt-6">
      <div className="flex flex-col gap-1 border-b border-gray-200 pb-4 mb-4">
        <h1 className="text-xl font-bold">Delivery Pricing</h1>
        <p className="text-gray-400 font-medium">
          The first {one} covers the trip, each extra {one} adds a smaller fee,
          and the total never goes above the maximum.
        </p>
      </div>
      <div className="flex justify-between gap-2 mb-4">
        <NairaInput
          label={`Fee for the first ${one}`}
          hint={`Leave blank to charge the same fee for every ${one}.`}
          placeholder="e.g. 2000"
          value={baseFee}
          onChange={onBaseFeeChange}
        />
        {/* Without a first-unit fee this is charged for every unit. */}
        <NairaInput
          label={
            baseFee === "" ? `Fee per ${one}` : `Fee per additional ${one}`
          }
          hint={
            baseFee === ""
              ? `Charged for every ${one} ordered.`
              : `Added for each ${one} after the first.`
          }
          suffix={`/${one}`}
          placeholder="e.g. 200"
          value={perUnitFee}
          onChange={onPerUnitFeeChange}
        />
      </div>
      <div className="flex flex-col gap-2 mb-4 w-1/2 pr-1">
        <NairaInput
          label="Maximum delivery fee (optional)"
          hint="The most a buyer pays for delivery on this listing, however much they order."
          placeholder="e.g. 5000"
          value={cap}
          onChange={onCapChange}
        />
      </div>
      {perUnitFee !== "" && (
        <div className="rounded-md bg-global-bg p-3 text-sm">
          <p className="font-medium mb-1">What buyers will pay for delivery</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-gray-600">
            {PREVIEW_QUANTITIES.map((qty) => (
              <span key={qty}>
                {formatQty(qty, unit)}:{" "}
                <span className="font-semibold text-slate-900">
                  {formatNaira(calculateDeliveryFee(pricing, qty) ?? 0)}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
