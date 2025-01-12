import { useAuth } from "../../store/auth";
 

const About = () => {

  const {user} = useAuth();

  return (
    <div className="flex flex-col items-center bg-gray-100 pt-16 pb-10 px-4 text-center">
      {/* Content Area */}
      <div className="max-w-4xl mb-8">
        <h3>welcome,
          { user ? ` ${user.username} to our website` : `to our website.`
          }</h3>
        <h2 className="text-3xl font-bold text-gray-800 mb-5">About Our Charity</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          {`"Our NGO is dedicated to empowering communities and improving the quality of life for underprivileged
          individuals through targeted programs and initiatives. We work tirelessly to address pressing social issues,
          including poverty alleviation, education for all, healthcare access, women empowerment, and environmental
          sustainability. Our mission is to create a value-driven society that fosters inclusivity, equality, and social
          justice.

          Through collaborative efforts with volunteers, donors, and partners, we implement impactful projects that bring
          sustainable solutions to the challenges faced by vulnerable populations. Our organization remains committed to
          transparency, accountability, and a long-term vision of building a world where every individual has the
          opportunity to thrive and contribute to a better future."`}
        </p>
      </div>

      {/* Action Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* Volunteer Card */}
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300 w-64 text-center p-6 cursor-pointer">
          <div className="flex justify-center mb-4">
            <img
              className="w-12"
              src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
              alt="Volunteer Icon"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Become a Volunteer</h3>
        </div>

        {/* Donate Card */}
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300 w-64 text-center p-6 cursor-pointer">
          <div className="flex justify-center mb-4">
            <img
              className="w-12"
              src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
              alt="Donate Icon"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Help Someone (Donate)</h3>
        </div>
      </div>
    </div>
  );
};

export default About;
