import React from "react";
import Icon from "@mdi/react";
import { mdiPlus, mdiMinus, mdiTrashCanOutline } from "@mdi/js";

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b py-4 gap-4">
      {/* LEFT: IMAGE + NAME */}
      <div className="flex items-center space-x-4">
        {/* IMAGE */}
        <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* PRODUCT DETAIL */}
        <div>
          <h3 className="text-base font-semibold text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-500">
            Harga: Rp {item.price.toLocaleString("id-ID")}
          </p>

          {/* SUBTOTAL (Mobile) */}
          <p className="text-sm font-semibold text-gray-800 mt-1 sm:hidden">
            Subtotal: Rp {(item.price * item.quantity).toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8">
        {/* QUANTITY CONTROL */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="text-gray-600 hover:text-red-500 disabled:opacity-40 px-2 py-1"
          >
            <Icon path={mdiMinus} size={0.9} />
          </button>

          <span className="px-4 py-1 text-sm font-medium bg-gray-100">
            {item.quantity}
          </span>

          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="text-gray-600 hover:text-green-500 px-2 py-1"
          >
            <Icon path={mdiPlus} size={0.9} />
          </button>
        </div>

        {/* SUBTOTAL (Desktop) */}
        <p className="hidden sm:block text-base font-semibold text-gray-800 w-28 text-right">
          Rp {(item.price * item.quantity).toLocaleString("id-ID")}
        </p>

        {/* DELETE BUTTON */}
        <button
          onClick={() => removeItem(item.id)}
          className="text-gray-400 hover:text-red-600 transition-colors"
        >
          <Icon path={mdiTrashCanOutline} size={1} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
