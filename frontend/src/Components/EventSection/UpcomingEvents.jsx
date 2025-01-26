import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { motion } from 'framer-motion';
import image1 from '../../assets/Image1.webp';
import image2 from '../../assets/Image2.webp';
import image3 from '../../assets/Image3.webp';

const UpcomingEvents = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleVolunteerClick = () => {
    if (!isLoggedIn) {
      alert('Please login to volunteer');
      navigate('/login');
    } else {
      navigate('/volunteer');
    }
  };

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Community Clean-Up Drive',
      date: 'March 1, 2025',
      description: 'Join us to clean our community parks and streets.',
      image: image1,
    },
    {
      id: 2,
      title: 'Charity Fundraising Marathon',
      date: 'April 15, 2025',
      description: 'Participate in a marathon to raise funds for education.',
      image: image2,
    },
    {
      id: 3,
      title: 'Tree Plantation Campaign',
      date: 'May 10, 2025',
      description: 'Help us plant trees to make the world greener.',
      image: image3,
    },
  ]);

  return (
    <section className="bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-600 text-white py-16 px-6 sm:px-12 md:px-24 lg:px-36">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-cyan-400">
          Upcoming <span className="text-yellow-500">Events</span>
        </h2>
        <p className="text-xl font-light text-blue-200">
          Join our community and make a difference by participating in these impactful events.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <motion.div
            key={event.id}
            className="bg-gradient-to-t from-blue-800 via-blue-500 to-blue-300 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: 0 }}
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-40 object-cover"
            />
            <div className="flex flex-col flex-grow p-4">
              <h3 className="text-lg font-semibold text-gray-100">{event.title}</h3>
              <p className="text-xs text-gray-300 mb-2">{event.date}</p>
              <p className="text-sm text-gray-200 flex-grow">{event.description}</p>
              <div className="flex justify-between mt-4">
                <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-300">
                  Learn More
                </button>
                <button
                  onClick={handleVolunteerClick}
                  className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors duration-300"
                >
                  Volunteer
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
