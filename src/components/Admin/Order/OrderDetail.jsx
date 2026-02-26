import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/Api";
import Badge from "../ui/badge/Badge";

export default function OrderDetail() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [packing, setPacking] = useState(false);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/orders/${id}`);
      setOrder(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat detail order");
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (val) =>
    `Rp ${Number(val || 0).toLocaleString("id-ID")}`;

  const paymentBadgeColor = (status) => {
    switch (status) {
      case "paid":
        return "success";
      case "unpaid":
        return "warning";
      case "expired":
        return "danger";
      default:
        return "secondary";
    }
  };

  const paymentLabel = (status) => {
    switch (status) {
      case "paid":
        return "Dibayar";
      case "unpaid":
        return "Belum Bayar";
      case "expired":
        return "Expired";
      default:
        return status;
    }
  };

  const handlePack = async () => {
    try {
      setPacking(true);

      await api.post(`/orders/${order.id}/pack`);

      alert("Pesanan berhasil dikemas ✅");

      // 🔥 refresh detail order
      fetchDetail();
    } catch (err) {
      console.error(err);
      alert("Gagal mengemas pesanan ❌");
    } finally {
      setPacking(false);
    }
  };

  if (loading) {
    return (
      <div className="p-5 text-gray-500 text-theme-sm">
        Loading detail order...
      </div>
    );
  }

  if (error) {
    return <div className="p-5 text-red-500 text-theme-sm">{error}</div>;
  }

  if (!order) return null;

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        {/* LEFT */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {order.order_number}
          </h2>

          <div className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
            <p>
              <span className="font-medium text-gray-600 dark:text-gray-300">
                Order ID:
              </span>{" "}
              {order.id}
            </p>

            <p>
              <span className="font-medium text-gray-600 dark:text-gray-300">
                Dibuat:
              </span>{" "}
              {order.created_at_formatted}
            </p>

            <p>
              <span className="font-medium text-gray-600 dark:text-gray-300">
                Metode Pembayaran:
              </span>{" "}
              {order.payment_method}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-end gap-1 md:justify-end">
          <Badge size="sm" color={paymentBadgeColor(order.payment_status)}>
            {paymentLabel(order.payment_status)}
          </Badge>
          <p className="">
            <span className="font-medium text-sm text-gray-600 dark:text-gray-300">
              Status Pesanan:
            </span>{" "}
            {order.status}
          </p>
          {order.payment_status === "paid" && order.status !== "packed" && (
            <button
              onClick={handlePack}
              disabled={packing}
              className="
      inline-flex items-center justify-center
      rounded-lg bg-indigo-600 px-5 py-2.5
      text-sm font-semibold text-white
      shadow-sm transition
      hover:bg-indigo-700
      disabled:opacity-50 disabled:cursor-not-allowed
    "
            >
              {packing ? "Mengemas..." : "📦 Kemas Pesanan"}
            </button>
          )}
        </div>
      </div>

      {/* ================= SHIPPING INFO ================= */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
        <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white">
          Informasi Pengiriman
        </h3>

        <div className="grid gap-2 text-sm md:grid-cols-2">
          <div>
            <span className="text-gray-500">Kurir:</span>{" "}
            <span className="font-medium">
              {order.courier?.code?.toUpperCase()} {order.courier?.service}
            </span>
          </div>

          <div>
            <span className="text-gray-500">Estimasi:</span>{" "}
            <span className="font-medium">
              {order.courier?.etd
                ? `${order.courier.etd} hari`
                : "Tidak tersedia"}
            </span>
          </div>
        </div>
      </div>

      {/* ================= ITEMS ================= */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
          Produk ({order.items?.length || 0})
        </h3>

        <div className="space-y-4">
          {order.items?.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-lg border p-3 dark:border-white/[0.05]"
            >
              <img
                src={item.product?.image_url}
                alt={item.product?.name}
                className="h-16 w-16 rounded object-cover"
              />

              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-white">
                  {item.product?.name}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Harga: {formatRupiah(item.unit_price)}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Qty: {item.quantity}
                </p>
              </div>

              <div className="text-right font-semibold text-gray-800 dark:text-white">
                {formatRupiah(item.total_price)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
          Ringkasan Pembayaran
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium">
              {formatRupiah(order.subtotal_amount)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Ongkir</span>
            <span className="font-medium">
              {formatRupiah(order.shipping_cost)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Diskon Voucher</span>
            <span className="font-medium text-red-500">
              - {formatRupiah(order.voucher_discount)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Diskon Poin</span>
            <span className="font-medium text-red-500">
              - {formatRupiah(order.points_discount)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Jumlah Poin Digunakan</span>
            <span className="font-medium text-green-500">
              {order.points_used}
            </span>
          </div>

          <div className="my-3 border-t dark:border-white/[0.05]" />

          <div className="flex justify-between text-base font-semibold">
            <span>Total Bayar</span>
            <span>{formatRupiah(order.total_amount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
