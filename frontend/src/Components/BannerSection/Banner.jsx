import { useState, useEffect } from "react";
import bannerImage1 from "../../assets/bannerimage1.jpg";
import bannerImage3 from "../../assets/bannerimage3.jpg";
import bannerImage4 from "../../assets/bannerimage4.jpg";
import bannerImage5 from "../../assets/bannerimage5.jpg";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const Banner = () => {
  const images = [bannerImage1, bannerImage3, bannerImage4, bannerImage5];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative h-[680px] w-full overflow-hidden shadow-blue-700 shadow-2xl">
      {/* Banner Images with Animations */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-[2000ms] ease-in-out ${
            index === currentIndex
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-110 z-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
      ))}

      {/* Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>

      {/* Navigation Arrows with Sky Blue Color and Black Shadow */}
      <div
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 cursor-pointer p-3 rounded-full bg-transparent text-sky-500 hover:text-sky-700 hover:scale-110 transition-all shadow-lg shadow-black hidden md:block"
        onClick={handlePrev}
      >
        <SlArrowLeft size={60} />
      </div>
      <div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 cursor-pointer p-3 rounded-full bg-transparent text-sky-500 hover:text-sky-700 hover:scale-110 transition-all shadow-lg shadow-black hidden md:block"
        onClick={handleNext}
      >
        <SlArrowRight size={60} />
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white scale-150 shadow-lg"
                : "bg-gray-400 scale-100"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
