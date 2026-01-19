import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/Api";

const STATUS_MAP = {
  pending: {
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
      <div className="max-w-6xl mx-auto px-6 py-32 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-200 rounded mb-4" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={() => navigate("/profile/orders")}
            className="mt-4 px-4 py-2 bg-black text-white rounded"
          >
            Kembali ke Pesanan
          </button>
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
            <p className="text-sm text-gray-500">
              Dibuat pada {order.created_at_formatted}
            </p>
            <p className="mt-2 text-gray-600 text-sm">{status?.description}</p>
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
        <p className="text-sm text-gray-500 mb-4">
          Detail metode pengiriman yang Anda pilih untuk pesanan ini.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Kurir</p>
            <p className="font-medium uppercase">
              {order.courier?.code} – {order.courier?.service}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Estimasi Pengiriman</p>
            <p className="font-medium">{order.courier?.etd ?? "-"} hari</p>
          </div>

          <div>
            <p className="text-gray-500">Biaya Pengiriman</p>
            <p className="font-medium">{formatRupiah(order.shipping_cost)}</p>
          </div>
        </div>
      </div>

      {/* ================= ITEMS ================= */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold">Daftar Produk</h2>
        <p className="text-sm text-gray-500 mb-4">
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
                <p className="text-sm text-gray-500">
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
        <p className="text-sm text-gray-500 mb-4">
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
        {order.payment_status === "pending" && (
          <button
            onClick={() => navigate("/checkout")}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Bayar Sekarang
          </button>
        )}

        <button
          onClick={() => navigate("/profile/orders")}
          className="px-4 py-2 border rounded"
        >
          Kembali ke Daftar Pesanan
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
