import { useState } from "react";
import { Eye, Funnel } from "lucide-react";
import Layout from "../components/Layout";
import Avatar from "../components/Avatar";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";

interface Buyer {
  name: string;
  code: string;
  location: string;
  orders: number;
  status: "Active" | "Inactive";
}

const buyers: Buyer[] = [
  { name: "Adekunle Okafor", code: "BYR-07820", location: "Kaduna", orders: 14, status: "Active" },
  { name: "Hauwa Makurdi", code: "BYR-07820", location: "Kano", orders: 8, status: "Active" },
  { name: "Ibrahim Yusuf", code: "BYR-07820", location: "Zaria", orders: 22, status: "Inactive" },
  { name: "Fatima Idris", code: "BYR-07820", location: "Katsina", orders: 3, status: "Active" },
  { name: "Musa Lawal", code: "BYR-07820", location: "Rivers", orders: 0, status: "Inactive" },
  { name: "Aisha Bello", code: "BYR-07820", location: "Edo", orders: 31, status: "Active" },
  { name: "Umar Daniyawa", code: "BYR-07820", location: "Zamfara", orders: 2, status: "Active" },
  { name: "Musa Ibrahim", code: "BYR-07820", location: "Yobe", orders: 2, status: "Active" },
  { name: "Musa Ibrahim", code: "BYR-07820", location: "Lagos", orders: 12, status: "Active" },
  { name: "Musa Ibrahim", code: "BYR-07820", location: "Enugu", orders: 30, status: "Inactive" },
];

const PAGE_SIZE = 10;

export default function Buyers() {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(buyers.length / PAGE_SIZE) || 1;

  return (
    <Layout breadcrumb="Users / Buyers" compact>
      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <input
            type="search"
            placeholder="Search buyers..."
            className="w-[320px] rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none"
          />
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Funnel className="h-4 w-4" />
            Filter
          </button>
        </div>

        <table className="w-full text-left text-sm">
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
            {buyers.map((buyer, idx) => (
              <tr key={idx} className="border-t border-slate-100">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={buyer.name} />
                    <div>
                      <p className="font-medium text-slate-900">{buyer.name}</p>
                      <p className="text-xs text-slate-400">{buyer.code}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-slate-600">{buyer.location}</td>
                <td className="py-3 text-slate-600">{buyer.orders}</td>
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
