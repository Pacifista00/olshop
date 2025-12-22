import { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiArrowRightThin, mdiPlus } from "@mdi/js";
import { Link } from "react-router-dom";
import api from "../services/Api"; // sesuaikan path

export default function ProdukTerlaris() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProdukTerlaris = async () => {
      try {
        // endpoint contoh → sesuaikan dengan backend kamu
        const res = await api.get("/products/best-seller");

        const data = res.data.data.map((item) => ({
          id: item.id,
          title: item.name,
          price: Number(item.price),
          image: item.image?.startsWith("http")
            ? item.image
            : `${import.meta.env.VITE_API_URL}/storage/${item.image}`,
        }));

        setProducts(data);
      } catch (error) {
        console.error("Gagal mengambil produk terlaris:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdukTerlaris();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-44 bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
          Produk Terlaris
        </h2>
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

            <h3 className="text-sm font-semibold mt-2 line-clamp-2 text-gray-800">
              {item.title}
            </h3>

            <p className="text-blue-600 font-bold mt-1 text-sm">
              Rp {item.price.toLocaleString("id-ID")}
            </p>

            <button
              className="absolute bottom-3 right-3 bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center shadow hover:bg-gray-700 hover:text-white transition"
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
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full flex items-center gap-2 hover:bg-blue-700 transition text-sm"
        >
          Load More
          <Icon path={mdiArrowRightThin} size={1} />
        </Link>
      </div>
    </section>
  );
}
