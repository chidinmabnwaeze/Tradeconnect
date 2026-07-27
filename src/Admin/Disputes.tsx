import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import Layout from "../components/Layout";
import Avatar from "../components/Avatar";

interface Message {
  from: "buyer" | "admin";
  text: string;
  time: string;
}

interface Dispute {
  name: string;
  code: string;
  location: string;
  preview: string;
  time: string;
  unread?: number;
  messages: Message[];
}

const disputes: Dispute[] = [
  {
    name: "Hauwa Makurdi",
    code: "BYR-01803",
    location: "Kaduna LGA",
    preview: "Hello Admin, I received my Onikoyo Thanks all of them are spoiled...",
    time: "Today",
    unread: 2,
    messages: [
      { from: "buyer", text: "Hello Admin, I received my Onikoyo Thanks but many of them were spoiled and damaged. The quality does not match what was shown in the listing.", time: "Today" },
      { from: "buyer", text: "I've attached 2 photos showing the spoiled tomatoes.", time: "Today" },
      { from: "admin", text: "Thank you for reporting this issue. Could you upload photos of the damaged produce for verification?", time: "9:51 AM" },
      { from: "buyer", text: "Photos.jpeg", time: "9:50 AM" },
      { from: "buyer", text: "Photos.jpeg", time: "9:50 AM" },
      { from: "admin", text: "Thank you. We've reviewed the evidence and contacted the seller. Your dispute is now under review. We'll get back to you within 24 hours.", time: "9:55 AM" },
    ],
  },
  {
    name: "Usman Dantata",
    code: "BYR-02211",
    location: "Kano LGA",
    preview: "Thank you, payment received.",
    time: "Yesterday",
    messages: [
      { from: "buyer", text: "Thank you, payment received.", time: "Yesterday" },
      { from: "admin", text: "You're welcome! Let us know if anything else comes up.", time: "Yesterday" },
    ],
  },
  {
    name: "Ahhmed Bayo",
    code: "BYR-03311",
    location: "Jemaa LGA",
    preview: "When will my listing be approved?",
    time: "Yesterday",
    messages: [
      { from: "buyer", text: "When will my listing be approved?", time: "Yesterday" },
      { from: "admin", text: "Your listing is in the review queue, it will be approved shortly.", time: "Yesterday" },
    ],
  },
  {
    name: "Hauwa Gerba",
    code: "BYR-04421",
    location: "Lere LGA",
    preview: "The buyer hasn't confirmed yet.",
    time: "2d",
    messages: [
      { from: "buyer", text: "The buyer hasn't confirmed yet.", time: "2d" },
      { from: "admin", text: "We'll follow up with the buyer and update you.", time: "2d" },
    ],
  },
  {
    name: "Fatima Lawal",
    code: "BYR-05521",
    location: "Zaria LGA",
    preview: "Order confirmed, preparing now.",
    time: "3d",
    messages: [
      { from: "buyer", text: "Order confirmed, preparing now.", time: "3d" },
    ],
  },
  {
    name: "Arafat Yasin",
    code: "BYR-06621",
    location: "Kachia LGA",
    preview: "New stock of okra available.",
    time: "4d",
    messages: [
      { from: "buyer", text: "New stock of okra available.", time: "4d" },
    ],
  },
  {
    name: "Muhibba Musa",
    code: "BYR-07721",
    location: "Kagarko LGA",
    preview: "Bank details have been updated.",
    time: "5d",
    messages: [
      { from: "buyer", text: "Bank details have been updated.", time: "5d" },
    ],
  },
];

export default function Disputes() {
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [draft, setDraft] = useState("");
  const selected = disputes[selectedIdx];

  return (
    <Layout breadcrumb="Disputes / Buyer" compact>
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="rounded-4xl border border-slate-200 bg-white p-4 shadow-sm">
          <input
            placeholder="Search disputes..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none"
          />

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${
                activeTab === "all"
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              All
              <span className="rounded-full bg-white/20 px-1.5 text-xs">
                {disputes.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("unread")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                activeTab === "unread"
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              Unread
            </button>
          </div>

          <div className="mt-4 space-y-1">
            {disputes
              .filter((d) => activeTab === "all" || d.unread)
              .map((dispute) => {
                const idx = disputes.indexOf(dispute);
                return (
                  <button
                    key={dispute.code}
                    onClick={() => setSelectedIdx(idx)}
                    className={`flex w-full items-start gap-3 rounded-2xl p-3 text-left ${
                      idx === selectedIdx ? "bg-global-bg" : "hover:bg-slate-50"
                    }`}
                  >
                    <Avatar name={dispute.name} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-slate-900">
                          {dispute.name}
                        </p>
                        <span className="shrink-0 text-xs text-slate-400">
                          {dispute.time}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {dispute.code} · {dispute.location}
                      </p>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {dispute.preview}
                      </p>
                    </div>
                    {dispute.unread && (
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
                        {dispute.unread}
                      </span>
                    )}
                  </button>
                );
              })}
          </div>
        </div>

        <div className="flex flex-col rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <Avatar name={selected.name} />
              <div>
                <p className="font-medium text-slate-900">{selected.name}</p>
                <p className="text-xs text-slate-400">
                  {selected.code} · {selected.location}
                </p>
              </div>
            </div>
            <button className="text-sm font-medium text-primary">View Order</button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto py-6">
            {selected.messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${
                  message.from === "admin" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md rounded-2xl px-4 py-3 text-sm ${
                    message.from === "admin"
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`mt-1 text-xs ${
                      message.from === "admin" ? "text-white/70" : "text-slate-400"
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
    </Layout>
  );
}
