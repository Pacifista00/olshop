import Icon from "@mdi/react";
import { mdiArrowRightThin, mdiPlus } from "@mdi/js";
import { Link } from "react-router-dom";

export default function ProdukTerlaris() {
  const products = [
    {
      id: 1,
      title: "Produk A",
      price: 120000,
      image:
        "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    },
    {
      id: 2,
      title: "Produk B",
      price: 95000,
      image:
        "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    },
    {
      id: 3,
      title: "Produk C",
      price: 175000,
      image:
        "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    },
    {
      id: 4,
      title: "Produk D",
      price: 230000,
      image:
        "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    },
    {
      id: 5,
      title: "Produk E",
      price: 199000,
      image:
        "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    },
    {
      id: 6,
      title: "Produk F",
      price: 88000,
      image:
        "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    },
    {
      id: 7,
      title: "Produk G",
      price: 160000,
      image:
        "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    },
    {
      id: 8,
      title: "Produk H",
      price: 210000,
      image:
        "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    },
    {
      id: 9,
      title: "Produk I",
      price: 99000,
      image:
        "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    },
    {
      id: 10,
      title: "Produk J",
      price: 145000,
      image:
        "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    },
    {
      id: 11,
      title: "Produk K",
      price: 250000,
      image:
        "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    },
    {
      id: 12,
      title: "Produk L",
      price: 112000,
      image:
        "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl lg:text-2xl font-bold">Produk Terlaris</h2>
      </div>

      {/* Grid Responsive */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow p-3 cursor-pointer hover:shadow-lg transition relative flex flex-col"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-32 lg:h-44 object-cover rounded-lg"
            />

            <h3 className="text-sm font-semibold mt-2 line-clamp-2">
              {item.title}
            </h3>

            <p className="text-blue-600 font-bold mt-1 text-sm">
              Rp {item.price.toLocaleString("id-ID")}
            </p>

            {/* Tombol + */}
            <button
              className="absolute bottom-3 right-3 bg-white-700 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center shadow hover:bg-gray-700 hover:text-white transition"
              title="Tambah"
            >
              <Icon path={mdiPlus} size={1} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          to="/produk"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full flex items-center gap-2 cursor-pointer hover:bg-blue-700 transition"
        >
          Load More
          <Icon path={mdiArrowRightThin} size={1} />
        </Link>
      </div>
    </section>
  );
}
