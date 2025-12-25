import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";

export default function NavbarBottom() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [displayCategories, setDisplayCategories] = useState([]);
  const [showMore, setShowMore] = useState(false);

  // Fetch kategori dari API
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

  // Responsive handler
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setDisplayCategories(categories.slice(0, 4));
        setShowMore(true);
      } else if (width < 1024) {
        setDisplayCategories(categories.slice(0, 7));
        setShowMore(true);
      } else {
        setDisplayCategories(categories);
        setShowMore(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [categories]);

  return (
    <div className="bg-blue-600 py-3">
      <div className="max-w-7xl mx-auto px-6">
        <ul className="flex gap-4 md:gap-8 text-white text-xs items-center">
          {displayCategories.map((cat) => (
            <li
              key={cat.id}
              className="cursor-pointer hover:underline whitespace-nowrap"
              onClick={() => navigate(`/produk?category=${cat.slug}`)}
            >
              {cat.name}
            </li>
          ))}

          {showMore && (
            <li
              className="cursor-pointer font-semibold underline whitespace-nowrap"
              onClick={() => navigate("/produk")}
            >
              Lainnya
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
