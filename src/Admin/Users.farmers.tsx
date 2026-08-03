import { useEffect, useState } from "react";
import { Funnel, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Avatar from "../components/Avatar";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";
import { type Farmer } from "../lib/types/farmer";
import { getFarmers } from "../lib/services/farmers.service";

const PAGE_SIZE = 10;

export default function Users() {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState<Farmer[]>();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const filtered = farmers?.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.lga.toLowerCase().includes(search.toLowerCase()),
  );

  const pageCount = Math.ceil(filtered?.length ?? 0 / PAGE_SIZE) || 1;
  const paginated = filtered?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    const fetchFarmers = async () => {
      setLoading(true);
      const response = await getFarmers();
      setFarmers(response);
      setLoading(false);
    };
    fetchFarmers();
  }, []);

  return (
    <Layout breadcrumb="Users / Farmers" compact>
      <div className="rounded-4xl border h-full border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search farmers..."
            className="w-[320px] rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none"
          />
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <Funnel className="h-4 w-4" />
              Filter
            </button>
            <button
              onClick={() => navigate("/users/add")}
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
             {loading && <div className="loader flex justify-center items-center"></div>}
            
            {paginated?.map((farmer) => (
              <tr
                key={farmer.id}
                className="border-t border-slate-100 cursor-pointer hover:bg-slate-50 transition"
                onClick={() => navigate(`/users/${farmer.id}`)}
              >
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={farmer.name} />
                    <div>
                      <p className="font-medium text-slate-900">
                        {farmer.name}
                      </p>
                      {/* <p className="text-xs text-slate-400">{farmer.code}</p> */}
                    </div>
                  </div>
                </td>
                <td className="py-3 text-slate-600">{farmer.lga}</td>
                <td className="py-3 text-slate-600">
                  {farmer?.listings_count ?? 0} listings
                </td>
                <td className="py-3">
                  <StatusBadge status={farmer.status} />
                </td>
                <td className="py-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/users/${farmer.id}`);
                    }}
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
          total={filtered?.length ?? 0}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>
    </Layout>
  );
}
