import React, { useEffect, useMemo, useState } from "react";
import CartItem from "../components/CartItem";
import {
  getCart,
  updateCartQty,
  removeCartItem,
} from "../services/CartService";
import { checkout } from "../services/CheckoutService";
import { previewVoucher } from "../services/VoucherService";

const SHIPPING_COST = 20000;

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== VOUCHER STATE =====
  const [voucherInput, setVoucherInput] = useState("");
  const [voucherCode, setVoucherCode] = useState(null);
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherLoading, setVoucherLoading] = useState(false);
  const [voucherInfo, setVoucherInfo] = useState(null);

  useEffect(() => {
    loadCart();
  }, []);
  useEffect(() => {
    if (voucherCode) {
      alert("Voucher dilepas karena keranjang berubah");
      removeVoucher();
    }
  }, [cart]);

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data.data.data.items);
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

  // ===== SUBTOTAL =====
  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  // ===== TOTAL =====
  const total = useMemo(() => {
    const result = cartSubtotal + SHIPPING_COST - voucherDiscount;
    return result > 0 ? result : 0;
  }, [cartSubtotal, voucherDiscount]);

  // ===== APPLY VOUCHER =====
  const applyVoucher = async () => {
    if (!voucherInput) {
      alert("Masukkan kode voucher");
      return;
    }

    setVoucherLoading(true);

    try {
      const data = await previewVoucher(voucherInput);

      setVoucherCode(data.voucher.code);
      setVoucherDiscount(data.discount);
      setVoucherInfo(data.voucher); // ⬅️ simpan info
    } catch (err) {
      alert(err.response?.data?.message || "Voucher tidak valid");
    } finally {
      setVoucherLoading(false);
    }
  };

  // ===== REMOVE VOUCHER =====
  const removeVoucher = () => {
    setVoucherCode(null);
    setVoucherDiscount(0);
    setVoucherInput("");
    setVoucherInfo(null);
  };

  // ===== CHECKOUT =====
  const handleCheckout = async () => {
    try {
      const { snapToken } = await checkout(
        "a088eb07-88c1-4c73-8df4-43d56f78c86c",
        voucherCode // null jika tidak ada
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
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* LIST */}
          <div className="w-full lg:w-3/4 bg-white p-6 rounded shadow">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>

          {/* SUMMARY */}
          <div className="w-full lg:w-1/4 bg-white p-6 rounded shadow h-fit">
            <h2 className="font-bold mb-4">Ringkasan</h2>

            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>Rp {cartSubtotal.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Biaya Pengiriman</span>
              <span>Rp {SHIPPING_COST.toLocaleString("id-ID")}</span>
            </div>

            {/* ===== VOUCHER ===== */}
            <div className="mt-4">
              <label className="text-sm font-medium">Kode Voucher</label>

              {!voucherCode ? (
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                    placeholder="Masukkan voucher"
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                  <button
                    onClick={applyVoucher}
                    disabled={voucherLoading}
                    className="bg-gray-800 text-white px-4 rounded text-sm disabled:opacity-50"
                  >
                    {voucherLoading ? "Mengecek..." : "Gunakan"}
                  </button>
                </div>
              ) : (
                <div className="mt-2 bg-green-50 border border-green-200 rounded p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-green-700">
                      Voucher: {voucherCode}
                    </span>
                    <button
                      onClick={removeVoucher}
                      className="text-red-500 text-xs"
                    >
                      Hapus
                    </button>
                  </div>
                  <div className="flex justify-between mt-1 text-green-600">
                    <span>
                      Diskon{" "}
                      {voucherInfo?.type === "percentage"
                        ? `${voucherInfo.value}%`
                        : `Rp ${voucherInfo.value.toLocaleString("id-ID")}`}
                    </span>
                    <span>- Rp {voucherDiscount.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              )}
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-blue-600">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
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
