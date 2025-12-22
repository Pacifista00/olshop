import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import api from "../services/Api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categorySlug = searchParams.get("category") || "";

  // Fetch kategori
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await api.get("/category");
      setCategories(res.data.data);
    };

    fetchCategories();
  }, []);

  // Fetch produk (berdasarkan slug)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get("/products", {
          params: {
            category: categorySlug || undefined,
            sort,
          },
        });

        setProducts(
          res.data.data.map((item) => ({
            id: item.id,
            name: item.name,
            price: Number(item.price),
            stock: item.stock,
            image: item.image?.startsWith("http")
              ? item.image
              : `${import.meta.env.VITE_API_URL}/storage/${item.image}`,
          }))
        );
      } catch (err) {
        console.error("Gagal mengambil produk", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug, sort]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 pt-44 md:pt-40 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 pt-44 md:pt-40 pb-20">
      {/* Title + Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
          Daftar Produk
        </h2>

        <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0 text-sm">
          {/* Filter Kategori */}
          <select
            value={categorySlug}
            onChange={(e) =>
              navigate(
                e.target.value
                  ? `/produk?category=${e.target.value}`
                  : "/produk"
              )
            }
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm"
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Sorting */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm"
          >
            <option value="">Urutkan</option>
            <option value="price_low">Harga Terendah</option>
            <option value="price_high">Harga Tertinggi</option>
            <option value="name_asc">Nama A-Z</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map((item) => (
          <Link to={`/produk/${item.id}`} key={item.id} className="group">
            <div className="relative rounded-lg border border-gray-100 shadow-md hover:shadow-lg transition p-4 flex flex-col h-full">
              <button className="absolute bottom-3 right-3 bg-white rounded-full p-1 shadow-md hover:bg-gray-700 hover:text-white transition">
                <Icon path={mdiPlus} size={0.8} />
              </button>

              <div className="rounded-lg h-32 sm:h-48 lg:h-56 overflow-hidden mb-4 bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>

              <p className="text-xs text-gray-500">Stok: {item.stock}</p>
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm">
                {item.name}
              </h3>

              <div className="mt-auto">
                <p className="text-blue-600 font-bold text-sm">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
