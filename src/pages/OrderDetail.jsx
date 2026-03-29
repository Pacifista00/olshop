import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/Api";

const formatRupiah = (value = 0) =>
  `Rp${Number(value).toLocaleString("id-ID")}`;

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  const getOrderStatus = (status) => {
    switch (status) {
      case "created":
        return "Pesanan Dibuat";

      case "pending":
        return "Menunggu Pembayaran";

      case "processing":
        return "Pesanan Diproses";

      case "packed":
        return "Pesanan Sudah Dikemas";

      case "shipped":
        return "Pesanan Dikirim";

      case "completed":
        return "Pesanan Selesai";

      case "cancelled":
        return "Pesanan Dibatalkan";

      case "returned":
        return "Pesanan Dikembalikan";

      case "disposed":
        return "Pesanan Dihancurkan";

      default:
        return "Status Tidak Diketahui";
    }
  };

  const getShippingStatus = (status) => {
    switch (status) {
      case "allocated":
        return "Kurir Ditugaskan";

      case "picking_up":
        return "Kurir Menuju Pengirim";

      case "picked":
        return "Dalam Pengiriman";

      case "dropping_off":
        return "Dalam Pengantaran";

      case "on_hold":
        return "Pengiriman Ditahan";

      case "return_in_transit":
        return "Sedang Dikembalikan";

      case "returned":
        return "Paket Dikembalikan";

      case "disposed":
        return "Paket Dihancurkan";

      case "delivered":
        return "Paket Telah Diterima";

      case "courier_not_found":
        return "Kurir Tidak Ditemukan";

      default:
        return "-";
    }
  };

  const getPaymentStatus = (status) => {
    switch (status) {
      case "unpaid":
        return "Belum Dibayar";
      case "paid":
        return "Sudah Dibayar";
      case "expired":
        return "Kedaluwarsa";
      case "failed":
        return "Gagal";
      case "refund_pending":
        return "Sedang Proses Refund";
      case "refunded":
        return "Sudah Direfund";
      default:
        return status;
    }
  };
  const getPaymentStamp = (status) => {
    switch (status) {
      case "paid":
        return {
          text: "LUNAS",
          color: "text-green-600 border-green-600",
        };
      case "unpaid":
        return {
          text: "BELUM BAYAR",
          color: "text-yellow-600 border-yellow-600",
        };
      case "expired":
        return {
          text: "KADALUWARSA",
          color: "text-gray-500 border-gray-500",
        };
      case "failed":
        return {
          text: "GAGAL",
          color: "text-red-600 border-red-600",
        };
      case "refund_pending":
        return {
          text: "REFUND",
          color: "text-orange-600 border-orange-600",
        };
      case "refunded":
        return {
          text: "DIKEMBALIKAN",
          color: "text-purple-600 border-purple-600",
        };
      default:
        return {
          text: status,
          color: "text-gray-500 border-gray-500",
        };
    }
  };
  const getShippingStatusColor = (status) => {
    switch (status) {
      case "allocated":
        return "text-blue-600";

      case "picking_up":
        return "text-indigo-600";

      case "picked":
        return "text-cyan-600";

      case "dropping_off":
        return "text-purple-600";

      case "on_hold":
        return "text-yellow-600";

      case "return_in_transit":
        return "text-orange-600";

      case "returned":
        return "text-gray-600";

      case "disposed":
        return "text-red-700";

      case "delivered":
        return "text-green-600";

      case "courier_not_found":
        return "text-red-500";

      default:
        return "text-gray-500";
    }
  };
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 ";
      case "processing":
      case "packed":
        return "bg-blue-100 text-blue-700 ";
      case "shipped":
        return "bg-purple-100 text-purple-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700 ";
    }
  };

  const handleRetryPayment = async () => {
    try {
      const res = await api.post(`/checkout/order/${order.id}`);

      if (res.data.snapToken) {
        window.snap.pay(res.data.snapToken, {
          onSuccess: function () {
            navigate(`/orders/${order.id}`);
          },
          onPending: function () {
            navigate(`/orders/${order.id}`);
          },
          onError: function () {
            alert("Pembayaran gagal");
            navigate(`/orders/${order.id}`);
          },
          onClose: function () {
            alert("Kamu menutup pembayaran");
            navigate(`/orders/${order.id}`);
          },
        });
      }
    } catch (err) {
      console.log("ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Gagal retry");
    }
  };
  const handleCancelOrder = async () => {
    if (!window.confirm("Yakin ingin membatalkan pesanan ini?")) return;

    try {
      setCancelLoading(true);

      await api.post(`/order/${order.id}/cancel`);

      setOrder((prev) => ({
        ...prev,
        status: "cancelled",
        payment_status:
          prev.payment_status === "paid" ? "refund_pending" : "failed",
      }));
    } catch (err) {
      alert(err.response?.data?.message || "Gagal membatalkan pesanan");
    } finally {
      setCancelLoading(false);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data.data);
      } catch {
        setError("Pesanan tidak ditemukan atau Anda tidak memiliki akses.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);
  const isExpired = (() => {
    if (!order?.expired_at) return false;

    const expiryTime = new Date(order.expired_at).getTime();

    return Date.now() >= expiryTime;
  })();
  useEffect(() => {
    if (!order?.expired_at) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const expiry = new Date(order.expired_at).getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [order]);

  const formatCountdown = (ms) => {
    if (!ms || ms <= 0) return "00:00";

    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
  const canCancel =
    order &&
    ["created", "pending", "processing"].includes(order.status) &&
    ["unpaid", "pending", "paid"].includes(order.payment_status) &&
    !order.shipping_status;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-4 pb-10 pt-44 md:pt-40 space-y-4 animate-pulse">
        {/* ================= STATUS ================= */}
        <div className="bg-white rounded shadow p-6">
          <div className="flex flex-col md:flex-row md:justify-between gap-3">
            <div className="space-y-2 flex-1">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>

            <div className="h-6 bg-gray-200 rounded-full w-full md:w-32"></div>
          </div>
        </div>

        {/* ================= SHIPPING ================= */}
        <div className="bg-white rounded shadow p-6 space-y-4">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= ITEMS ================= */}
        <div className="bg-white rounded shadow p-6 space-y-4">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>

          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4 py-3">
              <div className="w-20 h-20 bg-gray-200 rounded"></div>

              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>

              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="bg-white rounded shadow p-6 space-y-4">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>

          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          ))}

          <div className="border-t pt-3 flex justify-between">
            <div className="h-5 bg-gray-200 rounded w-40"></div>
            <div className="h-5 bg-gray-200 rounded w-24"></div>
          </div>
        </div>

        {/* ================= ACTION ================= */}
        <div className="flex flex-col md:flex-row md:justify-end gap-3">
          <div className="h-10 bg-gray-200 rounded w-full md:w-32"></div>
          <div className="h-10 bg-gray-200 rounded w-full md:w-40"></div>
          <div className="h-10 bg-gray-200 rounded w-full md:w-44"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-gray-50">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-lg w-full p-8 space-y-6">
          {/* Icon + Title */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Pesanan Tidak Dapat Ditampilkan
              </h2>
              <p className="text-sm  mt-1">
                Terjadi kendala saat memuat detail pesanan Anda.
              </p>
            </div>
          </div>

          {/* Error Message Detail */}
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
            <p className="text-sm  leading-relaxed">{error}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={() => window.location.reload()}
              className="
              px-4 py-2 text-sm font-medium
              border border-gray-300 rounded-lg
              hover:bg-gray-100 transition
            "
            >
              Coba Lagi
            </button>

            <button
              onClick={() => navigate("/profile/orders")}
              className="
              px-4 py-2 text-sm font-medium
              my-btn-primary rounded-lg
               transition"
            >
              Kembali ke Daftar Pesanan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-4 pb-10 pt-44 md:pt-40 space-y-4">
      {/* ================= STATUS ================= */}
      <div className="bg-white rounded shadow p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
          {/* Kiri */}
          <div className="space-y-1 flex-1">
            <h1 className="text-xl xl:text-2xl font-semibold">
              Order #{order.order_number}
            </h1>
            <p className="text-xs lg:text-sm text-gray-500">
              Dibuat pada {order.created_at_formatted}
            </p>
          </div>

          {/* Kanan (Badge) */}
          <div className="flex md:flex-col w-full md:w-auto">
            <span
              className={`w-full md:w-auto text-center md:text-right px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                isExpired && order.payment_status !== "paid"
                  ? "bg-red-100 text-red-700"
                  : getStatusBadgeColor(order.status)
              }`}
            >
              {isExpired && order.payment_status !== "paid"
                ? "Kedaluwarsa"
                : getOrderStatus(order.status)}
            </span>
          </div>
        </div>
        {/* Timer */}
        {["unpaid", "pending"].includes(order.payment_status) &&
          order.expired_at &&
          !isExpired && (
            <div className="mt-2 text-sm text-red-600 space-y-1 bg-red-50 p-3 rounded-md border border-red-100">
              <p>
                Batas Pembayaran:{" "}
                <span className="font-semibold">
                  {new Date(order.expired_at).toLocaleString("id-ID")}
                </span>
              </p>
              <p>
                Sisa Waktu:{" "}
                <span className="font-bold">{formatCountdown(timeLeft)}</span>
              </p>
            </div>
          )}
      </div>

      {/* ================= SHIPPING ================= */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold">Informasi Pengiriman</h2>
        <p className="text-xs lg:text-sm mb-2">
          Status pengiriman :{" "}
          <span
            className={`font-semibold ${getShippingStatusColor(
              order.shipping_status,
            )}`}
          >
            {getShippingStatus(order.shipping_status)}
          </span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs lg:text-sm">
          <div>
            <p>Kurir</p>
            <p className=" font-medium uppercase">
              {order.courier?.code} – {order.courier?.service}
            </p>
          </div>

          {/* <div>
            <p>Estimasi Pengiriman</p>
            <p className="font-medium">{order.courier?.etd ?? "-"} hari</p>
          </div> */}

          <div>
            <p>Biaya Pengiriman</p>
            <p className="font-medium">{formatRupiah(order.shipping_cost)}</p>
          </div>

          <div>
            <p>Nomor Resi</p>

            {order.tracking_number ? (
              <div className="flex items-center gap-2">
                <span className="font-mono font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                  {order.tracking_number}
                </span>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(order.tracking_number)
                  }
                  className="text-xs px-2 py-1 border rounded hover:bg-gray-100"
                >
                  Salin
                </button>
              </div>
            ) : (
              <p className="text-gray-400">Belum tersedia</p>
            )}
          </div>
        </div>
      </div>

      {/* ================= ITEMS ================= */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Daftar Produk</h2>

        <div className="divide-y text-xs lg:text-sm">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.product.image_url}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1 text-xs lg:text-sm">
                <p className="font-medium">{item.product.name}</p>
                <p>
                  {item.quantity} × {formatRupiah(item.unit_price)}
                </p>
              </div>

              <p className="font-semibold">{formatRupiah(item.total_price)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="bg-white rounded shadow p-6 relative overflow-hidden">
        {order.payment_status && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`text-3xl md:text-5xl font-extrabold opacity-10 rotate-[-20deg] border-4 px-6 py-2 ${getPaymentStamp(order.payment_status).color}`}
            >
              {getPaymentStamp(order.payment_status).text}
            </div>
          </div>
        )}
        <h2 className="text-lg font-semibold">Ringkasan Pembayaran</h2>

        <div className="space-y-1 text-xs lg:text-sm">
          <div className="flex justify-between">
            <span>Subtotal Produk</span>
            <span>{formatRupiah(order.subtotal_amount)}</span>
          </div>

          <div className="flex justify-between">
            <span>Ongkos Kirim</span>
            <span>{formatRupiah(order.shipping_cost)}</span>
          </div>

          {order.voucher_discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Diskon Voucher</span>
              <span>- {formatRupiah(order.voucher_discount)}</span>
            </div>
          )}
          {order.points_discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Diskon Poin ({order.points_used} poin)</span>
              <span>- {formatRupiah(order.points_discount)}</span>
            </div>
          )}

          <div className="border-t pt-1 flex justify-between font-semibold text-base">
            <span>Total Pembayaran</span>
            <span>{formatRupiah(order.total_amount)}</span>
          </div>
        </div>
      </div>

      {/* ================= ACTION ================= */}

      <div className="flex flex-col md:flex-row md:justify-end gap-3">
        {/* CANCEL BUTTON */}
        <button
          onClick={handleCancelOrder}
          disabled={!canCancel || cancelLoading}
          className={`w-full md:w-auto px-4 py-2 rounded-lg my-btn-danger ${
            !canCancel ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {cancelLoading ? "Membatalkan..." : "Batalkan Pesanan"}
        </button>

        {/* PAY BUTTON */}
        {["unpaid", "pending"].includes(order.payment_status) && !isExpired && (
          <button
            onClick={handleRetryPayment}
            className="w-full md:w-auto px-4 py-2 rounded-lg my-btn-primary"
          >
            Bayar Sekarang
          </button>
        )}

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/profile/orders")}
          className="w-full md:w-auto px-4 py-2 rounded-lg border my-btn-primary"
        >
          Kembali ke Daftar Pesanan
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
