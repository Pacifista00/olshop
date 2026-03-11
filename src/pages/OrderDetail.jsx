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
        return "Pesanan Dimusnahkan";

      default:
        return "Status Tidak Diketahui";
    }
  };

  const getShippingStatus = (status) => {
    switch (status) {
      case "allocated":
        return "Kurir Ditugaskan";

      case "picking_up":
        return "Kurir Menuju Lokasi Pickup";

      case "picked":
        return "Paket Telah Diambil Kurir";

      case "dropping_off":
        return "Paket Dalam Perjalanan ke Tujuan";

      case "on_hold":
        return "Pengiriman Ditahan Sementara";

      case "return_in_transit":
        return "Paket Sedang Dikembalikan";

      case "returned":
        return "Paket Telah Dikembalikan";

      case "disposed":
        return "Paket Dimusnahkan";

      case "delivered":
        return "Paket Telah Diterima";

      case "courier_not_found":
        return "Kurir Tidak Ditemukan";

      default:
        return "Status Pengiriman Tidak Diketahui";
    }
  };

  const handleRetryPayment = async () => {
    try {
      const res = await api.post(`/checkout/order/${order.id}`);

      if (res.data.snapToken) {
        window.snap.pay(res.data.snapToken);
      }
    } catch (err) {
      alert("Gagal memproses pembayaran ulang");
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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-4 pb-10 pt-44 md:pt-40 space-y-8 animate-pulse">
        {/* STATUS */}
        <div className="bg-white rounded shadow p-6 space-y-4">
          <div className="flex justify-between">
            <div className="space-y-2 w-2/3">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded-full w-28"></div>
          </div>
        </div>

        {/* SHIPPING */}
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

        {/* ITEMS */}
        <div className="bg-white rounded shadow p-6 space-y-4">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>

          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4 py-4">
              <div className="w-20 h-20 bg-gray-200 rounded"></div>

              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>

              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="bg-white rounded shadow p-6 space-y-4">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>

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

        {/* ACTION */}
        <div className="flex justify-end gap-3">
          <div className="h-10 bg-gray-200 rounded w-32"></div>
          <div className="h-10 bg-gray-200 rounded w-40"></div>
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
    <div className="max-w-7xl mx-auto px-6 py-4 pb-10 pt-44 md:pt-40 space-y-8">
      {/* ================= STATUS ================= */}
      <div className="bg-white rounded shadow p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">
              Order #{order.order_number}
            </h1>
            <p className="text-sm ">Dibuat pada {order.created_at_formatted}</p>
            <p>
              Status pesanan :{" "}
              <span className="font-semibold">
                {getOrderStatus(order.status)}
              </span>
            </p>
            <p>
              Status pengiriman :{" "}
              <span className="font-semibold">
                {getShippingStatus(order.shipping_status)}
              </span>
            </p>
            {/* <p className="mt-2  text-sm">{status?.description}</p> */}
            {order.payment_status === "unpaid" &&
              order.expired_at &&
              !isExpired && (
                <div className="mt-2 text-sm text-red-600 space-y-1">
                  <p>
                    Pesanan akan kedaluwarsa pada{" "}
                    <span className="font-medium">
                      {new Date(order.expired_at).toLocaleString("id-ID")}
                    </span>
                  </p>
                  <p>
                    Sisa waktu pembayaran:{" "}
                    <span className="font-semibold">
                      {formatCountdown(timeLeft)}
                    </span>
                  </p>
                </div>
              )}
            {isExpired && order.payment_status != "paid" && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                Pesanan telah kedaluwarsa.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ================= SHIPPING ================= */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold">Informasi Pengiriman</h2>
        <p className="text-sm mb-4">
          Detail metode pengiriman yang Anda pilih untuk pesanan ini.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p>Kurir</p>
            <p className="font-medium uppercase">
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
        <h2 className="text-lg font-semibold">Daftar Produk</h2>
        <p className="text-sm  mb-4">
          Berikut adalah produk yang Anda pesan beserta jumlah dan harga.
        </p>

        <div className="divide-y">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-4">
              <img
                src={item.product.image_url}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm ">
                  {item.quantity} × {formatRupiah(item.unit_price)}
                </p>
              </div>

              <p className="font-semibold">{formatRupiah(item.total_price)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold">Ringkasan Pembayaran</h2>
        <p className="text-sm  mb-4">
          Rincian total biaya yang perlu Anda bayarkan.
        </p>

        <div className="space-y-2 text-sm">
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

          <div className="border-t pt-3 flex justify-between font-semibold text-lg">
            <span>Total Pembayaran</span>
            <span>{formatRupiah(order.total_amount)}</span>
          </div>
        </div>
      </div>

      {/* ================= ACTION ================= */}
      <div className="flex justify-end gap-3">
        {order.payment_status === "unpaid" && !isExpired && (
          <button
            onClick={handleRetryPayment}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"
          >
            Bayar Sekarang
          </button>
        )}

        <button
          onClick={() => navigate("/profile/orders")}
          className="px-4 py-2 border rounded-lg my-btn-primary"
        >
          Kembali ke Daftar Pesanan
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
