import { useNavigate } from "react-router-dom";
import formatRupiah from "../../utils/formatRupiah";

const OrderCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-40" />
          <div className="h-3 bg-gray-200 rounded w-32" />
          <div className="h-3 bg-gray-200 rounded w-48" />
        </div>

        <div className="space-y-2 sm:text-right">
          <div className="h-5 bg-gray-200 rounded w-24 ml-auto" />
          <div className="h-3 bg-gray-200 rounded w-16 ml-auto" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
        <div className="h-6 bg-gray-200 rounded-full w-32" />
        <div className="h-9 bg-gray-200 rounded-lg w-full sm:w-32" />
      </div>
    </div>
  );
};
const OrderList = ({ orders = [], loading = false }) => {
  const navigate = useNavigate();

  const statusStyle = (status) => {
    switch (status) {
      case "created":
      case "pending":
        return "bg-gray-100 text-gray-700";

      case "processing":
        return "bg-yellow-100 text-yellow-700";

      case "packed":
        return "bg-indigo-100 text-indigo-700";

      case "shipped":
      case "allocated":
      case "picking_up":
      case "picked":
        return "bg-blue-100 text-blue-700";

      case "dropping_off":
        return "bg-blue-200 text-blue-800";

      case "delivered":
      case "completed":
        return "bg-green-100 text-green-700";

      case "on_hold":
        return "bg-orange-100 text-orange-700";

      case "return_in_transit":
      case "returned":
      case "disposed":
      case "cancelled":
        return "bg-red-100 text-red-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const statusLabel = (status) => {
    switch (status) {
      // ORDER STATUS
      case "created":
      case "pending":
        return "Menunggu Pembayaran";

      case "confirmed":
        return "Dikonfirmasi";

      case "processing":
        return "Diproses";

      case "packed":
        return "Sedang Disiapkan";

      case "shipped":
        return "Dikirim";

      case "completed":
        return "Selesai";

      case "cancelled":
        return "Dibatalkan";

      // SHIPPING STATUS (Biteship)

      case "courier_not_found":
        return "Kurir Tidak Ditemukan";

      case "allocated":
        return "Kurir Ditugaskan";

      case "picking_up":
        return "Kurir Menuju Pengirim";

      case "picked":
        return "Dalam Pengiriman";

      case "dropping_off":
        return "Dalam Pengantaran";

      case "delivered":
        return "Paket Diterima";

      case "disposed":
        return "Paket Dihancurkan";

      case "on_hold":
        return "Pengiriman Ditahan";

      case "return_in_transit":
        return "Retur Dalam Perjalanan";

      case "returned":
        return "Paket Dikembalikan";

      default:
        return status;
    }
  };

  const getDisplayStatus = (order) => {
    if (!order.shipping_status) {
      return order.status;
    }

    return order.shipping_status;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <OrderCardSkeleton key={i} />
        ))}
      </div>
    );
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
      {orders.map((order) => {
        const displayStatus = getDisplayStatus(order);

        return (
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
                <p className="text-sm text-gray-500">
                  {order.items.length} item
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span
                className={`w-fit px-3 py-1 text-xs font-medium rounded-full ${statusStyle(
                  displayStatus,
                )}`}
              >
                {statusLabel(displayStatus)}
              </span>

              <button
                onClick={() => navigate(`/orders/${order.id}`)}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium  rounded-lg my-btn-primary transition"
              >
                Lihat Detail
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
