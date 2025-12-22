import React, { useEffect, useMemo, useState } from "react";
import CartItem from "../components/CartItem";
import {
  getCart,
  updateCartQty,
  removeCartItem,
} from "../services/CartService";
import { checkout } from "../services/CheckoutService";

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await getCart();
      console.log(data);
      setCart(data.data.data.items); // response Laravel
    } catch (err) {
      console.error("Gagal load cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, qty) => {
    if (qty < 1) return;

    try {
      await updateCartQty(id, qty);
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
      );
    } catch {
      alert("Gagal update quantity");
    }
  };

  const removeItem = async (id) => {
    try {
      await removeCartItem(id);
      setCart((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Gagal hapus item");
    }
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const handleCheckout = async () => {
    try {
      const { snapToken } = await checkout(
        "a088eb07-88c1-4c73-8df4-43d56f78c86c"
      );
      window.snap.pay(snapToken);
    } catch (err) {
      alert("Checkout gagal");
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Memuat keranjang...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-4 pt-40">
      <h1 className="text-xl font-bold mb-6">Keranjang Belanja</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Keranjang kosong</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* List */}
          <div className="lg:w-3/4 bg-white p-6 rounded shadow">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>

          {/* Summary */}
          <div className="lg:w-1/4 bg-white p-6 rounded shadow h-fit">
            <h2 className="font-bold mb-4">Ringkasan</h2>

            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span className="font-semibold text-blue-600">
                Rp {cartTotal.toLocaleString("id-ID")}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
