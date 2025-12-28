import Icon from "@mdi/react";
import { mdiDeleteOutline } from "@mdi/js";

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="flex items-center gap-4 py-5">
      <img
        src={`${import.meta.env.VITE_API_URL}/storage/${item.image}`}
        alt={item.product}
        className="w-20 h-20 object-cover rounded shadow"
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
        className="text-red-500 hover:text-red-700 transition"
        title="Hapus"
      >
        <Icon path={mdiDeleteOutline} size={0.9} />
      </button>
    </div>
  );
};

export default CartItem;
