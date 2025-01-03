import chairmanImage from "../../assets/WhatsApp Image 2024-08-17 at 19.08.06_a8fe3340.jpg";
import vicechairmanImage from "../../assets/WhatsApp Image 2024-08-17 at 19.08.06_a8fe3340.jpg";
import secretary from "../../assets/WhatsApp Image 2024-08-17 at 19.08.06_a8fe3340.jpg";

const Teamsection = () => {
  return (
    <section className="bg-white text-center py-12 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">Meet our Team</h2>
      <div className="flex flex-wrap justify-evenly gap-8">
        {/* Chairman */}
        <div className="w-72 bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:-translate-y-2 hover:scale-105 duration-700">
          <img
            src={chairmanImage}
            alt="Mrs. Shikha Khedle"
            className="w-full h-72 object-cover transition-transform duration-500 ease-in-out"
          />
          <div className="bg-blue-700 text-white py-4">
            <h3 className="text-lg font-semibold">Mrs. Name</h3>
            <p className="italic">(Chairman)</p>
          </div>
        </div>
        {/* Vice Chairman */}
        <div className="w-72 bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:-translate-y-2 hover:scale-105 duration-700">
          <img
            src={vicechairmanImage}
            alt="Mrs. Priyanka Rai"
            className="w-full h-72 object-cover transition-transform duration-500 ease-in-out"
          />
          <div className="bg-blue-700 text-white py-4">
            <h3 className="text-lg font-semibold">Mrs. Name</h3>
            <p className="italic">(Vice Chairman)</p>
          </div>
        </div>
        {/* Secretary */}
        <div className="w-72 bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:-translate-y-2 hover:scale-105 duration-700">
          <img
            src={secretary}
            alt="Dr. Raghvendra Khedle"
            className="w-full h-72 object-cover transition-transform duration-500 ease-in-out"
          />
          <div className="bg-blue-700 text-white py-4">
            <h3 className="text-lg font-semibold">Dr. Name</h3>
            <p className="italic">(Secretary)</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teamsection;
