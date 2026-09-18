import { useEffect, useState } from "react";
import { Eye, Funnel } from "lucide-react";
import Layout from "../components/Layout";
import Avatar from "../components/Avatar";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";
import { getBuyers } from "../lib/services/buyers.service";
import { getErrorMessage } from "../lib/getErrorMessage";
import { type Buyer } from "../lib/types/buyer";

const PAGE_SIZE = 10;

export default function Buyers() {
  const [page, setPage] = useState(1);
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(false);

  const pageCount = Math.ceil(buyers.length / PAGE_SIZE) || 1;

  useEffect(() => {
    const fetchBuyers = async () => {
      setLoading(true);
      try {
        const response = await getBuyers({ page, per_page: PAGE_SIZE });
        console.log("Buyers response:", response);
        setBuyers(response.data);
        console.log("Buyers data:", response.data);
      } catch (error) {
        getErrorMessage(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBuyers();
  }, [page]);

  return (
    <Layout breadcrumb="Users / Buyers" compact>
      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="search"
            placeholder="Search buyers..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none sm:w-80"
          />
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Funnel className="h-4 w-4" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
        <table className="w-full min-w-150 text-left text-sm">
          <thead>
            <tr className="text-slate-500">
              <th className="pb-3 font-medium">Buyer</th>
              <th className="pb-3 font-medium">Location</th>
              <th className="pb-3 font-medium">Orders</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="py-26 m-auto">
                  <div className="flex justify-center items-center">
                    <div className="loader"></div>
                  </div>
                </td>
              </tr>
            )}

            {buyers.map((buyer, idx) => (
              <tr key={idx} className="border-t border-slate-100">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={buyer.name} />
                    <div>
                      <p className="font-medium text-slate-900">{buyer.name}</p>
                      <p className="text-xs text-slate-400">{buyer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-slate-600">{buyer.address}</td>
                <td className="py-3 text-slate-600">{buyer.orders_count}</td>
                <td className="py-3">
                  <StatusBadge status={buyer.status} />
                </td>
                <td className="py-3">
                  <button className="rounded-md border border-slate-200 p-2 text-slate-500 hover:bg-slate-50">
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        <Pagination
          page={page}
          pageCount={pageCount}
          total={buyers.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>
    </Layout>
  );
}
