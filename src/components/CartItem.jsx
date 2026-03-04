import { useState } from "react";
import Icon from "@mdi/react";
import { mdiDeleteOutline, mdiLoading } from "@mdi/js";

const CartItem = ({ item, updateQuantity, removeItem, disabled }) => {
  const [loadingType, setLoadingType] = useState(null);

  const handleUpdate = async (type, newQty) => {
    setLoadingType(type);
    try {
      await updateQuantity(item.id, newQty);
    } finally {
      setLoadingType(null);
    }
  };

  const handleRemove = async () => {
    setLoadingType("delete");
    try {
      await removeItem(item.id);
    } finally {
      setLoadingType(null);
    }
  };

  const isMinusLoading = loadingType === "minus";
  const isPlusLoading = loadingType === "plus";
  const isDeleteLoading = loadingType === "delete";

  return (
    <div
      className={`flex items-center gap-4 py-5 border-b transition ${
        disabled ? "opacity-60" : ""
      }`}
    >
      <img
        src={`${import.meta.env.VITE_API_URL}/storage/${item.image}`}
        alt={item.product}
        className="w-20 h-20 object-cover rounded shadow"
      />

      <div className="flex-1">
        <h3 className="font-semibold">{item.product}</h3>

        {disabled && (
          <p className="text-xs text-red-500 mt-1">
            Produk ini sudah tidak tersedia
          </p>
        )}

        <p className="text-sm">Rp {item.price.toLocaleString("id-ID")}</p>

        <div className="flex items-center gap-2 mt-2">
          {/* ➖ MINUS */}
          <button
            disabled={disabled || item.quantity <= 1 || loadingType}
            onClick={() => handleUpdate("minus", item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center border rounded disabled:opacity-40"
          >
            {isMinusLoading ? (
              <Icon path={mdiLoading} size={0.7} className="animate-spin" />
            ) : (
              "−"
            )}
          </button>

          <span>{item.quantity}</span>

          {/* ➕ PLUS */}
          <button
            disabled={disabled || loadingType}
            onClick={() => handleUpdate("plus", item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center border rounded disabled:opacity-40"
          >
            {isPlusLoading ? (
              <Icon path={mdiLoading} size={0.7} className="animate-spin" />
            ) : (
              "+"
            )}
          </button>
        </div>
      </div>

      {/* 🗑 DELETE */}
      <button
        disabled={isDeleteLoading}
        onClick={handleRemove}
        className="text-red-500 hover:text-red-700 transition disabled:opacity-50"
        title="Hapus"
      >
        {isDeleteLoading ? (
          <Icon path={mdiLoading} size={0.9} className="animate-spin" />
        ) : (
          <Icon path={mdiDeleteOutline} size={0.9} />
        )}
      </button>
    </div>
  );
};

export default CartItem;
