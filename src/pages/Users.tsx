import Layout from "../components/Layout";

const users = [
  { name: "Amina S.", role: "Farmer", location: "Kaduna", status: "Verified" },
  { name: "Musa T.", role: "Farmer", location: "Kano", status: "Pending" },
  { name: "Chidi N.", role: "Buyer", location: "Lagos", status: "Verified" },
  { name: "Bola A.", role: "Buyer", location: "Ibadan", status: "Verified" },
];

const Users = () => {
  return (
    <Layout
      breadcrumb="Dashboard / Users"
      title="Users"
      subtitle="Manage farmers and buyers on TradeConnect."
    >
      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-500">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Role</th>
              <th className="pb-3 font-medium">Location</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.name} className="border-t border-slate-100">
                <td className="py-3 font-medium text-slate-900">
                  {user.name}
                </td>
                <td className="py-3 text-slate-600">{user.role}</td>
                <td className="py-3 text-slate-600">{user.location}</td>
                <td className="py-3 text-slate-600">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Users;
