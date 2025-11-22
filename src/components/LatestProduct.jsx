import { useRef } from "react";
import Icon from "@mdi/react";
import { mdiArrowRightThin, mdiPlus } from "@mdi/js";
import { Link } from "react-router-dom";

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

  const handleMouseLeave = () => (isDown = false);
  const handleMouseUp = () => (isDown = false);

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - dragRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    dragRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
          Produk Terbaru
        </h2>

        <Link
          to="/produk"
          className="text-sm font-medium text-blue-600 flex items-center gap-1 hover:text-blue-700 transition group"
        >
          Selengkapnya
          <span className="transition group-hover:translate-x-1">
            <Icon path={mdiArrowRightThin} size={1} />
          </span>
        </Link>
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
              className="relative min-w-[90px] bg-white shadow rounded-lg p-2 select-none flex flex-col justify-between h-[140px]"
            >
              {/* BUTTON + */}
              {/* <button className="absolute bottom-2 right-2 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center hover:scale-110 transition">
                <Icon path={mdiPlus} size={0.7} />
              </button> */}

              <img
                src={p.img}
                alt={p.title}
                className="w-full h-20 object-cover rounded"
              />
              <h3 className="text-xs font-semibold mt-1 line-clamp-2 min-h-[32px] text-gray-800">
                {p.title}
              </h3>
              <p className="text-[10px] text-gray-600">{p.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden lg:grid lg:grid-cols-8 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="relative bg-white shadow rounded-lg p-2 h-[180px]"
          >
            {/* BUTTON + */}
            <button className="absolute bottom-2 right-2 bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center hover:scale-110 transition cursor-pointer">
              <Icon path={mdiPlus} size={0.8} />
            </button>

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
