import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/Api";

const STATUS_MAP = {
  unpaid: {
    label: "Menunggu Pembayaran",
    color: "bg-yellow-100 text-yellow-800",
    description:
      "Pesanan telah dibuat dan menunggu pembayaran Anda untuk diproses.",
  },
  paid: {
    label: "Dibayar",
    color: "bg-green-100 text-green-800",
    description: "Pembayaran telah diterima. Pesanan Anda sedang kami proses.",
  },
  failed: {
    label: "Gagal",
    color: "bg-red-100 text-red-800",
    description: "Pembayaran gagal. Silakan lakukan pemesanan ulang.",
  },
  expired: {
    label: "Kedaluwarsa",
    color: "bg-red-100 text-red-800",
    description:
      "Batas waktu pembayaran telah berakhir dan pesanan dibatalkan.",
  },
};

const formatRupiah = (value = 0) =>
  `Rp${Number(value).toLocaleString("id-ID")}`;

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleRetryPayment = async () => {
    try {
      const res = await api.post(`/checkout/order/${order.id}`);

      if (res.data.snapToken) {
        window.snap.pay(res.data.snapToken);
      }
    } catch (err) {
      console.log(err.response?.data);
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

  const status = STATUS_MAP[order.payment_status];

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
            <p className="mt-2  text-sm">{status?.description}</p>
          </div>

          <span
            className={`self-start px-4 py-1 rounded-full text-sm font-medium ${status?.color}`}
          >
            {status?.label}
          </span>
        </div>
      </div>

      {/* ================= SHIPPING ================= */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold">Informasi Pengiriman</h2>
        <p className="text-sm  mb-4">
          Detail metode pengiriman yang Anda pilih untuk pesanan ini.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="">Kurir</p>
            <p className="font-medium uppercase">
              {order.courier?.code} – {order.courier?.service}
            </p>
          </div>

          <div>
            <p className="">Estimasi Pengiriman</p>
            <p className="font-medium">{order.courier?.etd ?? "-"} hari</p>
          </div>

          <div>
            <p className="">Biaya Pengiriman</p>
            <p className="font-medium">{formatRupiah(order.shipping_cost)}</p>
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
        {order.payment_status === "unpaid" && (
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
