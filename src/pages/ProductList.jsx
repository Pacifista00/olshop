import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import api from "../services/Api";
import { useAuth } from "../auth/AuthContext";
import SubHeading from "../components/SubHeading";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  const { user, loading: authLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categorySlug = searchParams.get("category") || "";

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.data);
      } catch (err) {
        console.error("Gagal mengambil kategori", err);
      }
    };

    fetchCategories();
  }, []);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get("/products", {
          params: {
            category: categorySlug || undefined,
            sort,
            page,
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
          })),
        );

        setPagination(res.data.meta);
      } catch (err) {
        console.error("Gagal mengambil produk", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug, sort, page]);

  /* ================= RESET PAGE ================= */
  useEffect(() => {
    setPage(1);
  }, [categorySlug, sort]);

  /* ================= ADD TO CART ================= */
  const handleAddToCart = async (e, productId) => {
    e.preventDefault(); // cegah buka detail
    e.stopPropagation();

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

      alert("Produk ditambahkan ke keranjang");
    } catch (err) {
      console.error("Gagal tambah ke keranjang", err);
      alert("Gagal menambahkan produk");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pt-44 md:pt-40 pb-20">
      {/* ================= TITLE + FILTER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <SubHeading className="text-gray-800">Daftar Produk</SubHeading>

        <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0 text-sm">
          {/* Filter Kategori */}
          <select
            value={categorySlug}
            onChange={(e) =>
              navigate(
                e.target.value
                  ? `/produk?category=${e.target.value}`
                  : "/produk",
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

      {/* ================= PRODUCTS GRID ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {loading
          ? [...Array(12)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 animate-pulse rounded-lg"
              />
            ))
          : products.map((item) => (
              <Link
                to={`/produk/${item.id}`}
                key={item.id}
                className="group relative"
              >
                <div className="relative rounded-lg border border-gray-100 shadow-md hover:shadow-lg transition p-4 flex flex-col h-full">
                  {/* ADD TO CART */}
                  <button
                    disabled={authLoading}
                    onClick={(e) => handleAddToCart(e, item.id)}
                    className="absolute bottom-3 right-3 bg-white w-8 h-8 rounded-full
                               flex items-center justify-center shadow
                               hover:bg-gray-800 hover:text-white transition
                               disabled:opacity-50"
                    title="Tambah ke keranjang"
                  >
                    <Icon path={mdiPlus} size={0.9} />
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

      {/* ================= PAGINATION ================= */}
      {!loading && pagination.last_page > 1 && (
        <div className="flex justify-center mt-12 gap-2 flex-wrap">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(pagination.last_page)].map((_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`px-4 py-2 text-sm border rounded-lg ${
                  page === pageNumber ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            disabled={page === pagination.last_page}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
