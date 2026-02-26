import { useEffect, useState } from "react";
import api from "../../services/Api";
import OrderList from "./OrderList";

const statusMap = {
  all: null,
  created: ["created"], // Belum Bayar
  packed: ["processing", "packed"], // Dikemas
  shipped: ["shipped"], // Dikirim
  completed: ["completed", "cancelled"], // Selesai
};

const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("all");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let params = {};

      const mappedStatus = statusMap[status];

      // ✅ kirim array status ke backend
      if (mappedStatus) {
        params.status = mappedStatus;
      }

      const response = await api.get("/orders/me", { params });

      setOrders(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);

  return (
    <div className="space-y-6">
      {/* TABS */}
      <div className="flex gap-2 overflow-x-auto">
        {[
          { label: "Semua", value: "all" },
          { label: "Belum Bayar", value: "created" },
          { label: "Dikemas", value: "packed" },
          { label: "Dikirim", value: "shipped" },
          { label: "Selesai", value: "completed" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatus(tab.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap
              ${
                status === tab.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <OrderList orders={orders} loading={loading} />
    </div>
  );
};

export default OrdersTab;
