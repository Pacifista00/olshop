import { useRef } from "react";
import Icon from "@mdi/react";
import { mdiArrowRightThin } from "@mdi/js";

export default function LatestProduct() {
  const products = [
    {
      id: 1,
      img: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
      title: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
      price: "Rp 50.000",
    },
    {
      id: 2,
      img: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
      title: "Produk 2",
      price: "Rp 60.000",
    },
    {
      id: 3,
      img: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
      title: "Produk 3",
      price: "Rp 70.000",
    },
    {
      id: 4,
      img: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
      title: "Produk 4",
      price: "Rp 80.000",
    },
    {
      id: 5,
      img: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
      title: "Produk 5",
      price: "Rp 90.000",
    },
    {
      id: 6,
      img: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
      title: "Produk 6",
      price: "Rp 100.000",
    },
    {
      id: 7,
      img: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
      title: "Produk 7",
      price: "Rp 110.000",
    },
    {
      id: 8,
      img: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
      title: "Produk 8",
      price: "Rp 120.000",
    },
  ];

  const dragRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - dragRef.current.offsetLeft;
    scrollLeft = dragRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - dragRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // speed
    dragRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-4 ">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl lg:text-2xl font-bold">Produk Terbaru</h2>

        <button
          className="text-sm font-medium text-blue-600 flex items-center gap-1 
        hover:text-blue-700 transition-colors duration-300 group"
        >
          Selengkapnya
          <span className="transform transition-transform duration-300 group-hover:translate-x-1">
            <Icon path={mdiArrowRightThin} size={1} />
          </span>
        </button>
      </div>

      {/* MOBILE: drag-to-scroll */}
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
              className="min-w-[90px] bg-white shadow rounded-lg p-2 select-none flex flex-col justify-between h-[140px]"
            >
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-20 object-cover rounded"
              />
              <h3 className="text-xs font-semibold mt-1 line-clamp-2 min-h-[32px]">
                {p.title}
              </h3>
              <p className="text-[10px] text-gray-600">{p.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP: grid */}
      <div className="hidden lg:grid lg:grid-cols-8 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow rounded-lg p-2 flex flex-col justify-between h-[180px]"
          >
            <img
              src={p.img}
              alt={p.title}
              className="w-full h-24 object-cover rounded"
            />
            <h3 className="text-sm mt-2 font-semibold line-clamp-2 min-h-[40px]">
              {p.title}
            </h3>
            <p className="text-xs text-gray-600">{p.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
