import { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiArrowRightThin, mdiPlus } from "@mdi/js";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/Api";
import { useAuth } from "../auth/AuthContext";

export default function ProdukTerlaris() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  /* ================= FETCH BEST SELLER ================= */
  useEffect(() => {
    const fetchProdukTerlaris = async () => {
      try {
        const res = await api.get("/products/best-seller");

        const data = res.data.data.map((item) => ({
          id: item.id,
          title: item.name,
          stock: item.stock,
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

  /* ================= ADD TO CART ================= */
  const handleAddToCart = async (productId) => {
    if (authLoading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await api.post("/cart/store", {
        product_id: productId,
        quantity: 1,
      });

      alert("Produk berhasil ditambahkan ke keranjang");
    } catch (error) {
      console.error("Gagal menambahkan ke keranjang:", error);
      alert("Gagal menambahkan produk ke keranjang");
    }
  };

  /* ================= LOADING ================= */
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
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
          Produk Terlaris
        </h2>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/produk/${item.id}`)}
            className="bg-white rounded-xl shadow p-3 hover:shadow-lg transition
             relative flex flex-col cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-32 lg:h-44 object-cover rounded-lg"
            />

            <h3 className="text-sm font-semibold mt-2 line-clamp-2 min-h-10 text-gray-800">
              {item.title}
            </h3>

            <p className="text-blue-600 font-bold mt-1 text-sm">
              Rp {item.price.toLocaleString("id-ID")}
            </p>

            {/* BUTTON ADD TO CART */}
            <button
              disabled={authLoading}
              onClick={(e) => {
                e.stopPropagation(); // ⛔ agar tidak trigger navigasi
                handleAddToCart(item.id);
              }}
              title="Tambah ke keranjang"
              className="absolute bottom-3 right-3 bg-white text-gray-800
               w-8 h-8 rounded-full flex items-center justify-center shadow
               hover:bg-gray-800 hover:text-white transition
               disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon path={mdiPlus} size={1} />
            </button>
          </div>
        ))}
      </div>

      {/* ================= LOAD MORE ================= */}
      <div className="flex justify-center mt-8">
        <Link
          to="/produk"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full
                     flex items-center gap-2 hover:bg-blue-700 transition text-sm"
        >
          Load More
          <Icon path={mdiArrowRightThin} size={1} />
        </Link>
      </div>
    </section>
  );
}
