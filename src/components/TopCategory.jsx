import Icon from "@mdi/react";
import { mdiArrowRightThin } from "@mdi/js";
import { Link } from "react-router-dom";
import SubHeading from "./SubHeading";

function TopCategory() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between mb-5">
        <SubHeading>Kategori Populer</SubHeading>

        <Link
          to="/kategori"
          className="text-xs lg:text-sm font-medium text-blue-600 flex items-center gap-1 hover:text-blue-700 transition group"
        >
          Selengkapnya
          <span className="transition group-hover:translate-x-1">
            <Icon path={mdiArrowRightThin} size={1} />
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ELEKTRONIK */}
        <Link
          to="/produk?category=elektronik"
          className="relative rounded-xl overflow-hidden cursor-pointer shadow-md group"
        >
          <img
            src="/image/top_category/electro.png"
            alt="Elektronik"
            className="w-full h-40 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <p className="text-white text-xl font-semibold">Elektronik</p>
          </div>
        </Link>

        {/* FASHION */}
        <Link
          to="/produk?category=fashion"
          className="relative rounded-xl overflow-hidden cursor-pointer shadow-md group"
        >
          <img
            src="/image/top_category/fashion.png"
            alt="Fashion"
            className="w-full h-40 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <p className="text-white text-xl font-semibold">Fashion</p>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default TopCategory;
