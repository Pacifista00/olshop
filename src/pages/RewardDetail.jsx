import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/Api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RewardDetail() {
  const { id } = useParams();

  const [checkIn, setCheckIn] = useState(null);
  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const isHotelInvalid = reward?.type === "hotel" && !checkIn;
  const isProductInvalid =
    reward?.type === "product" && (!recipientName || !address);

  // simulasi user (nanti ambil dari auth context / redux)
  const [user, setUser] = useState({
    points: 1000,
  });

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      const res = await api.get(`/reward/${id}`);
      setReward(res.data.data || res.data);
    } catch (error) {
      console.error("Gagal ambil detail:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 HANDLE REDEEM
  const handleRedeem = async () => {
    try {
      setRedeeming(true);

      let payload = {};

      // ✅ PRODUCT
      if (reward.type === "product") {
        if (!recipientName || !address) {
          alert("Nama dan alamat wajib diisi");
          setRedeeming(false);
          return;
        }

        payload = {
          recipient_name: recipientName,
          address: address,
          phone: phone,
        };
      }

      // ✅ HOTEL
      if (reward.type === "hotel") {
        if (!checkIn) {
          alert("Tanggal check-in wajib diisi");
          setRedeeming(false);
          return;
        }

        const checkOutDate = new Date(checkIn);
        checkOutDate.setDate(checkOutDate.getDate() + 1);

        payload = {
          check_in: checkIn.toISOString().split("T")[0],
          check_out: checkOutDate.toISOString().split("T")[0],
          phone: phone,
        };
      }

      // ✅ VOUCHER
      if (reward.type === "voucher") {
        payload = {
          phone: phone,
        };
      }

      const res = await api.post(`/rewards/${id}/redeem`, payload);
      const data = res.data.data;

      // 🔥 RESPONSE HANDLING
      if (reward.type === "voucher") {
        alert(`Redeem berhasil!\nKode Voucher: ${data?.details?.code || "-"}`);
      }

      if (reward.type === "product") {
        alert("Redeem berhasil! Produk akan dikirim.");
      }

      if (reward.type === "hotel") {
        const booking = data?.hotel_booking;

        alert(
          `Booking berhasil!\nKode: ${booking?.booking_code}\nCheck-in: ${booking?.check_in}\nCheck-out: ${booking?.check_out}`,
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Gagal redeem");
    } finally {
      setRedeeming(false);
    }
  };

  // 🔥 VALIDASI
  const isOutOfStock = reward?.stock === 0;
  const isNotEnoughPoint = reward && user.points < reward.points_required;

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!reward) {
    return (
      <div className="text-center mt-20 text-red-500">
        Reward tidak ditemukan
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 pt-44 md:pt-40 pb-20">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* TYPE */}
        <span className="text-xs px-3 py-1 bg-gray-100 rounded-full capitalize">
          {reward.type}
        </span>

        {/* TITLE */}
        <h1 className="text-2xl font-bold mt-3">{reward.name}</h1>

        {/* INFO */}
        <div className="flex items-center justify-between mt-3">
          <p className="text-sm text-gray-500">
            Stok: {reward.stock ?? "Tidak terbatas"}
          </p>

          <div className="flex items-center gap-2 font-semibold">
            <img src="/image/logo/poin.png" className="w-5 h-5" alt="" />
            <span>{reward.points_required} Poin</span>
          </div>
        </div>

        {/* DESCRIPTION */}
        {reward.description && (
          <p className="text-gray-600 mt-2">{reward.description}</p>
        )}

        {/* DIVIDER */}
        <div className="border-t border-gray-300 my-2"></div>

        {/* DETAIL TYPE */}
        {reward.type === "product" && (
          <div className="space-y-3 mt-3">
            <p className="text-sm font-semibold">
              Produk: {reward.product_name}
            </p>

            <input
              type="text"
              placeholder="Nama Penerima"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />

            <textarea
              placeholder="Alamat Lengkap"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />

            <input
              type="text"
              placeholder="No HP"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        )}

        {reward.type === "voucher" && (
          <div className="space-y-1 text-sm">
            {reward.voucher_type === "percentage" && (
              <p>Diskon {reward.voucher_value}%</p>
            )}
            {reward.voucher_type === "fixed" && (
              <p>
                Diskon Rp {Number(reward.voucher_value).toLocaleString("id-ID")}
              </p>
            )}
            {reward.max_discount && (
              <p>
                Max Diskon Rp{" "}
                {Number(reward.max_discount).toLocaleString("id-ID")}
              </p>
            )}
            {reward.min_order_amount && (
              <p>
                Min Order Rp{" "}
                {Number(reward.min_order_amount).toLocaleString("id-ID")}
              </p>
            )}
          </div>
        )}

        {reward.type === "hotel" && (
          <>
            <div className="space-y-1 text-sm">
              <p>Hotel: {reward.hotel_name}</p>
              <p>Kamar: {reward.room_type}</p>
              <p>Lokasi: {reward.location}</p>
            </div>
            <div className="mt-4 space-y-2">
              {/* INPUT PHONE */}
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">
                  No HP
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nomor HP"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                />
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">
                  Check In
                </label>

                <div className="relative mt-1">
                  <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date)}
                    minDate={new Date()}
                    dateFormat="dd MMM yyyy"
                    placeholderText="Pilih tanggal"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />

                  {/* ICON */}
                  <span className="absolute right-3 top-2.5 text-gray-400">
                    📅
                  </span>
                </div>
              </div>

              {checkIn && (
                <p className="text-sm text-gray-500">
                  Check-out otomatis:{" "}
                  {new Date(checkIn.getTime() + 86400000).toLocaleDateString(
                    "id-ID",
                  )}
                </p>
              )}
            </div>
          </>
        )}

        {/* WARNING */}
        {isNotEnoughPoint && (
          <div className="mt-4 text-sm text-red-500">Poin kamu tidak cukup</div>
        )}

        {/* BUTTON */}
        <button
          onClick={handleRedeem}
          disabled={
            isOutOfStock ||
            isNotEnoughPoint ||
            redeeming ||
            isHotelInvalid ||
            isProductInvalid
          }
          className="my-btn-primary w-full mt-6 py-3 rounded-lg border"
        >
          {redeeming
            ? "Memproses..."
            : isOutOfStock
              ? "Stok Habis"
              : isNotEnoughPoint
                ? "Poin Tidak Cukup"
                : "Tukar Sekarang"}
        </button>
      </div>
    </section>
  );
}
