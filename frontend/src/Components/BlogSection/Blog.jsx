import { useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import blogImage1 from "../../assets/blog1.jpg"; // Replace with your images

const Blog = () => {
  const images = [
    blogImage1,
    blogImage1,
    blogImage1,
    blogImage1,
    blogImage1,
    blogImage1,
    blogImage1,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 py-12">
      <h1 className="text-3xl font-bold mb-8 text-black">Our Blogs</h1>
      <div className="relative flex items-center justify-center w-full">
        {/* Fancy Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-8 z-20 text-gray-700 hover:text-gray-900 transform hover:scale-110 transition-all duration-300"
        >
          <SlArrowLeft
            size={60}
            className="text-blue-500 hover:drop-shadow-lg"
          />
        </button>

        {/* Carousel */}
        <div className="relative flex w-[800px] h-[400px] overflow-hidden items-center">
          {images.map((image, index) => {
            const position = (index - currentIndex + images.length) % images.length;

            return (
              <div
                key={index}
                className={`absolute transition-all duration-700 ease-in-out ${
                  position === 0
                    ? "left-12 scale-95 translate-x-[-100px] opacity-85 z-5" // Left card (more visible)
                    : position === 1
                    ? "left-1/2 transform -translate-x-1/2 scale-125 h-[320px] opacity-100 z-10" // Center card (larger)
                    : position === 2
                    ? "right-12 scale-95 translate-x-[100px] opacity-85 z-5" // Right card (more visible)
                    : "opacity-0 scale-75 z-0" // Hidden cards
                }`}
              >
                <img
                  src={image}
                  alt={`Blog ${index + 1}`}
                  className="w-[220px] h-[300px] object-cover rounded-lg shadow-lg"
                />
              </div>
            );
          })}
        </div>

        {/* Fancy Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 z-20 text-gray-700 hover:text-gray-900 transform hover:scale-110 transition-all duration-300"
        >
          <SlArrowRight
            size={60}
            className="text-blue-500 hover:drop-shadow-lg"
          />
        </button>
      </div>
    </div>
  );
};

export default Blog;
