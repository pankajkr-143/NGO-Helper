const Testimonial = () => {
  return (
    <section className="bg-gray-100 pb-10 px-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        What People Say
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {/* Testimonial 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center w-72">
          <p className="text-gray-600 italic mb-4">
            {`"NGO Helpers has been a game-changer for our campaigns!"`}
          </p>
          <strong className="text-gray-800">- Alex, Volunteer</strong>
        </div>
        {/* Testimonial 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center w-72">
          <p className="text-gray-600 italic mb-4">
            {`"Managing donations has never been so simple and transparent."`}
          </p>
          <strong className="text-gray-800">- Sarah, Donor</strong>
        </div>
        {/* Testimonial 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center w-72">
          <p className="text-gray-600 italic mb-4">
            {`"An essential tool for any NGO striving for impact."`}
          </p>
          <strong className="text-gray-800">- John, NGO Manager</strong>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
