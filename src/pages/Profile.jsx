import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../services/Api";

import UserProfileCard from "../components/profile/UserProfileCard";
import OrderList from "../components/profile/OrderList";
import OrderDetail from "../components/profile/OrderDetail";
import ProfileTabs from "../components/profile/ProfileTabs";
import AccountInfo from "../components/profile/AccountInfo";
import AddressList from "../components/profile/AddressList";

/* ============================= */
/* ===== PROFILE SKELETON ===== */
/* ============================= */

const ProfileSkeleton = () => (
  <div className="min-h-screen">
    <div className="max-w-7xl mx-auto px-6 py-40 animate-pulse">
      <div className="h-8 w-64 bg-gray-200 rounded mb-8"></div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Sidebar */}
        <div className="bg-white p-6 rounded shadow space-y-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 bg-white p-6 rounded shadow space-y-6">
          <div className="flex gap-4">
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
          </div>

          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ============================= */
/* ========= MAIN PAGE ========= */
/* ============================= */

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const { tab } = useParams();
  const navigate = useNavigate();

  const activeTab = tab || "orders";

  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (activeTab !== "orders") return;

    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        const res = await api.get("/orders/me");
        setOrders(res.data.data);
      } catch (error) {
        console.error("Gagal mengambil orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [activeTab]);

  if (loading) return <ProfileSkeleton />;
  if (!user) return null;

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-40">
        <h2 className="text-2xl font-bold mb-8">Profil Pengguna</h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <UserProfileCard />

          <div className="lg:col-span-3">
            <ProfileTabs
              activeTab={activeTab}
              onChange={(tab) => {
                navigate(`/profile/${tab}`);
                setSelectedOrderId(null);
              }}
            />

            {/* ACCOUNT */}
            {activeTab === "account" && <AccountInfo loading={false} />}

            {/* ORDERS */}
            {activeTab === "orders" && (
              <>
                {selectedOrder ? (
                  <OrderDetail
                    order={selectedOrder}
                    onBack={() => setSelectedOrderId(null)}
                  />
                ) : (
                  <OrderList orders={orders} loading={loadingOrders} />
                )}
              </>
            )}

            {/* ADDRESS */}
            {activeTab === "address" && <AddressList />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
