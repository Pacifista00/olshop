import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";
import SubHeading from "../components/SubHeading";

export default function PublicRewardsPage() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const res = await api.get("/rewards");
      setRewards(res.data.data || res.data);
    } catch (error) {
      console.error("Gagal ambil reward:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pt-44 md:pt-40 pb-20">
      <SubHeading>Penukaran Poin</SubHeading>

      {/* Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-4 animate-pulse"
            >
              {/* Badge */}
              <div className="h-5 w-16 bg-gray-200 rounded-full mb-3"></div>

              {/* Title */}
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2 mb-6"></div>

              {/* Poin */}
              <div className="flex justify-end items-center gap-2">
                <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              onClick={() => navigate(`/reward/${reward.id}`)}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition cursor-pointer"
            >
              {/* Badge Type */}
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full w-fit mb-2 capitalize">
                {reward.type}
              </span>

              {/* Title */}
              <h3 className="font-semibold text-lg mb-4">{reward.name}</h3>

              {/* Poin + Icon */}
              <div className="flex items-center justify-end gap-2 my-text-primary font-semibold">
                <img
                  className="w-5 h-5"
                  src="/image/logo/poin.png"
                  alt="poin"
                />
                <span>{reward.points_required} Poin</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && rewards.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          Belum ada reward tersedia
        </div>
      )}
    </section>
  );
}
