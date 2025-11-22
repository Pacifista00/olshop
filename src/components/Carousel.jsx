import { useState } from "react";

export default function Carousel() {
  const [slide, setSlide] = useState(0);

  const images = [
    "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
    "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
    "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
  ];

  const nextSlide = () => setSlide((slide + 1) % images.length);
  const prevSlide = () => setSlide((slide - 1 + images.length) % images.length);

  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="carousel w-full rounded-2xl relative">
        <img src={images[slide]} className="w-full" />

        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
          <button className="btn btn-circle" onClick={prevSlide}>
            ❮
          </button>
          <button className="btn btn-circle" onClick={nextSlide}>
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}
