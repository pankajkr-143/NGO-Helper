import educationImage from "../../assets/education1.jpeg";
import foodImage from "../../assets/food.jpeg";

const Mission = () => {
  return (
    <div className="bg-white w-full py-10 px-4 flex flex-col">
      {/* Mission Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto px-3">
        {/* Mission Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {`"Our mission is to motivate and enable people to build a more inclusive and compassionate
            society. We focus on fostering self-awareness, empathy,
            and accountability in both children and adults. Through our
            initiatives, we seek to tackle societal issues such as poverty,
            unequal access to education, and the scarcity of essential resources."`}
          </p>
        </div>
        {/* Mission Image */}
        <div className="w-full md:w-1/2">
          <img
            src={educationImage}
            alt="Group of People Working for a Cause"
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>
      </div>

      {/* Vision Section */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8 max-w-7xl mx-auto mt-16 px-3">
        {/* Vision Image */}
        <div className="w-full md:w-1/2">
          <img
            src={foodImage}
            alt="Group of People Working for a Cause"
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>
        {/* Vision Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {`"Our vision is to create a world where every individual has equal
            opportunities to thrive and lead a dignified life. We aspire to build
            a society rooted in compassion, justice, and sustainability, ensuring access
            to quality education, resources, and support systems for all. Through collective efforts,
            we aim to eradicate poverty, nurture human potential"`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mission;
