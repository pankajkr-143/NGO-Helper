import Medicalimage from "../../assets/Medical.jpeg";
import climate from "../../assets/climate.jpeg";
import slumAreaEducation from "../../assets/slumAreaEducation.jpeg";
import EssentialSupport from "../../assets/Essential Support.jpeg";
import food from "../../assets/food.jpeg";
import FundraisingEvents from "../../assets/Fundraising Events.jpeg";

const Socialwork = () => {
  return (
    <div className="container mx-auto px-10 py-12 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Social Work Initiatives</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
        <div className=" flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300">
          <img
            src={climate}
            alt="Climate Control"
            className="w-full h-40 object-cover"
          />
          <div className="card-content p-6 text-center flex-1">
            <h3 className="text-xl font-semibold text-gray-800">Climate Control</h3>
            <p className="text-gray-600 text-sm mt-2">Contribution: Rs. 600 per Tree</p>
            <a
              href="#"
              className="donate-button mt-4 inline-block py-2 px-7 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Donate
            </a>
          </div>
        </div>

        <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300">
          <img
            src={slumAreaEducation}
            alt="Teaching In Slum Area"
            className="w-full h-40 object-cover"
          />
          <div className="card-content p-6 text-center flex-1">
            <h3 className="text-xl font-semibold text-gray-800">Teaching In Slum Area</h3>
            <p className="text-gray-600 text-sm mt-2">Contribution: Rs. 400 per child</p>
            <a
              href="#"
              className="donate-button mt-4 inline-block py-2 px-7 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Donate
            </a>
          </div>
        </div>

        <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300">
          <img
            src={EssentialSupport}
            alt="Essential Support"
            className="w-full h-40 object-cover"
          />
          <div className="card-content p-6 text-center flex-1">
            <h3 className="text-xl font-semibold text-gray-800">Essential Support</h3>
            <p className="text-gray-600 text-sm mt-2">Contribution: Rs. 700 per person</p>
            <a
              href="#"
              className="donate-button mt-4 inline-block py-2 px-7 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Donate
            </a>
          </div>
        </div>

        <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300">
          <img
            src={food}
            alt="Food Distribution"
            className="w-full h-40 object-cover"
          />
          <div className="card-content p-6 text-center flex-1">
            <h3 className="text-xl font-semibold text-gray-800">Food Distribution</h3>
            <p className="text-gray-600 text-sm mt-2">Contribution: Rs. 1100 per packet</p>
            <a
              href="#"
              className="donate-button mt-4 inline-block py-2 px-7 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Donate
            </a>
          </div>
        </div>

        <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300">
          <img
            src={FundraisingEvents}
            alt="Fundraising Events"
            className="w-full h-40 object-cover"
          />
          <div className="card-content p-6 text-center flex-1">
            <h3 className="text-xl font-semibold text-gray-800">Fundraising Events</h3>
            <p className="text-gray-600 text-sm mt-2">Contribution: Rs. 900 per person</p>
            <a
              href="#"
              className="donate-button mt-4 inline-block py-2 px-7 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Donate
            </a>
          </div>
        </div>

        <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300">
          <img
            src={Medicalimage}
            alt="Medical Donation"
            className="w-full h-40 object-cover"
          />
          <div className="card-content p-6 text-center flex-1">
            <h3 className="text-xl font-semibold text-gray-800">Medical Donation</h3>
            <p className="text-gray-600 text-sm mt-2">Contribution: Rs. 1000 per person</p>
            <a
              href="#"
              className="donate-button mt-4 inline-block py-2 px-7 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Donate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Socialwork;
