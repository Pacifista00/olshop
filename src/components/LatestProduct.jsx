import { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiArrowRightThin, mdiPlus } from "@mdi/js";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/Api";
import { useAuth } from "../auth/AuthContext";
import SubHeading from "./SubHeading";

/* ================= SKELETON CARD ================= */
const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow p-3 flex flex-col animate-pulse">
      {/* Image */}
      <div className="w-full h-32 lg:h-44 bg-gray-200 rounded-lg mb-3" />

      {/* Title */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />

      {/* Price */}
      <div className="h-4 bg-gray-200 rounded w-1/3" />

      {/* Button circle */}
      <div className="absolute bottom-3 right-3 w-8 h-8 bg-gray-200 rounded-full" />
    </div>
  );
};

export default function LatestProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  /* ================= FETCH LATEST ================= */
  useEffect(() => {
    const fetchLatestProduct = async () => {
      try {
        const res = await api.get("/products/latest");

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
        console.error("Gagal mengambil produk terbaru:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProduct();
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

  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-5">
        <SubHeading>Produk Terbaru</SubHeading>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {loading
          ? [...Array(6)].map((_, i) => <ProductSkeleton key={i} />)
          : products.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/produk/${item.id}`)}
                className="bg-white rounded-xl shadow p-3 hover:shadow-lg transition
                relative flex flex-col cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 lg:h-44 object-cover rounded-lg shadow-sm"
                />

                <h3 className="text-sm font-semibold mt-2 line-clamp-2 min-h-10 ">
                  {item.title}
                </h3>

                <p className="my-text-primary font-bold mt-1 text-sm">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>

                {/* BUTTON ADD TO CART */}
                <button
                  disabled={authLoading}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item.id);
                  }}
                  title="Tambah ke keranjang"
                  className="absolute bottom-3 right-3 my-btn-primary 
                  w-8 h-8 rounded-full flex items-center justify-center shadow
                   transition
                  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon path={mdiPlus} size={1} />
                </button>
              </div>
            ))}
      </div>

      {/* ================= LOAD MORE ================= */}
      {!loading && (
        <div className="flex justify-center mt-8">
          <Link
            to="/produk"
            className="px-6 py-2 my-btn-primary text-white font-semibold rounded-full
            flex items-center gap-2 transition text-sm "
          >
            Load More
            <Icon path={mdiArrowRightThin} size={1} />
          </Link>
        </div>
      )}
    </section>
  );
}
