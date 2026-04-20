import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/Api";
import Icon from "@mdi/react";
import {
  mdiChevronLeft,
  mdiGiftOutline,
  mdiCalendarMonthOutline,
  mdiTicketPercentOutline,
  mdiOfficeBuildingMarkerOutline,
  mdiPackageVariantClosed,
} from "@mdi/js";

export default function RewardRedemptionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/my-redemptions/${id}`);
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "success":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Komponen Skeleton
  const SkeletonDetail = () => (
    <div className="animate-pulse">
      {/* HEADER */}
      <div className="p-4 sm:p-6 border-b border-gray-50 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-2">
            <div className="h-5 sm:h-7 w-40 sm:w-56 bg-gray-200 rounded"></div>
            <div className="h-3 sm:h-4 w-28 sm:w-36 bg-gray-200 rounded"></div>
          </div>
          <div className="h-6 sm:h-7 w-20 sm:w-24 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* LEFT */}
          <div className="space-y-6 sm:space-y-8">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-gray-200 rounded-xl w-10 h-10"></div>
                <div className="space-y-2 w-full">
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  <div className="h-4 sm:h-5 w-32 sm:w-48 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-100">
            <div className="flex flex-col items-center space-y-3">
              {/* ICON */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full"></div>

              {/* LABEL */}
              <div className="h-3 w-24 bg-gray-200 rounded"></div>

              {/* BOX */}
              <div className="w-full bg-white border-2 border-dashed border-gray-200 rounded-lg p-3 space-y-2">
                <div className="h-4 w-3/4 mx-auto bg-gray-200 rounded"></div>
              </div>

              {/* EXTRA (hotel/product fallback) */}
              <div className="w-full space-y-2 mt-2">
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-6 pt-44 md:pt-40 pb-20">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {loading ? (
          <SkeletonDetail />
        ) : (
          <>
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-50 bg-slate-50/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
                    Detail Penukaran
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    Ref: {data?.reference_code}
                  </p>
                </div>

                <span
                  className={`self-start sm:self-auto px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase border ${getStatusColor(
                    data?.status,
                  )}`}
                >
                  {data?.status}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {/* LEFT */}
                <div className="space-y-6 sm:space-y-8">
                  {/* Reward */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-blue-50 rounded-xl my-text-primary">
                      <Icon path={mdiGiftOutline} size={0.9} />
                    </div>
                    <div>
                      <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                        Reward
                      </p>
                      <p className="text-gray-900 text-sm sm:text-lg">
                        {data?.reward?.name || "-"}
                      </p>
                    </div>
                  </div>

                  {/* Tanggal */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-indigo-50 rounded-xl my-text-primary">
                      <Icon path={mdiCalendarMonthOutline} size={0.9} />
                    </div>
                    <div>
                      <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                        Tanggal
                      </p>
                      <p className="text-gray-900 text-sm sm:text-base">
                        {formatDate(data?.created_at)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-100 flex flex-col justify-center">
                  {/* VOUCHER */}
                  {data?.reward?.type === "voucher" && (
                    <div className="text-center space-y-2 sm:space-y-3">
                      <div className="flex justify-center text-emerald-600">
                        <Icon path={mdiTicketPercentOutline} size={1.2} />
                      </div>
                      <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                        Kode Voucher
                      </p>
                      <div className="bg-white border-2 border-dashed border-emerald-200 py-2 sm:py-3 px-3 sm:px-4 rounded-lg">
                        <span className="text-base sm:text-xl font-mono font-black text-emerald-600 tracking-widest break-all">
                          {data?.voucher?.code || "-"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* HOTEL */}
                  {data?.reward?.type === "hotel" && (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-2 text-emerald-600">
                        <Icon
                          path={mdiOfficeBuildingMarkerOutline}
                          size={0.8}
                        />
                        <span className="text-[10px] sm:text-xs font-bold uppercase">
                          Detail Reservasi
                        </span>
                      </div>

                      <p className="text-gray-800 font-bold text-sm sm:text-base leading-tight">
                        {data?.hotel_booking?.hotel_name}
                      </p>

                      <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm border-y border-gray-200 py-2 sm:py-3">
                        <div>
                          <p className="text-gray-400 text-[9px] uppercase font-bold">
                            Check-in
                          </p>
                          <p className="text-gray-700">
                            {data?.hotel_booking?.check_in}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-[9px] uppercase font-bold">
                            Check-out
                          </p>
                          <p className="text-gray-700">
                            {data?.hotel_booking?.check_out}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-400 text-[9px] uppercase font-bold">
                          Kode Booking
                        </p>
                        <p className="my-text-primary font-bold text-sm sm:text-lg break-all">
                          {data?.hotel_booking?.booking_code || "Menunggu"}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* PRODUCT */}
                  {data?.reward?.type === "product" && (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-2 text-emerald-600">
                        <Icon path={mdiPackageVariantClosed} size={0.9} />
                        <span className="text-[10px] sm:text-xs font-bold uppercase">
                          Detail Pengiriman
                        </span>
                      </div>

                      {/* Nama Produk */}
                      <p className="text-gray-800 font-bold text-sm sm:text-base leading-tight">
                        {data?.redeemed_product?.product_name || "-"}
                      </p>

                      {/* Alamat */}
                      <div className="text-xs sm:text-sm border-y border-gray-200 py-2 sm:py-3 space-y-2">
                        <div>
                          <p className="text-gray-400 text-[9px] uppercase font-bold">
                            Penerima
                          </p>
                          <p className="text-gray-700">
                            {data?.redeemed_product?.recipient_name || "-"}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-400 text-[9px] uppercase font-bold">
                            Alamat
                          </p>
                          <p className="text-gray-700">
                            {data?.redeemed_product?.address || "-"}
                          </p>
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase font-bold">
                          Status
                        </p>
                        <p className="my-text-primary font-bold text-sm">
                          {data?.redeemed_product?.status || "Diproses"}
                        </p>
                      </div>

                      {/* Tracking */}
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase font-bold">
                          No Resi
                        </p>
                        <p className="text-gray-700 font-mono text-sm break-all">
                          {data?.redeemed_product?.tracking_number ||
                            "Belum tersedia"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
