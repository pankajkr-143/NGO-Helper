import galleryimage1 from "../../assets/blog1.jpg";
import galleryimage2 from "../../assets/bannerimage1.jpg";
import galleryimage3 from "../../assets/bannerimage2.jpg";
import galleryimage4 from "../../assets/bannerimage3.jpg";

const images = [
  { src: galleryimage1, caption: "Education" },
  { src: galleryimage2, caption: "Health Care" },
  { src: galleryimage3, caption: "Environment" },
  { src: galleryimage4, caption: "Education" },
  { src: galleryimage2, caption: "Empowerment" },
  { src: galleryimage4, caption: "Welfare" },
  { src: galleryimage1, caption: "Welfare" },
  { src: galleryimage3, caption: "Education" },
  { src: galleryimage4, caption: "Welfare" },
  { src: galleryimage3, caption: "Empowerment" },
  { src: galleryimage1, caption: "Welfare" },
  { src: galleryimage2, caption: "PEducation" },
];

const Gallery = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
      <h1 className="text-4xl font-bold text-center mb-12">My Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <figure
            key={index}
            className="relative overflow-hidden rounded-xl shadow-lg group"
          >
            {/* Image */}
            <img
              src={image.src}
              alt={image.caption}
              className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[40%] group-hover:grayscale-0"
            />

            {/* Caption */}
            <figcaption className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-800 via-blue-500 to-sky-500 text-white py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-sm font-medium shadow-md">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
