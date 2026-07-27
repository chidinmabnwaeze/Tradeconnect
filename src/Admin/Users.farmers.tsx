import { useState } from "react";
import { Funnel, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Avatar from "../components/Avatar";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";
import AddFarmerModal from "../components/AddFarmerModal";

interface Farmer {
  id: number;
  name: string;
  code: string;
  lga: string;
  listings: number;
  status: "Active" | "Pending" | "Inactive";
}

const farmers: Farmer[] = [
  { id: 1, name: "Musa Ibrahim", code: "FAR-01923", lga: "Kagarko", listings: 7, status: "Active" },
  { id: 2, name: "Aisha Yusuf", code: "FAR-01872", lga: "Kajuru", listings: 3, status: "Pending" },
  { id: 3, name: "Muhibba Musa", code: "FAR-02963", lga: "Kachia", listings: 8, status: "Inactive" },
  { id: 4, name: "Ahmmed Bayo", code: "FAR-01923", lga: "Jemaa", listings: 5, status: "Active" },
  { id: 5, name: "Musa Ibrahim", code: "FAR-01924", lga: "Kagarko", listings: 7, status: "Inactive" },
  { id: 6, name: "Fatima Bello", code: "FAR-01925", lga: "Lere", listings: 3, status: "Active" },
  { id: 7, name: "Yusuf Tanko", code: "FAR-01926", lga: "Zangon Kataf", listings: 7, status: "Pending" },
  { id: 8, name: "Habib Sani", code: "FAR-01927", lga: "Kagarko", listings: 11, status: "Active" },
  { id: 9, name: "Bilkisu Ahmed", code: "FAR-01928", lga: "Lere", listings: 9, status: "Active" },
  { id: 10, name: "Nura Aliyu", code: "FAR-01929", lga: "Kajuru", listings: 2, status: "Inactive" },
];

const PAGE_SIZE = 10;

export default function Users() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = farmers.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.code.toLowerCase().includes(search.toLowerCase()) ||
      f.lga.toLowerCase().includes(search.toLowerCase())
  );

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Layout breadcrumb="Users / Farmers" compact>
      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <input
            type="search"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search farmers..."
            className="w-[320px] rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none"
          />
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <Funnel className="h-4 w-4" />
              Filter
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
            >
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
              <th className="pb-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((farmer) => (
              <tr
                key={farmer.id}
                className="border-t border-slate-100 cursor-pointer hover:bg-slate-50 transition"
                onClick={() => navigate(`/users/${farmer.id}`)}
              >
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
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/users/${farmer.id}`); }}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          page={page}
          pageCount={pageCount}
          total={filtered.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>

      {showModal && <AddFarmerModal onClose={() => setShowModal(false)} />}
    </Layout>
  );
}
