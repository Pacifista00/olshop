import { useNavigate } from "react-router-dom";
import formatRupiah from "../../utils/formatRupiah";

const OrderList = ({ orders = [], loading = false }) => {
  const navigate = useNavigate();

  const statusStyle = (status) => {
    switch (status) {
      case "created":
        return "bg-gray-100 text-gray-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "packed":
        return "bg-indigo-100 text-indigo-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const statusLabel = (status) => {
    switch (status) {
      case "created":
        return "Pesanan Dibuat";
      case "processing":
        return "Diproses";
      case "packed":
        return "Sudah Dikemas";
      case "shipped":
        return "Dikirim";
      case "completed":
        return "Selesai";
      case "cancelled":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!orders.length) {
    return (
      <div className="text-center text-gray-500 py-10 bg-white rounded-xl">
        Belum ada pesanan
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col gap-4 hover:shadow-md transition"
        >
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1">
              <p className="font-semibold">{order.order_number}</p>
              <p className="text-sm text-gray-500">
                {order.created_at_formatted}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Kurir: {order.courier.code.toUpperCase()} (
                {order.courier.service})
              </p>
            </div>

            <div className="mt-2 sm:mt-0 sm:text-right">
              <p className="text-lg font-bold my-text-primary">
                {formatRupiah(Number(order.total_amount))}
              </p>
              <p className="text-sm text-gray-500">{order.items.length} item</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span
              className={`w-fit px-3 py-1 text-xs font-medium rounded-full ${statusStyle(
                order.status,
              )}`}
            >
              {statusLabel(order.status)}
            </span>

            <button
              onClick={() => navigate(`/orders/${order.id}`)}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Lihat Detail
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
