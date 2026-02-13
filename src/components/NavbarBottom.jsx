import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavbarBottom() {
  const navigate = useNavigate();

  // ✅ Manual categories
  const categories = [
    { id: 1, name: "Fashion", slug: "fashion" },
    { id: 2, name: "Makanan", slug: "makanan" },
    { id: 3, name: "Herbal", slug: "herbal" },
    { id: 4, name: "Kecantikan", slug: "kecantikan" },
    { id: 5, name: "Alat Tulis", slug: "alat-tulis" },
    { id: 6, name: "Elektronik", slug: "elektronik" },
    { id: 7, name: "Kesehatan", slug: "kesehatan" },
    { id: 8, name: "Olahraga", slug: "olahraga" },
    { id: 9, name: "Buku", slug: "buku" },
    { id: 10, name: "Minuman", slug: "minuman" },
  ];

  const [displayCategories, setDisplayCategories] = useState([]);
  const [showMore, setShowMore] = useState(false);

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
  }, []);

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
