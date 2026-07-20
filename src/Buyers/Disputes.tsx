import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import BuyerLayout from "../components/BuyerLayout";
import { useCart } from "./CartContext";

interface Message {
  from: "buyer" | "admin";
  text: string;
  time: string;
}

interface Dispute {
  orderId: string;
  subject: string;
  preview: string;
  time: string;
  status: "Open" | "Resolved";
  messages: Message[];
}

const disputes: Dispute[] = [
  {
    orderId: "#ORD-1285",
    subject: "Spoiled tomatoes received",
    preview: "Hello Admin, I received my order but many of them were spoiled...",
    time: "Today",
    status: "Open",
    messages: [
      { from: "buyer", text: "Hello Admin, I received my order but many of them were spoiled and damaged. The quality does not match what was shown in the listing.", time: "9:48 AM" },
      { from: "buyer", text: "I've attached 2 photos showing the spoiled tomatoes.", time: "9:50 AM" },
      { from: "admin", text: "Thank you for reporting this. Could you confirm which items were affected and the quantity?", time: "9:51 AM" },
      { from: "buyer", text: "It was the full 5kg of tomatoes, ordered under #ORD-1285.", time: "9:53 AM" },
      { from: "admin", text: "Thank you. We've reviewed the evidence and contacted the seller. Your dispute is now under review, we'll get back to you within 24 hours.", time: "9:55 AM" },
    ],
  },
  {
    orderId: "#ORD-1199",
    subject: "Refund not received",
    preview: "It's been 5 days since the order was cancelled and I still haven't...",
    time: "Yesterday",
    status: "Open",
    messages: [
      { from: "buyer", text: "It's been 5 days since the order was cancelled and I still haven't received my refund.", time: "Yesterday" },
      { from: "admin", text: "Apologies for the delay, we're escalating this with our payments team and will update you shortly.", time: "Yesterday" },
    ],
  },
  {
    orderId: "#ORD-1160",
    subject: "Wrong quantity delivered",
    preview: "I ordered 10kg of rice but only received 6kg.",
    time: "3d",
    status: "Resolved",
    messages: [
      { from: "buyer", text: "I ordered 10kg of rice but only received 6kg.", time: "3d" },
      { from: "admin", text: "We've confirmed the shortfall with the farmer and processed a partial refund for the missing 4kg.", time: "3d" },
      { from: "buyer", text: "Thank you, refund received.", time: "2d" },
    ],
  },
];

export default function Disputes() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [draft, setDraft] = useState("");
  const { count } = useCart();
  const selected = disputes[selectedIdx];

  return (
    <BuyerLayout breadcrumb="Disputes / My Disputes" cartCount={count}>
      <div className="grid gap-6 pb-10 lg:grid-cols-[340px_1fr]">
        <div className="rounded-4xl border border-slate-200 bg-white p-4 shadow-sm">
          <input
            placeholder="Search disputes..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none"
          />

          <div className="mt-4 space-y-1">
            {disputes.map((dispute, idx) => (
              <button
                key={dispute.orderId}
                onClick={() => setSelectedIdx(idx)}
                className={`flex w-full items-start gap-3 rounded-2xl p-3 text-left ${
                  idx === selectedIdx ? "bg-global-bg" : "hover:bg-slate-50"
                }`}
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {dispute.orderId.replace("#ORD-", "")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {dispute.orderId}
                    </p>
                    <span className="shrink-0 text-xs text-slate-400">{dispute.time}</span>
                  </div>
                  <p className="truncate text-xs text-slate-500">{dispute.subject}</p>
                  <p className="mt-1 truncate text-xs text-slate-400">{dispute.preview}</p>
                </div>
                <span
                  className={`mt-1 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    dispute.status === "Open"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {dispute.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p className="font-medium text-slate-900">{selected.orderId}</p>
              <p className="text-xs text-slate-400">{selected.subject}</p>
            </div>
            <button className="text-sm font-medium text-primary">View Order</button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto py-6">
            {selected.messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${message.from === "buyer" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md rounded-2xl px-4 py-3 text-sm ${
                    message.from === "buyer"
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`mt-1 text-xs ${
                      message.from === "buyer" ? "text-white/70" : "text-slate-400"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50">
              <Paperclip className="h-4 w-4" />
            </button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none"
            />
            <button
              onClick={() => setDraft("")}
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
            >
              Send
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
}
