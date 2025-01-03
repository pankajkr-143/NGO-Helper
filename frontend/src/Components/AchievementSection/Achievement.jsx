import backimage from "../../assets/background.jpg";

const Achievement = () => {
  return (
    <div
      className="relative overflow-hidden bg-cover bg-center p-14"
      style={{
        backgroundImage: `url(${backimage})`,
      }}
    >
      {/* Background Blur Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>

      {/* Content Section */}
      <div className="relative z-10 text-center">
        <h1 className="text-white text-4xl font-bold mb-10">Our Achievements</h1>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-gray-200 text-center border-4 border-sky-500 rounded-lg p-4 hover:bg-transparent hover:text-white hover:border-sky-500 transition-all duration-700">
            <h2 className="text-3xl font-bold">10+</h2>
            <p className="mt-2">YEARS OF EXPERIENCE</p>
          </div>
          <div className="bg-gray-200 text-center border-4 border-sky-500 rounded-lg p-4 hover:bg-transparent hover:text-white hover:border-sky-500 transition-all duration-700">
            <h2 className="text-3xl font-bold">2000+</h2>
            <p className="mt-2">HAPPY CHILDREN</p>
          </div>
          <div className="bg-gray-200 text-center border-4 border-sky-500 rounded-lg p-4 hover:bg-transparent hover:text-white hover:border-sky-500 transition-all duration-700">
            <h2 className="text-3xl font-bold">100+</h2>
            <p className="mt-2">EVENTS</p>
          </div>
          <div className="bg-gray-200 text-center border-4 border-sky-500 rounded-lg p-4 hover:bg-transparent hover:text-white hover:border-sky-500 transition-all duration-700">
            <h2 className="text-3xl font-bold">40+</h2>
            <p className="mt-2">FUND RAISE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievement;
