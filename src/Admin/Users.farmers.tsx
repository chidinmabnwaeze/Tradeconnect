import { useEffect, useState } from "react";
import { Funnel, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Avatar from "../components/Avatar";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";
import { type Farmer } from "../lib/types/farmer";
import { getFarmers } from "../lib/services/farmers.service";
import { getErrorMessage } from "../lib/getErrorMessage";
import { useErrorToast } from "../lib/useErrorToast";

const PAGE_SIZE = 10;

export default function Users() {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useErrorToast(error);

  // Debounce the search box so it doesn't fire a request per keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  // Search and pagination run on the backend so every farmer is reachable,
  // not just the first page the API returns.
  useEffect(() => {
    const fetchFarmers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getFarmers({
          page,
          per_page: PAGE_SIZE,
          search: debouncedSearch || undefined,
        });
        setFarmers(response.data);
        setTotal(response.meta.total);
        setPageCount(response.meta.last_page || 1);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchFarmers();
  }, [page, debouncedSearch]);

  return (
    <Layout breadcrumb="Users / Farmers" compact>
      <div className="rounded-4xl border h-full border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search farmers..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none sm:w-80"
          />
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <Funnel className="h-4 w-4" />
              Filter
            </button>
            <button
              onClick={() => navigate("/farmers/add")}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              Add Farmer
            </button>
          </div>
        </div>

        {error ? (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-left text-sm">
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
              {loading && (
                <tr>
                  <td colSpan={5} className="py-26 m-auto">
                    <div className="flex justify-center items-center">
                      <div className="loader"></div>
                    </div>
                  </td>
                </tr>
              )}

              {!loading && farmers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-sm text-slate-500"
                  >
                    {debouncedSearch
                      ? `No farmers match "${debouncedSearch}".`
                      : "No farmers yet."}
                  </td>
                </tr>
              )}

              {!loading &&
                farmers.map((farmer) => (
                  <tr
                    key={farmer.id}
                    className="border-t border-slate-100 cursor-pointer hover:bg-slate-50 transition"
                    onClick={() => navigate(`/farmers/${farmer.id}`)}
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
                          navigate(`/farmers/${farmer.id}`);
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
        </div>

        <Pagination
          page={page}
          pageCount={pageCount}
          total={total}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>
    </Layout>
  );
}
