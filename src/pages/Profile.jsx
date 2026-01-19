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

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const { tab } = useParams();
  const navigate = useNavigate();

  // ⬇️ TAB AKTIF DARI URL
  const activeTab = tab || "orders";

  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (activeTab !== "orders") return;

    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data.data);
      } catch (error) {
        console.error("Gagal mengambil orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [activeTab]);

  if (loading) return <div>Memuat user...</div>;
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

            {activeTab === "account" && <AccountInfo />}

            {activeTab === "orders" && (
              <>
                {loadingOrders && <p>Memuat pesanan...</p>}

                {!loadingOrders && selectedOrder && (
                  <OrderDetail
                    order={selectedOrder}
                    onBack={() => setSelectedOrderId(null)}
                  />
                )}

                {!loadingOrders && !selectedOrder && (
                  <OrderList orders={orders} onSelect={setSelectedOrderId} />
                )}

                {!loadingOrders && orders.length === 0 && (
                  <p className="text-gray-500">Belum ada riwayat pesanan.</p>
                )}
              </>
            )}

            {activeTab === "address" && <AddressList />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
