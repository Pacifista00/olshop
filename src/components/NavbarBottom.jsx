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
  const [isMobile, setIsMobile] = useState(false); // Untuk tombol 'Lainnya'

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      // Definisikan breakpoint yang sesuai dengan Tailwind CSS (default)
      const mdBreakpoint = 768; // Mobile < 768px
      const lgBreakpoint = 1024; // Laptop/PC >= 1024px

      let newDisplayedCategories = categories;
      let mobileStatus = false;

      if (windowWidth < mdBreakpoint) {
        // **Mobile:** < 768px (Tampilkan 3)
        newDisplayedCategories = categories.slice(0, 4);
        mobileStatus = true; // Munculkan tombol 'Lainnya'
      } else if (windowWidth >= mdBreakpoint && windowWidth < lgBreakpoint) {
        // **Laptop/Tablet (MD-LG):** 768px - 1023px (Tampilkan 5)
        newDisplayedCategories = categories.slice(0, 7);
        mobileStatus = true; // Tetap munculkan tombol 'Lainnya'
      } else {
        // **PC (LG+):** >= 1024px (Tampilkan Semua)
        newDisplayedCategories = categories;
        mobileStatus = false;
      }

      setDisplayCategories(newDisplayedCategories);
      setIsMobile(mobileStatus);
    };

    handleResize(); // Jalan pertama kali
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Dependensi kosong, hanya jalan saat mount dan unmount

  return (
    <div className="bg-blue-600 py-3">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <ul className="flex gap-4 md:gap-8 text-white text-xs items-center">
          {displayCategories.map((cat, index) => (
            <li key={index} className="cursor-pointer">
              {cat}
            </li>
          ))}

          {/* Tombol 'Lainnya' muncul jika tidak semua kategori ditampilkan */}
          {isMobile && (
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
