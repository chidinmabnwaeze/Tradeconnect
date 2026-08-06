import { useEffect, useState } from "react";
import { Funnel, Plus, SquarePen } from "lucide-react";
import Layout from "../components/Layout";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router";
import { type Listing } from "../lib/types/listing";
import { getAllListings } from "../lib/services/listings.service";
import { getErrorMessage } from "../lib/getErrorMessage";

// interface Listing {
//   name: string;
//   emoji: string;
//   category: string;
//   farmer: string;
//   farmerCode: string;
//   price: string;
//   stock: string;
//   status: "Live" | "Pending";
// }

// const listings: Listing[] = [
//   {
//     name: "Rice",
//     emoji: "🌾",
//     category: "Grains & Cereals",
//     farmer: "Musa Ibrahim",
//     farmerCode: "FAR-01923",
//     price: "₦180/kg",
//     stock: "200kg",
//     status: "Pending",
//   },
//   {
//     name: "Yam",
//     emoji: "🍠",
//     category: "Roots & Tubers",
//     farmer: "Muhibba Musa",
//     farmerCode: "FAR-02963",
//     price: "₦180/kg",
//     stock: "180kg",
//     status: "Live",
//   },
//   {
//     name: "Cassava",
//     emoji: "🥔",
//     category: "Roots & Tubers",
//     farmer: "Muhibba Musa",
//     farmerCode: "FAR-02963",
//     price: "₦220/kg",
//     stock: "120kg",
//     status: "Live",
//   },
//   {
//     name: "Plantains",
//     emoji: "🍌",
//     category: "Fruits",
//     farmer: "Musa Ibrahim",
//     farmerCode: "FAR-01923",
//     price: "₦650/kg",
//     stock: "100kg",
//     status: "Live",
//   },
//   {
//     name: "Sweet Potatoes",
//     emoji: "🍠",
//     category: "Roots & Tubers",
//     farmer: "Musa Ibrahim",
//     farmerCode: "FAR-01923",
//     price: "₦100/kg",
//     stock: "50kg",
//     status: "Live",
//   },
//   {
//     name: "Maize (Corn)",
//     emoji: "🌽",
//     category: "Grains & Cereals",
//     farmer: "Musa Ibrahim",
//     farmerCode: "FAR-01923",
//     price: "₦180/kg",
//     stock: "200kg",
//     status: "Pending",
//   },
//   {
//     name: "Okra",
//     emoji: "🌿",
//     category: "Vegetables",
//     farmer: "Musa Ibrahim",
//     farmerCode: "FAR-01923",
//     price: "₦180/kg",
//     stock: "100kg",
//     status: "Live",
//   },
//   {
//     name: "Egusi Melon",
//     emoji: "🍈",
//     category: "Roots & Tubers",
//     farmer: "Musa Ibrahim",
//     farmerCode: "FAR-01923",
//     price: "₦180/kg",
//     stock: "220kg",
//     status: "Live",
//   },
//   {
//     name: "Lettuce",
//     emoji: "🥬",
//     category: "Vegetables",
//     farmer: "Musa Ibrahim",
//     farmerCode: "FAR-01923",
//     price: "₦180/kg",
//     stock: "220kg",
//     status: "Pending",
//   },
//   {
//     name: "Spinach",
//     emoji: "🥬",
//     category: "Vegetables",
//     farmer: "Musa Ibrahim",
//     farmerCode: "FAR-01923",
//     price: "₦180/kg",
//     stock: "220kg",
//     status: "Pending",
//   },
// ];

const PAGE_SIZE = 10;

export default function Listings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(listings.length / PAGE_SIZE) || 1;
  const navigate = useNavigate();


  useEffect(() => {
    const fetchlistings = async () => {
      try {
        const response = await getAllListings();
        setListings(response);
      } catch (err) {
        setError(getErrorMessage(err));
      }
    };
    fetchlistings();
  }, []);

  return (
    <Layout breadcrumb="Listings / All products" compact>
      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-2">
          <h2 className="text-xl font-semibold text-slate-900">
            Products Listings
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            View all farmers listings
          </p>
        </div>

        <div className="my-6 flex items-center justify-between gap-4">
          <input
            placeholder="Search listings..."
            className="w-[320px] rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none"
          />
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <Funnel className="h-4 w-4" />
              Filter
            </button>
            <button
              onClick={() => navigate("/add-listing")}
              className="flex items-center gap-2 rounded-lg bg-[#C4773B] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95"
            >
              <Plus className="h-4 w-4" />
              Add Listing
            </button>
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-500">
              <th className="pb-3 font-medium">Produce</th>
              <th className="pb-3 font-medium">Farmer</th>
              <th className="pb-3 font-medium">Price</th>
              <th className="pb-3 font-medium">Stock</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing, idx) => (
              <tr key={idx} className="border-t border-slate-100">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-global-bg text-2xl">
                      {listing.produce.image_url ? (
                        <img
                          src={listing.produce.image_url}
                          alt={listing.produce.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <span>{listing.produce.name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">
                        {listing.produce.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {listing.produce.category.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <p className="font-medium text-slate-900">{listing.farmer.name}</p>
                  <p className="text-xs text-slate-400">{listing.farmer_id}</p>
                </td>
                <td className="py-3 font-medium text-primary">
                  {listing.price}
                </td>
                <td className="py-3 text-slate-600">{listing.stock}</td>
                <td className="py-3">
                  <StatusBadge status={listing.status} />
                </td>
                <td className="py-3">
                  <button className="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
                    <SquarePen className="h-3.5 w-3.5" />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          page={page}
          pageCount={pageCount}
          total={listings.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>
    </Layout>
  );
}
