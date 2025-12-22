import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/Api";
import Icon from "@mdi/react";
import { mdiCartOutline, mdiArrowLeft, mdiLogin } from "@mdi/js";
import { useAuth } from "../auth/AuthContext"; // Pastikan path benar

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Ambil data user dari context
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/product/${id}`)
      .then((res) => setProduct(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      alert("Silakan login terlebih dahulu untuk belanja!");
      navigate("/login");
      return;
    }
    // Lanjutkan logika tambah ke keranjang (API post ke /cart dsb)
    console.log("Menambahkan ke keranjang:", product.name);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memuat...
      </div>
    );
  if (!product)
    return <div className="text-center py-20">Produk tidak ditemukan.</div>;

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${import.meta.env.VITE_API_URL}/storage/${product.image}`;

  return (
    <section className="max-w-7xl mx-auto px-6 pt-44 md:pt-40 pb-20">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-10 gap-7">
        {/* IMAGE WRAPPER */}
        <div className="w-full md:w-[420px]">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 aspect-square">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col justify-center flex-1">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm mb-2">
            {product.category?.name || "Kategori"}
          </span>

          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <p className="text-2xl font-medium text-gray-800 mb-6">
            Rp {Number(product.price).toLocaleString("id-ID")}
          </p>

          <div className="prose prose-sm text-gray-600 mb-8 max-w-none">
            <h4 className="font-bold text-gray-800">Deskripsi Produk</h4>
            <p>
              {product.description || "Tidak ada deskripsi untuk produk ini."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              <Icon path={user ? mdiCartOutline : mdiLogin} size={1} />
              {user ? "Tambah ke Keranjang" : "Login untuk Membeli"}
            </button>

            <button className="flex-1 border-2 border-gray-200 text-gray-800 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition">
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
