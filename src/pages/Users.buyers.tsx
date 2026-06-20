import Layout from "../components/Layout";
import { Funnel, Plus ,User} from "lucide-react";

export default function Buyers() {
const buyersData = [
  { name: "Amina S.", role: "Farmer", location: "Kaduna", status: "Verified" ,actions:<User/>},
  { name: "Musa T.", role: "Farmer", location: "Kano", status: "Pending", actions:<User/> },
  { name: "Chidi N.", role: "Buyer", location: "Lagos", status: "Verified", actions:<User/> },
  { name: "Bola A.", role: "Buyer", location: "Ibadan", status: "Verified" , actions:<User/>},
];

  return (
<Layout>

    <main className="min-h-screen w-full bg-white p-4 rounded-3xl border border-slate-200">
      <section className="flex justify-between items-center">
        <div>
          <input type="search"  placeholder="Search Farmers"/>
        </div>
        <div  className="flex justify-between">
          <button className="flex items-center py-4 border border-2 border-gray-200"><Funnel />Filter</button>
          <button className="flex items-center rounded-lg px-6 py-3 border border-2 border-primary">
            <Plus />
            Add Farmers
          </button>
        </div>
      </section>

      <table className="w-full ">
        <thead className="bg-global-bg p-4 ">
             <tr className="text-slate-500 ">
              <th className="pb-3 font-medium">Buyer</th>
              <th className="pb-3 font-medium">Location</th>
              <th className="pb-3 font-medium">Orders</th>
              <th className="pb-3 font-medium">Status</th>
               <th className="pb-3 font-medium">Actions</th>
            </tr>
        </thead>
      <tbody>
            {buyersData.map((user) => (
              <tr key={user.name} className="border-t border-slate-100">
                <td className="py-3 font-medium text-slate-900">
                  {user.name}
                </td>
                <td className="py-3 text-slate-600">{user.role}</td>
                <td className="py-3 text-slate-600">{user.location}</td>
                <td className="py-3 text-slate-600">{user.status}</td>
                <td className="py-3 text-slate-600">{user.actions}</td>
              </tr>
            ))}
          </tbody>
      </table>
    </main>
    </Layout>
  );
}
