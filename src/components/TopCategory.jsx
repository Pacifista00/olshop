import Icon from "@mdi/react";
import { mdiArrowRightThin } from "@mdi/js";
import { Link } from "react-router-dom";

function TopCategory() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl lg:text-2xl font-bold">Kategori Populer</h2>

        <Link
          to="/kategori"
          className="text-sm font-medium text-blue-600 flex items-center gap-1 hover:text-blue-700 transition group"
        >
          Selengkapnya
          <span className="transition group-hover:translate-x-1">
            <Icon path={mdiArrowRightThin} size={1} />
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="relative rounded-xl overflow-hidden cursor-pointer shadow-md">
          <img
            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
            alt="Fashion"
            className="w-full h-40 md:h-56 object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
            <p className="text-white text-xl font-semibold">Elektronik</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative rounded-xl overflow-hidden cursor-pointer shadow-md">
          <img
            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
            alt="Fashion"
            className="w-full h-40 md:h-56 object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
            <p className="text-white text-xl font-semibold">Fashion</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopCategory;
