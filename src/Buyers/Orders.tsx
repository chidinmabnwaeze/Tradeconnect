import { useEffect, useState } from "react";
import {
  CircleCheck,
  Clock,
  MapPin,
  PackageCheck,
  PackagePlus,
  Plus,
  Truck,
} from "lucide-react";
import BuyerLayout from "../components/BuyerLayout";
import StatusBadge from "../components/StatusBadge";
import { formatNaira } from "../lib/format";
import { getMyOrders } from "../lib/services/orders.service";
import { getErrorMessage } from "../lib/getErrorMessage";
import { type Order } from "../lib/types/order";
import { useNavigate } from "react-router-dom";

const steps = [
  { label: "Order Created", icon: PackagePlus },
  { label: "Order Confirmed", icon: CircleCheck },
  { label: "Processing", icon: Clock },
  { label: "Out for Delivery", icon: Truck },
  { label: "Delivered", icon: PackageCheck },
];

const deliveryMethodLabels: Record<string, string> = {
  standard: "Standard Delivery",
  pickup: "Pickup at Depot",
  express: "Express Delivery",
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getMyOrders({ per_page: 100 });
        setOrders(response.data);
        setSelected((current) => current ?? response.data[0] ?? null);
      } catch (error) {
        getErrorMessage(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const openDisputeForSelectedOrder = () => {
    if (!selected) return;
    navigate("/marketplace/disputes", {
      state: { orderId: selected.id, orderNumber: selected.order_number },
    });
  };

  const activeStep =
    selected?.status === "new"
      ? 1
      : selected?.status === "in_transit"
        ? 3
        : selected?.status === "delivered"
          ? 5
          : 0;

  return (
    <BuyerLayout breadcrumb="Orders / My Orders">
      <div className="grid grid-cols-1 gap-6 pb-10 lg:grid-cols-[340px_1fr]">
        <div className="rounded-4xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="px-2 text-lg font-semibold text-slate-900">
            All Orders{" "}
            <span className="text-sm font-normal text-slate-400">
              ({orders.length} orders)
            </span>
          </h2>
          <div className="mt-3 space-y-2">
            {loading && (
              <div className="flex justify-center py-10">
                <div className="loader"></div>
              </div>
            )}
            {!loading && orders.length === 0 && (
              <p className="px-2 py-6 text-sm text-slate-400">
                You haven't placed any orders yet.
              </p>
            )}
            {orders.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelected(order)}
                className={`flex w-full flex-col gap-2 rounded-2xl p-4 text-left transition ${
                  selected?.id === order.id
                    ? "bg-global-bg"
                    : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900">
                    {order.order_number}
                  </p>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-xs text-slate-400">
                  {new Date(order.placed_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <p className="text-slate-500">{order.items.length} items</p>
                  <p className="font-semibold text-slate-900">
                    {formatNaira(Number(order.total))}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
          {!selected ? (
            <p className="py-10 text-center text-sm text-slate-400">
              Select an order to view details.
            </p>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-slate-900">
                      {selected.order_number}
                    </h2>
                    <StatusBadge status={selected.status} />
                  </div>
                  <p className="text-lg font-bold text-slate-900">
                    {formatNaira(Number(selected.total))}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {new Date(selected.placed_at).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <div>
                  <button
                    onClick={openDisputeForSelectedOrder}
                    className={`flex w-full justify-center items-center gap-3 rounded-2xl p-2 mt-4 text-center text-white  bg-primary hover:bg-slate-50 hover:text-primary border border-primary`}
                  >
                    {" "}
                    <Plus style={{}} />
                    Open New Dispute{" "}
                  </button>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between px-2">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const done = idx < activeStep;
                  return (
                    <div key={step.label} className="flex flex-1 items-center">
                      <div className="flex flex-col items-center text-center">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-full ${
                            done
                              ? "bg-primary text-white"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className="mt-2 max-w-[80px] text-[11px] font-medium text-slate-700">
                          {step.label}
                        </p>
                      </div>
                      {idx < steps.length - 1 && (
                        <div
                          className={`mx-2 h-0.5 flex-1 ${
                            idx < activeStep - 1 ? "bg-primary" : "bg-slate-200"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <h3 className="mb-3 text-sm font-semibold text-slate-900">
                  Order Items
                </h3>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-slate-500">
                      <th className="pb-2 font-medium">Item</th>
                      <th className="pb-2 font-medium">Qty</th>
                      <th className="pb-2 font-medium">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.items.map((item) => (
                      <tr key={item.id} className="border-t border-slate-100">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-global-bg text-sm font-semibold text-slate-500">
                              {item.produce_name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">
                                {item.produce_name}
                              </p>
                              <p className="text-xs text-slate-400">
                                {item.category_name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-slate-600">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="py-3 font-medium text-slate-900">
                          {formatNaira(Number(item.line_total))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-3 space-y-1 border-t border-slate-100 pt-3 text-sm">
                  <div className="flex items-center justify-end gap-6">
                    <p className="text-slate-500">Subtotal</p>
                    <p className="font-medium text-slate-900">
                      {formatNaira(Number(selected.subtotal))}
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-6">
                    <p className="text-slate-500">Delivery Fee</p>
                    <p className="font-medium text-slate-900">
                      {formatNaira(Number(selected.delivery_fee))}
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-6">
                    <p className="font-medium text-slate-500">Total</p>
                    <p className="text-base font-bold text-slate-900">
                      {formatNaira(Number(selected.total))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-100 bg-global-bg p-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Delivery Details
                </h3>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-600">
                  <MapPin className="h-4 w-4 text-primary" />
                  {selected.delivery.address}, {selected.delivery.lga},{" "}
                  {selected.delivery.state}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {deliveryMethodLabels[selected.delivery.method] ??
                    selected.delivery.method}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </BuyerLayout>
  );
}
