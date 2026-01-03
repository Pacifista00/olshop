import { useState } from "react";

export default function Carousel() {
  const [slide, setSlide] = useState(0);

  const images = [
    "/image/carousel/2148036986.jpg",
    "/image/carousel/2148134027.jpg",
    "/image/carousel/2149339768.jpg",
  ];

  const nextSlide = () => setSlide((slide + 1) % images.length);
  const prevSlide = () => setSlide((slide - 1 + images.length) % images.length);

  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="carousel w-full rounded-2xl relative">
        <img src={images[slide]} className="w-full h-72 object-cover" />

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
