import { useEffect, useState } from "react";

function NavbarBottom() {
  const categories = [
    "Elektronik",
    "Fashion",
    "Makanan",
    "Otomotif",
    "Kesehatan",
    "Hobi",
    "Kecantikan",
    "Olahraga",
    "Gaming",
    "Perabot",
  ];

  const [displayCategories, setDisplayCategories] = useState(categories);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Mobile → tampilkan hanya 5 kategori
        setDisplayCategories(categories.slice(0, 5));
      } else {
        // Desktop → tampilkan semua
        setDisplayCategories(categories);
      }
    };

    handleResize(); // jalankan di awal
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-blue-600 bottom-bar py-3">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <ul className="flex gap-8 text-white text-xs items-center">
          {displayCategories.map((cat, index) => (
            <li key={index} className="cursor-pointer">
              {cat}
            </li>
          ))}

          {/* Tombol Lainnya muncul hanya di mobile */}
          {window.innerWidth < 768 && (
            <li
              className="cursor-pointer font-semibold underline"
              onClick={() => (window.location.href = "/kategori")}
            >
              Lainnya
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavbarBottom;
