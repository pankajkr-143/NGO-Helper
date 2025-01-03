const Feature = () => {
  return (
    <section className="bg-gray-100 py-8 px-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Our Features
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {/* Campaign Management */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center w-72">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Campaign Management
          </h3>
          <p className="text-gray-600">
            Streamline your campaigns and reach more donors efficiently.
          </p>
        </div>
        {/* Donation Tracking */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center w-72">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Donation Tracking
          </h3>
          <p className="text-gray-600">
            Track and manage donations with ease and transparency.
          </p>
        </div>
        {/* Volunteer Coordination */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center w-72">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Volunteer Coordination
          </h3>
          <p className="text-gray-600">
            Engage and organize your volunteer network effectively.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Feature;
