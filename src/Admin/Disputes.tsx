import { useEffect, useRef, useState } from "react";
import { ArrowLeft, CheckCircle2, Paperclip, Send, XCircle } from "lucide-react";
import Layout from "../components/Layout";
import Avatar from "../components/Avatar";
import StatusBadge from "../components/StatusBadge";
import type { Dispute } from "../lib/types/dispute";
import {
  getAllDisputes,
  getDispute,
  markAdminDisputeRead,
  replyToDispute,
  updateDisputeStatus,
} from "../lib/services/disputes.service";
import { getErrorMessage } from "../lib/getErrorMessage";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const formatTime = (value: string) =>
  new Date(value).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

export default function Disputes() {
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [search, setSearch] = useState("");

  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  // Mobile-only: which pane is visible — list of disputes, or the open chat.
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [selected, setSelected] = useState<Dispute | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const [draft, setDraft] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchDisputes = async () => {
      setLoading(true);
      try {
        const response = await getAllDisputes({ per_page: 100 });
        setDisputes(response.data);
        if (response.data.length > 0) {
          setSelectedId(response.data[0].id);
        }
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchDisputes();
  }, []);

  useEffect(() => {
    if (selectedId === null) {
      setSelected(null);
      return;
    }
    const fetchDetail = async () => {
      setDetailLoading(true);
      try {
        const response = await getDispute(selectedId);
        setSelected(response);
        if (response.is_unread) {
          await markAdminDisputeRead(selectedId);
          setDisputes((prev) =>
            prev.map((d) => (d.id === selectedId ? { ...d, is_unread: false, unread_count: 0 } : d)),
          );
        }
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setDetailLoading(false);
      }
    };
    fetchDetail();
  }, [selectedId]);

  const filtered = disputes
    .filter((d) => activeTab === "all" || d.is_unread)
    .filter((d) =>
      `${d.buyer.name} ${d.subject} ${d.order.order_number}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

  const handleAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachments((prev) => [...prev, ...Array.from(e.target.files ?? [])]);
    e.target.value = "";
  };

  const handleSend = async () => {
    if (!selectedId || (!draft.trim() && attachments.length === 0)) return;
    setSending(true);
    try {
      const message = await replyToDispute(selectedId, draft.trim(), attachments);
      setSelected((prev) =>
        prev ? { ...prev, messages: [...(prev.messages ?? []), message] } : prev,
      );
      setDraft("");
      setAttachments([]);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSending(false);
    }
  };

  const handleResolve = async (status: "resolved" | "closed") => {
    if (!selectedId) return;
    setUpdatingStatus(true);
    try {
      const updated = await updateDisputeStatus(selectedId, status);
      setSelected(updated);
      setDisputes((prev) => prev.map((d) => (d.id === selectedId ? updated : d)));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setUpdatingStatus(false);
    }
  };

  const canReply = selected?.status !== "resolved" && selected?.status !== "closed";

  return (
    <Layout breadcrumb="Disputes / Buyer" compact>
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-primary">{error}</div>
      )}
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div
          className={`rounded-4xl border border-slate-200 bg-white p-4 shadow-sm ${
            mobileView === "chat" ? "hidden lg:block" : ""
          }`}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            {loading && <p className="p-3 text-sm text-slate-400">Loading disputes...</p>}
            {!loading && filtered.length === 0 && (
              <p className="p-3 text-sm text-slate-400">No disputes found.</p>
            )}
            {filtered.map((dispute) => (
              <button
                key={dispute.id}
                onClick={() => {
                  setSelectedId(dispute.id);
                  setMobileView("chat");
                }}
                className={`flex w-full items-start gap-3 rounded-2xl p-3 text-left ${
                  dispute.id === selectedId ? "bg-global-bg" : "hover:bg-slate-50"
                }`}
              >
                <Avatar name={dispute.buyer.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {dispute.buyer.name}
                    </p>
                    <span className="shrink-0 text-xs text-slate-400">
                      {formatDate(dispute.created_at)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {dispute.order.order_number} · {dispute.subject}
                  </p>
                  {dispute.last_message && (
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {dispute.last_message.body}
                    </p>
                  )}
                </div>
                {dispute.unread_count > 0 && (
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
                    {dispute.unread_count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`flex-col rounded-4xl border border-slate-200 bg-white p-6 shadow-sm ${
            mobileView === "list" ? "hidden lg:flex" : "flex"
          }`}
        >
          {!selected && (
            <p className="m-auto text-sm text-slate-400">
              {detailLoading ? "Loading..." : "Select a dispute to view the conversation."}
            </p>
          )}

          {selected && (
            <>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileView("list")}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 lg:hidden"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <Avatar name={selected.buyer.name} />
                  <div>
                    <p className="font-medium text-slate-900">{selected.buyer.name}</p>
                    <p className="text-xs text-slate-400">
                      {selected.order.order_number} · {selected.subject}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={selected.workflow_status} />
                  {canReply && (
                    <>
                      <button
                        onClick={() => handleResolve("resolved")}
                        disabled={updatingStatus}
                        className="flex items-center gap-1.5 rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-50 disabled:opacity-60"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Mark as Resolved
                      </button>
                      <button
                        onClick={() => handleResolve("closed")}
                        disabled={updatingStatus}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        Close
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto py-6">
                {(selected.messages ?? []).map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender.role === "admin" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-md rounded-2xl px-4 py-3 text-sm ${
                        message.sender.role === "admin"
                          ? "bg-primary text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      <p>{message.body}</p>
                      {message.attachments?.map((att) => (
                        <p key={att.id} className="mt-1 text-xs underline opacity-80">
                          {att.original_name}
                        </p>
                      ))}
                      <p
                        className={`mt-1 text-xs ${
                          message.sender.role === "admin" ? "text-white/70" : "text-slate-400"
                        }`}
                      >
                        {formatTime(message.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {canReply ? (
                <div className="border-t border-slate-100 pt-4">
                  {attachments.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-2">
                      {attachments.map((file, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                        >
                          {file.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      onChange={handleAttach}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
                    >
                      <Paperclip className="h-4 w-4" />
                    </button>
                    <input
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none"
                    />
                    <button
                      onClick={handleSend}
                      disabled={sending}
                      className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60"
                    >
                      {sending ? "Sending..." : "Send"}
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <p className="border-t border-slate-100 pt-4 text-center text-xs text-slate-400">
                  This dispute is {selected.status} — no further messages can be sent.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
