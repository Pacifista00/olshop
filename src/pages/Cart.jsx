// src/components/ShoppingCart.jsx
import React, { useState, useMemo } from "react";
import CartItem from "../components/CartItem";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { checkout } from "../services/CheckoutService";

const initialCart = [
  {
    id: 1,
    name: "T-Shirt Katun Premium",
    price: 150000,
    quantity: 2,
    image: "https://picsum.photos/300?random=17",
  },
  {
    id: 2,
    name: "Celana Jeans Slim Fit",
    price: 450000,
    quantity: 1,
    image: "https://picsum.photos/300?random=17",
  },
  {
    id: 3,
    name: "Sepatu Sneakers Kulit",
    price: 750000,
    quantity: 1,
    image: "https://picsum.photos/300?random=17",
  },
];

const ShoppingCart = () => {
  const [cart, setCart] = useState(initialCart);
  const [shippingAddressId, setShippingAddressId] = useState(null);

  const handleCheckout = async () => {
    try {
      const { snapToken } = await checkout(
        "a088eb07-88c1-4c73-8df4-43d56f78c86c"
      );

      window.snap.pay(snapToken, {
        onSuccess: () => alert("Pembayaran berhasil"),
        onPending: () => alert("Menunggu pembayaran"),
        onError: () => alert("Pembayaran gagal"),
        onClose: () => alert("Popup ditutup"),
      });
    } catch (error) {
      // ← INI WAJIB
      console.error("ERROR:", error);
      console.error("RESPONSE:", error.response);
      console.error("DATA:", error.response?.data);

      alert(error.response?.data?.message || error.message || "Checkout gagal");
    }
  };

  // Fungsi untuk memperbarui kuantitas item
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Mencegah kuantitas di bawah 1

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Fungsi untuk menghapus item
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Menghitung total harga menggunakan useMemo untuk performa
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <div className="text-gray-800">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-4 pb-10 pt-44 md:pt-40">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-8">
          Keranjang Belanja
        </h1>

        {cart.length === 0 ? (
          <div className="text-center bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-600">
              Keranjang Anda kosong. Yuk, mulai belanja!
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Mulai Belanja
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Bagian Kiri: Daftar Item Keranjang */}
            <div className="lg:w-3/4 bg-white p-6 rounded-lg shadow-xl border border-indigo-100">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}
              <div className="pt-4 text-right">
                <p className="text-sm text-gray-500">
                  Total Item: **{cart.length}**
                </p>
              </div>
            </div>

            {/* Bagian Kanan: Ringkasan Pesanan */}
            <div className="lg:w-1/4">
              <div className="sticky top-4 bg-white p-6 rounded-lg shadow-xl border border-indigo-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-3">
                  Ringkasan Pesanan
                </h2>

                <div className="space-y-3 text-sm lg:text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal Produk</span>
                    <span className="font-medium">
                      Rp {cartTotal.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Biaya Pengiriman</span>
                    <span className="font-medium text-green-600">Gratis</span>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex justify-between text-base lg:text-md font-bold">
                    <span>Total Bayar</span>
                    <span className="text-blue-600">
                      Rp {cartTotal.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="mt-6 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Lanjutkan ke Pembayaran
                </button>

                <p className="text-center text-xs text-gray-500 mt-3">
                  *Pengiriman gratis untuk total di atas Rp 500.000
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
