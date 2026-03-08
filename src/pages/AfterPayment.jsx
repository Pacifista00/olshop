import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/Api";

const AfterPayment = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const orderNumber = params.get("order_id");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!orderNumber) {
      navigate("/");
      return;
    }

    const checkOrder = async () => {
      try {
        const res = await api.get(`/orders/by-number/${orderNumber}`);

        const order = res.data.data;

        // ✅ SUKSES
        if (order.payment_status === "paid") {
          navigate(`/orders/${order.id}`);
          return;
        }

        // ⏳ MASIH MENUNGGU WEBHOOK
        if (order.payment_status === "pending") {
          return;
        }

        // ❌ GAGAL / EXPIRED
        setError(true);
      } catch (err) {
        setError(true);
      }
    };

    checkOrder();

    // 🔁 polling tiap 3 detik (optional tapi recommended)
    const interval = setInterval(checkOrder, 3000);

    return () => clearInterval(interval);
  }, [orderNumber, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {error ? (
        <div className="text-center">
          <p className="text-lg font-medium text-red-600">
            Pembayaran gagal atau pesanan tidak ditemukan
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-black text-white rounded"
          >
            Kembali ke Beranda
          </button>
        </div>
      ) : (
        <p className="text-lg font-medium">Memproses pembayaran Anda...</p>
      )}
    </div>
  );
};

export default AfterPayment;
