import { useEffect, useRef, useState } from "react";
import Icon from "@mdi/react";
import { mdiArrowRightThin, mdiPlus } from "@mdi/js";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/Api";
import { useAuth } from "../auth/AuthContext";
import SubHeading from "./SubHeading";

export default function TopProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDragging = useRef(false);

  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const dragRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  /* ================= FETCH LATEST PRODUCTS ================= */
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await api.get("/products/best-seller");

        const data = res.data.data.map((item) => ({
          id: item.id,
          img: item.image?.startsWith("http")
            ? item.image
            : `${import.meta.env.VITE_API_URL}/storage/${item.image}`,
          title: item.name,
          stock: item.stock,
          price: `Rp ${Number(item.price).toLocaleString("id-ID")}`,
        }));

        setProducts(data);
      } catch (error) {
        console.error("Gagal mengambil produk terlaris:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  /* ================= ADD TO CART ================= */
  const handleAddToCart = async (productId) => {
    // Tunggu auth selesai
    if (authLoading) return;

    // Jika belum login → ke login
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

  /* ================= DRAG SCROLL (MOBILE) ================= */
  const handleMouseDown = (e) => {
    isDown = true;
    isDragging.current = false;
    startX = e.pageX - dragRef.current.offsetLeft;
    scrollLeft = dragRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    isDragging.current = true;
    const x = e.pageX - dragRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    dragRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseLeave = () => (isDown = false);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-4">
        <div className="bg-blue-600 p-5 rounded-xl">
          {/* ================= HEADER SKELETON ================= */}
          <div className="flex items-center justify-between mb-5">
            <div className="h-6 w-44 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
            <div className="h-4 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
          </div>

          {/* ================= MOBILE SKELETON ================= */}
          <div className="block lg:hidden">
            <div className="flex gap-4 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="relative min-w-[90px] bg-white shadow rounded-lg p-2
                           flex flex-col justify-between h-[140px]"
                >
                  {/* image */}
                  <div
                    className="w-full h-20 rounded shadow-sm
                                bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
                  />

                  {/* title */}
                  <div className="mt-1 space-y-1">
                    <div
                      className="h-3 rounded
                                  bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
                    />
                    <div
                      className="h-3 w-2/3 rounded
                                  bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
                    />
                  </div>

                  {/* price */}
                  <div
                    className="h-2 w-1/2 rounded
                                bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
                  />

                  {/* button */}
                  <div
                    className="absolute bottom-2 right-2 w-6 h-6 rounded-full
                                bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ================= DESKTOP SKELETON ================= */}
          <div className="hidden lg:grid lg:grid-cols-8 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="relative bg-white shadow rounded-lg p-2 h-[180px]"
              >
                {/* button */}
                <div
                  className="absolute bottom-2 right-2 w-7 h-7 rounded-full
                              bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
                />

                {/* image */}
                <div
                  className="w-full h-24 rounded shadow-sm
                              bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
                />

                {/* title */}
                <div className="mt-2 space-y-2">
                  <div
                    className="h-4 rounded
                                bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
                  />
                  <div
                    className="h-4 w-2/3 rounded
                                bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
                  />
                </div>

                {/* price */}
                <div
                  className="mt-2 h-3 w-1/2 rounded
                              bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      <div className="bg-blue-600 p-5 rounded-xl">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between mb-5">
          <SubHeading className="text-white">Produk Terlaris</SubHeading>

          <Link
            to="/produk"
            className="text-xs lg:text-sm font-medium text-white flex items-center hover:text-gray-100 transition group"
          >
            Selengkapnya
            <span className="transition group-hover:translate-x-1">
              <Icon path={mdiArrowRightThin} size={1} />
            </span>
          </Link>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="block lg:hidden">
          <div
            ref={dragRef}
            className="flex gap-4 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {products.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  if (!isDragging.current) {
                    navigate(`/produk/${p.id}`);
                  }
                }}
                className="relative min-w-[90px] bg-white shadow rounded-lg p-2
             select-none flex flex-col justify-between h-[140px]
             cursor-pointer"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-20 object-cover rounded shadow-sm"
                />

                <h3 className="text-xs font-semibold mt-1 line-clamp-2 min-h-8 text-gray-800">
                  {p.title}
                </h3>

                <p className="text-[10px] text-gray-600">{p.price}</p>

                <button
                  disabled={authLoading}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(p.id);
                  }}
                  className="absolute bottom-2 right-2 bg-blue-600 text-white w-6 h-6 rounded-full
               flex items-center justify-center hover:scale-110 transition
               disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon path={mdiPlus} size={0.6} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden lg:grid lg:grid-cols-8 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/produk/${p.id}`)}
              className="relative bg-white shadow rounded-lg p-2 h-[180px]
             cursor-pointer hover:shadow-lg transition"
            >
              <button
                disabled={authLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(p.id);
                }}
                className="absolute bottom-2 right-2 bg-blue-600 text-white w-7 h-7 rounded-full
               flex items-center justify-center hover:scale-110 transition
               disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon path={mdiPlus} size={0.8} />
              </button>

              <img
                src={p.img}
                alt={p.title}
                className="w-full h-24 object-cover rounded shadow-sm"
              />

              <h3 className="text-sm mt-2 font-semibold line-clamp-2 min-h-10">
                {p.title}
              </h3>
              <p className="text-xs text-gray-600">{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
