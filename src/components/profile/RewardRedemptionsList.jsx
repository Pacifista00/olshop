import { useEffect, useState } from "react";
import api from "../../services/Api";
import { useNavigate } from "react-router-dom";

const RewardRedemptionList = () => {
  const [redemptions, setRedemptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRedemptions();
  }, []);

  const fetchRedemptions = async () => {
    try {
      const res = await api.get("/my-redemptions");
      setRedemptions(res.data.data || []);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID");
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-600";
      case "failed":
        return "bg-red-100 text-red-600";
      case "processing":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <>
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl border border-gray-200 animate-pulse"
            >
              <div className="flex justify-between items-start">
                {/* LEFT */}
                <div className="space-y-3 w-full">
                  {/* Title */}
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>

                  {/* Date */}
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>

                  {/* Points */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-end gap-2">
                  {/* Status badge */}
                  <div className="h-5 w-16 bg-gray-200 rounded-full"></div>

                  {/* Button */}
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))
        ) : redemptions.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl">
            Belum ada riwayat penukaran
          </div>
        ) : (
          redemptions.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl border border-gray-200 flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold">
                  {item.reward?.name || "Reward"}
                </h4>

                <p className="text-xs text-gray-500 mb-1">
                  Ditukarkan Pada {formatDate(item.created_at)}
                </p>
                <p className="flex items-center gap-1">
                  <img
                    src="/image/logo/poin.png"
                    className="w-5 h-5"
                    alt="coin"
                  />
                  <span>
                    Digunakan : {item.points_used?.toLocaleString("id-ID")}
                  </span>
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`inline-block text-xs px-2 py-1 rounded-full ${getStatusStyle(
                    item.status,
                  )}`}
                >
                  {item.status}
                </span>

                <button
                  onClick={() => navigate(`/redemptions/${item.id}`)}
                  className="block mt-2 text-sm my-text-primary hover:underline"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default RewardRedemptionList;
