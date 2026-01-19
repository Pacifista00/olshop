import formatRupiah from "../../utils/formatRupiah";

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
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h3 className="text-2xl font-bold">Detail Pesanan #{order.id}</h3>
        <button onClick={onBack} className="text-blue-600 text-sm">
          ← Kembali
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-100 p-4 rounded-lg mb-6">
        <div>
          <p className="text-sm text-gray-500">Tanggal</p>
          <p className="font-semibold">{order.date}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total</p>
          <p className="font-bold text-blue-600">{formatRupiah(order.total)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <span
            className={`px-3 py-1 text-xs rounded-full ${getStatusClass(order.status)}`}
          >
            {order.status}
          </span>
        </div>
      </div>

      <h4 className="font-bold mb-2">Item Pesanan</h4>
      <div className="space-y-2">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between p-4 border rounded-lg">
            <span>{item.name}</span>
            <span>
              {item.qty} x {formatRupiah(item.price)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetail;
