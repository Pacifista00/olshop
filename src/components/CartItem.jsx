import React from "react";

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <img
        src={`${import.meta.env.VITE_API_URL}/storage/${item.image}`}
        alt={item.product}
        className="w-20 h-20 object-cover rounded"
      />

      <div className="flex-1">
        <h3 className="font-semibold">{item.product}</h3>
        <p className="text-sm text-gray-500">
          Rp {item.price.toLocaleString("id-ID")}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-2 border rounded"
          >
            −
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-2 border rounded"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={() => removeItem(item.id)}
        className="text-red-600 text-sm"
      >
        Hapus
      </button>
    </div>
  );
};

export default CartItem;
