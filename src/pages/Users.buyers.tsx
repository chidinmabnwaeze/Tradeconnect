import Layout from "../components/Layout";
import { Funnel, Plus } from "lucide-react";

export default function Buyers() {
  return (
<Layout>

    <main className="min-h-screen w-full bg-white p-4 rounded-2xl">
      <section className="flex justify-between items-center">
        <div>
          <input type="search"  placeholder="Search Farmers"/>
        </div>
        <div  className="flex justify-between">
          <button className="flex items-center p-4 border border-2 border-gray-200"><Funnel />Filter</button>
          <button className="flex items-center rounded-lg px-6 py-3 border border-2 border-primary">
            <Plus />
            Add Farmers
          </button>
        </div>
      </section>

      <table className="w-full">
        <thead className="bg-global-bg  ">
             <tr className="text-slate-500 flex justify-between items-center">
              <th className="pb-3 font-medium">Buyer</th>
              <th className="pb-3 font-medium">Location</th>
              <th className="pb-3 font-medium">Orders</th>
              <th className="pb-3 font-medium">Status</th>
               <th className="pb-3 font-medium">Actions</th>
            </tr>
        </thead>
        <tbody>
              <tr className="text-slate-500">
              <th className="pb-3 font-medium">Buyer</th>
              <th className="pb-3 font-medium">Location</th>
              <th className="pb-3 font-medium">Orders</th>
              <th className="pb-3 font-medium">Status</th>
               <th className="pb-3 font-medium">Actions</th>
            </tr>
        </tbody>
      </table>
    </main>
    </Layout>
  );
}
