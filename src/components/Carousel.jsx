import { useState } from "react";

export default function Carousel() {
  const [slide, setSlide] = useState(0);

  const images = [
    "/image/carousel/Artboard 1@300x.png",
    "/image/carousel/Artboard 2@300x.png",
  ];

  const nextSlide = () => setSlide((slide + 1) % images.length);
  const prevSlide = () => setSlide((slide - 1 + images.length) % images.length);

  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div
        className="relative w-full overflow-hidden rounded-2xl 
        shadow
                  aspect-16/6 
                  sm:aspect-16/5 
                  md:aspect-16/4 
                  xl:aspect-16/3"
      >
        <img src={images[slide]} className="w-full h-full object-cover" />

        <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 md:px-10">
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
