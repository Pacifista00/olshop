import React, { useEffect, useMemo, useState } from "react";
import CartItem from "../components/CartItem";
import {
  getCart,
  updateCartQty,
  removeCartItem,
} from "../services/CartService";
import { checkout } from "../services/CheckoutService";
import { previewVoucher } from "../services/VoucherService";
import api from "../services/Api";
import { useAuth } from "../auth/AuthContext";

const ShoppingCart = () => {
  const { user } = useAuth();

  const userPoints = user?.point?.total_points ?? 0;

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== POINT STATE =====
  const [pointsUsed, setPointsUsed] = useState(0);

  const POINT_VALUE = 5000;

  // ===== VOUCHER STATE =====
  const [voucherInput, setVoucherInput] = useState("");
  const [voucherCode, setVoucherCode] = useState(null);
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherLoading, setVoucherLoading] = useState(false);
  const [voucherInfo, setVoucherInfo] = useState(null);

  // ===== SHIPPING STATE =====
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [shippingError, setShippingError] = useState(null);

  const shippingUnavailable =
    !shippingLoading && (shippingOptions.length === 0 || shippingError);

  // ===== SHIPPING COST =====
  const shippingCost = selectedShipping?.price || 0;

  useEffect(() => {
    loadCart();
  }, []);
  useEffect(() => {
    setPointsUsed(0);
  }, [cart]);
  useEffect(() => {
    if (voucherCode) {
      alert("Voucher dilepas karena keranjang berubah");
      removeVoucher();
    }
  }, [cart]);
  useEffect(() => {
    if (voucherCode) {
      removeVoucher();
    }
  }, [selectedShipping]);
  useEffect(() => {
    if (cart.length > 0) {
      loadShipping();
      setSelectedShipping(null); // reset jika cart berubah
    }
  }, [cart]);
  const loadShipping = async () => {
    setShippingLoading(true);
    setShippingError(null);

    try {
      const res = await api.get("/preview-shipping");
      setShippingOptions(res.data.shipping_options || []);
    } catch (err) {
      const message = err.response?.data?.message;

      setShippingOptions([]);

      // 🔑 mapping error backend
      if (message?.includes("belum ditambahkan")) {
        setShippingError({
          type: "NO_ADDRESS",
          message,
        });
      } else if (message?.includes("belum ditentukan")) {
        setShippingError({
          type: "NO_DEFAULT",
          message,
        });
      } else {
        setShippingError({
          type: "GENERAL",
          message: message || "Ongkir tidak tersedia",
        });
      }
    } finally {
      setShippingLoading(false);
    }
  };

  const loadCart = async () => {
    try {
      const response = await getCart();

      const items = response?.data?.data?.items ?? [];

      setCart(items);
    } catch (err) {
      console.error("Gagal load cart:", err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, qty) => {
    if (qty < 1) return;

    try {
      await updateCartQty(id, qty);
      setCart((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: qty } : item,
        ),
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
  const pointDiscount = useMemo(() => {
    const maxDiscount = Math.max(
      0,
      cartSubtotal - voucherDiscount + shippingCost,
    );

    const requestedDiscount = pointsUsed * POINT_VALUE;

    return Math.min(requestedDiscount, maxDiscount);
  }, [pointsUsed, cartSubtotal, voucherDiscount, shippingCost]);
  const maxUsablePoints = Math.min(
    userPoints,
    Math.floor(
      Math.max(0, cartSubtotal - voucherDiscount + shippingCost) / POINT_VALUE,
    ),
  );

  // ===== TOTAL =====
  const total = useMemo(() => {
    const result =
      cartSubtotal + shippingCost - voucherDiscount - pointDiscount;
    return result > 0 ? result : 0;
  }, [cartSubtotal, voucherDiscount, shippingCost, pointDiscount]);

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
    if (!selectedShipping) {
      alert("Silakan pilih kurir terlebih dahulu");
      return;
    }

    try {
      const { snapToken } = await checkout({
        courier_code: selectedShipping.courier_code,
        courier_service_code: selectedShipping.courier_service_code,
        shipping_price: selectedShipping.price,
        voucher_code: voucherCode,
        points_used: pointsUsed,
      });

      window.snap.pay(snapToken);
    } catch (err) {
      alert(err.response?.data?.message || "Checkout gagal");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-4 pt-40 animate-pulse">
        <h1 className="text-xl font-bold mb-6 bg-gray-200 h-6 w-48 rounded"></h1>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* LIST SKELETON */}
          <div className="w-full lg:w-3/4 bg-white p-6 rounded shadow space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded"></div>

                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY SKELETON */}
          <div className="w-full lg:w-1/4 bg-white p-6 rounded shadow space-y-4">
            <div className="h-5 bg-gray-200 rounded w-1/2"></div>

            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="flex gap-7">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>

            <div className="h-12 bg-gray-200 rounded w-full mt-6"></div>
          </div>
        </div>
      </div>
    );
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
              {selectedShipping ? (
                <span>Rp {shippingCost.toLocaleString("id-ID")}</span>
              ) : (
                <span className="text-gray-400 italic">Belum dipilih</span>
              )}
            </div>

            {/* ===== PILIH KURIR ===== */}
            <div className="mt-4">
              <label className="text-sm font-medium">Pilih Pengiriman</label>

              {shippingLoading && (
                <p className="text-sm text-gray-500 mt-1">Memuat ongkir...</p>
              )}

              {!shippingLoading && shippingError && (
                <div className="mt-2 text-sm bg-red-50 border border-red-200 rounded p-3">
                  <p className="font-medium text-red-600">
                    {shippingError.message}
                  </p>

                  {(shippingError.type === "NO_ADDRESS" ||
                    shippingError.type === "NO_DEFAULT") && (
                    <button
                      onClick={() =>
                        (window.location.href = "/profile/address")
                      }
                      className="mt-2 text-xs text-blue-600 underline"
                    >
                      Atur alamat pengiriman
                    </button>
                  )}
                </div>
              )}

              <div className="mt-2 space-y-2">
                {shippingOptions.map((opt, idx) => (
                  <label
                    key={idx}
                    className={`flex justify-between items-center border rounded p-3 cursor-pointer text-sm
          ${
            selectedShipping?.courier_code === opt.courier_code &&
            selectedShipping?.courier_service_code === opt.courier_service_code
              ? "border-blue-600 bg-blue-50"
              : "border-gray-200"
          }
        `}
                  >
                    <div>
                      <input
                        type="radio"
                        name="shipping"
                        className="mr-2"
                        checked={
                          selectedShipping?.courier_code === opt.courier_code &&
                          selectedShipping?.courier_service_code ===
                            opt.courier_service_code
                        }
                        onChange={() => setSelectedShipping(opt)}
                      />
                      <span className="font-medium uppercase">
                        {opt.courier_code} {opt.courier_service_code}
                      </span>
                      <div className="text-xs text-gray-500">
                        Estimasi {opt.etd || "-"} hari
                      </div>
                    </div>

                    <span className="font-semibold">
                      Rp {opt.price.toLocaleString("id-ID")}
                    </span>
                  </label>
                ))}
              </div>
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

            {/* ===== POINT ===== */}
            <div className="mt-4">
              <label className="text-sm font-medium">
                Gunakan Point (tersedia:{" "}
                {(userPoints || 0).toLocaleString("id-ID")})
              </label>

              <input
                type="number"
                min={0}
                max={maxUsablePoints}
                value={pointsUsed}
                onChange={(e) => {
                  let val = parseInt(e.target.value || 0);

                  if (val < 0) val = 0;
                  if (val > userPoints) val = userPoints;

                  setPointsUsed(val);
                }}
                className="w-full border rounded px-3 py-2 text-sm mt-1"
                placeholder="Masukkan jumlah point"
              />

              {pointsUsed > 0 && (
                <div className="flex justify-between text-green-600 text-sm mt-1">
                  <span>Diskon Point</span>
                  <span>- Rp {pointDiscount.toLocaleString("id-ID")}</span>
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
              disabled={!selectedShipping || shippingUnavailable}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded
             disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Bayar Sekarang
            </button>
            {shippingUnavailable && (
              <p className="mt-2 text-xs text-red-500 text-center">
                Tidak bisa checkout sebelum ongkir tersedia
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
