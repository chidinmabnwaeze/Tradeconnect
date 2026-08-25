import { useEffect, useRef, useState } from "react";
import { Paperclip, Send , Plus } from "lucide-react";
import BuyerLayout from "../components/BuyerLayout";
import StatusBadge from "../components/StatusBadge";
import { useCart } from "./CartContext";
import type { Dispute } from "../lib/types/dispute";
import {
  getMyDispute,
  getMyDisputes,
  markMyDisputeRead,
  sendDisputeMessage,
} from "../lib/services/disputes.service";
import { getErrorMessage } from "../lib/getErrorMessage";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const formatTime = (value: string) =>
  new Date(value).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

export default function Disputes() {
  const { count } = useCart();
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selected, setSelected] = useState<Dispute | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const [draft, setDraft] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchDisputes = async () => {
      setLoading(true);
      try {
        const response = await getMyDisputes({ per_page: 100 });
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
        const response = await getMyDispute(selectedId);
        setSelected(response);
        if (response.is_unread) {
          await markMyDisputeRead(selectedId);
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

  const filtered = disputes.filter((d) =>
    `${d.subject} ${d.order.order_number}`.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachments((prev) => [...prev, ...Array.from(e.target.files ?? [])]);
    e.target.value = "";
  };

  const handleSend = async () => {
    if (!selectedId || (!draft.trim() && attachments.length === 0)) return;
    setSending(true);
    try {
      const message = await sendDisputeMessage(selectedId, draft.trim(), attachments);
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

  const handleCreateDispute = async ()=>{
    
  }

  const canReply = selected?.status !== "resolved" && selected?.status !== "closed";

  return (
    <BuyerLayout breadcrumb="Disputes / My Disputes" cartCount={count}>
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-primary">{error}</div>
      )}
      <div className="grid gap-6 pb-10 lg:grid-cols-[340px_1fr] h-full">
        <div className="rounded-4xl border border-slate-200 bg-white p-4 shadow-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search disputes..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none"
          />
            <button className={`flex w-full justify-center items-center gap-3 rounded-2xl p-2 mt-4 text-center text-white  bg-primary hover:bg-slate-50 hover:text-primary border border-primary`}> <Plus style={{}} 
            /> Create New Dispute </button>

          <div className="mt-4 space-y-1 ">
            {loading && <p className="p-3 text-sm text-slate-400">Loading disputes...</p>}
            {!loading && filtered.length === 0 && (
              <p className="p-3 text-sm text-center text-slate-400">No disputes yet.</p>
            )}
            {filtered.map((dispute) => (
              <button
                key={dispute.id}
                onClick={() => setSelectedId(dispute.id)}
                className={`flex w-full items-start gap-3 rounded-2xl p-3 text-left ${
                  dispute.id === selectedId ? "bg-global-bg" : "hover:bg-slate-50"
                }`}
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {dispute.order.order_number.replace(/^ORD-0*/, "")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {dispute.order.order_number}
                    </p>
                    <span className="shrink-0 text-xs text-slate-400">
                      {formatDate(dispute.created_at)}
                    </span>
                  </div>
                  <p className="truncate text-xs text-slate-500">{dispute.subject}</p>
                  {dispute.last_message && (
                    <p className="mt-1 truncate text-xs text-slate-400">
                      {dispute.last_message.message}
                    </p>
                  )}
                </div>
                {dispute.is_unread && (
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                )}
                <StatusBadge status={dispute.workflow_status} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
          {!selected && (
            <p className="m-auto text-sm text-slate-400">
              {detailLoading ? "Loading..." : "Select a dispute to view the conversation."}
            </p>
          )}

          {selected && (
            <>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="font-medium text-slate-900">{selected.order.order_number}</p>
                  <p className="text-xs text-slate-400">{selected.subject}</p>
                </div>
                <StatusBadge status={selected.workflow_status} />
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto py-6">
                {(selected.messages ?? []).map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-md rounded-2xl px-4 py-3 text-sm ${
                        message.sender.role === "user"
                          ? "bg-primary text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      <p>{message.message}</p>
                      {message.attachments?.map((att) => (
                        <p key={att.id} className="mt-1 text-xs underline opacity-80">
                          {att.original_name}
                        </p>
                      ))}
                      <p
                        className={`mt-1 text-xs ${
                          message.sender.role === "user" ? "text-white/70" : "text-slate-400"
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
    </BuyerLayout>
  );
}
