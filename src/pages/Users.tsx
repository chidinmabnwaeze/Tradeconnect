import { useState } from "react";
import { Funnel, Plus, SquarePen } from "lucide-react";
import Layout from "../components/Layout";
import Avatar from "../components/Avatar";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";

interface Farmer {
  name: string;
  code: string;
  lga: string;
  listings: number;
  status: "Active" | "Pending" | "Inactive";
}

const farmers: Farmer[] = [
  { name: "Musa Ibrahim", code: "FAR-01923", lga: "Kagarko", listings: 7, status: "Active" },
  { name: "Aisha Yusuf", code: "FAR-01872", lga: "Kajuru", listings: 3, status: "Pending" },
  { name: "Muhibba Musa", code: "FAR-02963", lga: "Kachia", listings: 8, status: "Inactive" },
  { name: "Ahmmed Bayo", code: "FAR-01923", lga: "Jemaa", listings: 5, status: "Active" },
  { name: "Musa Ibrahim", code: "FAR-01923", lga: "Kagarko", listings: 7, status: "Inactive" },
  { name: "Musa Ibrahim", code: "FAR-01923", lga: "Lere", listings: 3, status: "Active" },
  { name: "Musa Ibrahim", code: "FAR-01923", lga: "Zangon Kataf", listings: 7, status: "Pending" },
  { name: "Musa Ibrahim", code: "FAR-01923", lga: "Kagarko", listings: 11, status: "Active" },
  { name: "Musa Ibrahim", code: "FAR-01923", lga: "Lere", listings: 9, status: "Active" },
  { name: "Musa Ibrahim", code: "FAR-01923", lga: "Kajuru", listings: 2, status: "Inactive" },
];

const PAGE_SIZE = 10;

export default function Users() {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(farmers.length / PAGE_SIZE) || 1;

  return (
    <Layout breadcrumb="Users / Farmers" compact>
      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <input
            type="search"
            placeholder="Search farmers..."
            className="w-[320px] rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none"
          />
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <Funnel className="h-4 w-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-primary px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5">
              <Plus className="h-4 w-4" />
              Add Farmer
            </button>
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-500">
              <th className="pb-3 font-medium">Farmer</th>
              <th className="pb-3 font-medium">LGA</th>
              <th className="pb-3 font-medium">Listings</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map((farmer, idx) => (
              <tr key={idx} className="border-t border-slate-100">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={farmer.name} />
                    <div>
                      <p className="font-medium text-slate-900">{farmer.name}</p>
                      <p className="text-xs text-slate-400">{farmer.code}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-slate-600">{farmer.lga}</td>
                <td className="py-3 text-slate-600">{farmer.listings} listings</td>
                <td className="py-3">
                  <StatusBadge status={farmer.status} />
                </td>
                <td className="py-3">
                  <button className="rounded-md border border-slate-200 p-2 text-slate-500 hover:bg-slate-50">
                    <SquarePen className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          page={page}
          pageCount={pageCount}
          total={farmers.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>
    </Layout>
  );
}
