// src/pages/ProfilePage.jsx
import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";

// NOTE: Pastikan Anda memiliki komponen UserProfileCard.jsx di direktori yang sama
// Jika Anda tidak memilikinya, Anda bisa membuat file terpisah untuk UserProfileCard
// atau menggunakan placeholder <div> untuk bagian tersebut.
const getInitials = (name) => {
  if (!name) return "?";
  const names = name.split(" ");
  // Mengambil huruf pertama dari kata pertama (dan kata kedua jika ada)
  const initials = names.map((n) => n[0]).join("");
  return initials.substring(0, 2).toUpperCase();
};
const UserProfileCard = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Memuat...</div>;
  if (!user) return null;

  // Akses data user (sesuaikan jika struktur datanya user.user atau langsung user)
  const userData = user.user || user;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        {/* Logika Avatar vs Inisial */}
        {userData.avatarUrl ? (
          <img
            src={userData.avatarUrl}
            alt="Avatar"
            className="w-24 h-24 rounded-full mb-4 border-4 border-blue-200 object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full mb-4 border-4 border-blue-200 bg-blue-500 flex items-center justify-center text-white text-2xl font-bold uppercase">
            {getInitials(userData.name)}
          </div>
        )}

        <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
        <p className="text-sm text-gray-500">{userData.email}</p>

        <button className="mt-4 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-150">
          Edit Profil
        </button>
      </div>
    </div>
  );
};

// --- DATA TIRUAN (MOCK DATA) ---

const mockUser = {
  name: "Budi Santoso",
  email: "budi.santoso@example.com",
  phone: "0812-3456-7890",
  address: "Jl. Merdeka No. 45, Jakarta Pusat, DKI Jakarta",
  avatarUrl:
    "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
};

const mockOrders = [
  {
    id: "2025001",
    date: "2025-11-15",
    total: 250000,
    status: "Selesai",
    items: [
      { name: "Kemeja Katun Biru", qty: 1, price: 150000 },
      { name: "Kaos Polos Hitam", qty: 2, price: 50000 },
    ],
    shippingAddress: "Jl. Merdeka No. 45, Jakarta Pusat",
    paymentMethod: "Transfer Bank BCA",
  },
  {
    id: "2025002",
    date: "2025-11-18",
    total: 550000,
    status: "Dalam Proses",
    items: [
      { name: "Sepatu Lari Premium", qty: 1, price: 500000 },
      { name: "Kaos Kaki Sport", qty: 5, price: 10000 },
    ],
    shippingAddress: "Jl. Pahlawan No. 10, Dago, Bandung",
    paymentMethod: "Kartu Kredit Visa",
  },
  {
    id: "2025003",
    date: "2025-11-20",
    total: 80000,
    status: "Dibatalkan",
    items: [{ name: "Topi Baseball", qty: 1, price: 80000 }],
    shippingAddress: "Apartemen Cempaka Lantai 5, Jakarta Barat",
    paymentMethod: "Gopay",
  },
];

// --- FUNGSI UTILITAS ---

// Fungsi untuk memformat angka menjadi format Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

// --- KOMPONEN DETAIL PESANAN ---

const OrderDetail = ({ order, onBack }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-800";
      case "Dalam Proses":
        return "bg-yellow-100 text-yellow-800";
      case "Dibatalkan":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 border-b pb-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">
          Detail Pesanan #{order.id}
        </h3>
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 flex items-center font-medium transition duration-150 text-sm"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Kembali ke Daftar Pesanan
        </button>
      </div>

      {/* Ringkasan Pesanan (Responsif: 1 kolom di mobile, 3 kolom di md) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-100 p-4 rounded-lg mb-6 shadow-sm">
        <div className="border-b md:border-b-0 md:border-r border-gray-200 md:pr-4 pb-2 md:pb-0">
          <p className="text-sm text-gray-500">Tanggal Pesanan</p>
          <p className="font-semibold text-gray-800">{order.date}</p>
        </div>
        <div className="border-b md:border-b-0 md:border-r border-gray-200 md:px-4 pb-2 md:pb-0">
          <p className="text-sm text-gray-500">Total Pembayaran</p>
          <p className="font-bold text-lg text-blue-600">
            {formatRupiah(order.total)}
          </p>
        </div>
        <div className="md:pl-4">
          <p className="text-sm text-gray-500">Status</p>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(
              order.status
            )}`}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* Alamat & Pembayaran (Responsif: 1 kolom di mobile, 2 kolom di md) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <h4 className="font-semibold mb-2 text-gray-700">
            Alamat Pengiriman
          </h4>
          <p className="text-gray-600 text-sm">{order.shippingAddress}</p>
        </div>
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <h4 className="font-semibold mb-2 text-gray-700">
            Metode Pembayaran
          </h4>
          <p className="text-gray-600 text-sm">{order.paymentMethod}</p>
        </div>
      </div>

      {/* Daftar Item */}
      <h4 className="text-xl font-bold mb-4 text-gray-800">Item Pesanan:</h4>
      <div className="space-y-2">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-white border rounded-lg"
          >
            <span className="text-gray-700 font-medium">{item.name}</span>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {item.qty} x {formatRupiah(item.price)}
              </p>
              <p className="font-semibold text-gray-800">
                {formatRupiah(item.qty * item.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- KOMPONEN HALAMAN UTAMA ---

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("orders"); // Default ke tab orders
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const { user, loading } = useAuth();

  if (loading) return <div>Memuat...</div>;
  if (!user) return null;

  // Akses data user (sesuaikan jika struktur datanya user.user atau langsung user)
  const userData = user.user || user;

  // Cari objek pesanan yang sesuai dengan ID yang dipilih
  const selectedOrder = mockOrders.find(
    (order) => order.id === selectedOrderId
  );

  // Fungsi untuk menampilkan konten berdasarkan tab yang aktif
  const renderContent = () => {
    const getStatusClass = (status) => {
      switch (status) {
        case "Selesai":
          return "bg-green-100 text-green-700";
        case "Dalam Proses":
          return "bg-yellow-100 text-yellow-700";
        case "Dibatalkan":
          return "bg-red-100 text-red-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    };

    switch (activeTab) {
      case "account":
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="space-y-3">
              <p className="text-gray-600">
                <strong>Nama:</strong> {userData.name}
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> {userData.email}
              </p>
              <p className="text-gray-600">
                <strong>Telepon:</strong> {userData.phone}
              </p>
            </div>
          </div>
        );

      case "orders":
        // Tampilan Detail Pesanan
        if (selectedOrder) {
          return (
            <div className="p-6 bg-white rounded-lg shadow">
              <OrderDetail
                order={selectedOrder}
                onBack={() => setSelectedOrderId(null)}
              />
            </div>
          );
        }

        // Tampilan Daftar Pesanan (Default)
        return (
          <div className="rounded-lg ">
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  className="
        p-4 border border-gray-200 rounded-xl 
        flex flex-col sm:flex-row 
        sm:items-center items-start 
        justify-between gap-4
        hover:shadow-md transition duration-150
      "
                >
                  {/* Kolom 1: Info Pesanan */}
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800">
                      Pesanan #{order.id}
                      <span
                        className={`text-xs font-medium mx-1 px-2 py-1 rounded-full ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </span>

                    <span className="text-sm text-gray-500">{order.date}</span>
                  </div>

                  {/* Kolom 2: Status & Total */}
                  <div
                    className="
    flex flex-row 
    sm:items-center justify-between 
    gap-4
    sm:ml-auto 
    text-left sm:text-right 
    w-full sm:w-auto
  "
                  >
                    <span className="font-semibold text-lg text-blue-600 min-w-[120px]">
                      {formatRupiah(order.total)}
                    </span>

                    <button
                      onClick={() => setSelectedOrderId(order.id)}
                      className="
      px-4 py-2 text-sm font-medium 
      text-white bg-blue-600 rounded-lg 
      hover:bg-blue-600 transition
    "
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}

              {mockOrders.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  Belum ada riwayat pesanan.
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const tabs = [
    { id: "account", label: "Informasi Akun" },
    { id: "orders", label: "Riwayat Pesanan" },
  ];

  return (
    // Padding responsif: p-4 di mobile, sm:p-8 di tablet/desktop
    <div className=" min-h-screen text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 pb-10 text-center pt-44 md:pt-40">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-8 text-start">
          Profil Pengguna
        </h2>

        {/* Tata letak grid responsif: 1 kolom di mobile, 4 kolom di layar besar (lg) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-start">
          {/* Kolom Kiri: Kartu Profil (Ambil 1 kolom di lg) */}
          <div className="lg:col-span-1">
            <UserProfileCard user={mockUser} />
          </div>

          {/* Kolom Kanan: Konten Tab (Ambil 3 kolom di lg) */}
          <div className="lg:col-span-3">
            {/* Navigasi Tab: flex-wrap memastikan tab melompat ke baris baru jika terlalu sempit */}
            <div className="flex flex-wrap border-b border-gray-200 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedOrderId(null); // Reset detail pesanan saat pindah tab
                  }}
                  // Padding horizontal responsif: px-3 di mobile, sm:px-4 di tablet/desktop
                  className={`py-3 px-3 sm:px-4 text-sm font-medium transition duration-150 ease-in-out ${
                    activeTab === tab.id
                      ? "border-b-4 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Konten Tab Aktif */}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
