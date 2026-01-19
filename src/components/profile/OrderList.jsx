import { useNavigate } from "react-router-dom";
import formatRupiah from "../../utils/formatRupiah";

const OrderList = ({ orders }) => {
  const navigate = useNavigate();

  const statusStyle = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const statusLabel = (status) => {
    switch (status) {
      case "paid":
        return "Dibayar";
      case "pending":
        return "Menunggu Pembayaran";
      case "failed":
        return "Gagal";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="
            bg-white border border-gray-200 rounded-xl
            p-4 sm:p-5
            flex flex-col gap-4
            hover:shadow-md transition
          "
        >
          {/* ROW UTAMA */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            {/* KIRI */}
            <div className="flex-1">
              <p className="font-semibold text-gray-800">
                {order.order_number}
              </p>
              <p className="text-sm text-gray-500">
                {order.created_at_formatted}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Kurir: {order.courier.code.toUpperCase()} (
                {order.courier.service})
              </p>
            </div>

            {/* KANAN (HARGA) */}
            <div className="mt-2 sm:mt-0 sm:text-right">
              <p className="text-lg font-bold text-blue-600">
                {formatRupiah(Number(order.total_amount))}
              </p>
              <p className="text-sm text-gray-500">{order.items.length} item</p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span
              className={`
                w-fit px-3 py-1 text-xs font-medium rounded-full
                ${statusStyle(order.payment_status)}
              `}
            >
              {statusLabel(order.payment_status)}
            </span>

            <button
              onClick={() => navigate(`/orders/${order.id}`)}
              className="
                w-full sm:w-auto
                px-4 py-2 text-sm font-medium
                bg-blue-600 text-white rounded-lg
                hover:bg-blue-700 transition
              "
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
