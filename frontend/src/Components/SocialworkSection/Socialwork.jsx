import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../store/auth';

const handleDonate = async (price, isLoggedIn, user) => {
  if (!isLoggedIn) {
    alert('Please login to make a donation');
    return;
  }

  try {
    const response = await axios.post('http://localhost:4000/donations/donate', { price, userId: user._id });

    if (response && response.status === 200) {
      console.log('Donation response:', response.data); 
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        console.error('Failed to create checkout session');
      }
    }
  } catch (error) {
    console.error('Frontend error during checkout:', error); 
  }
};

const Socialwork = () => {
  const { supports, isLoggedIn, user } = useAuth();

  return (
    <div className="container mx-auto px-10 py-12 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">Support us in our social Work Initiatives</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {Array.isArray(supports) && supports.map((curElem, index) => {
          const { title, description, imageLink, alt, donationAmount } = curElem;
          return (
            <div className="card flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300" key={index}>
              <img src={imageLink} alt={alt} className="w-full h-40 object-cover" />
              <div className="card-content p-6 text-center flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <p className="text-gray-600 text-sm mt-2">{description}</p>
                <button
                    onClick={() => handleDonate(donationAmount, isLoggedIn, user)}
                    className="donate-button mt-4 inline-block py-2 px-7 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Donate {donationAmount}
                  </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Socialwork;

// past this data in database to show the support card in the website

// [
//   {
//     "title": "Support Education",
//     "description": "Help us provide quality education to underprivileged children.",
//     "imageLink": "https://c0.wallpaperflare.com/preview/610/331/738/balloons-charity-col…",
//     "alt": "Education support image",
//     "donationAmount": 5000
//   },
//   {
//     "title": "Healthcare Assistance",
//     "description": "Contribute to providing essential healthcare services in rural areas.",
//     "imageLink": "https://c0.wallpaperflare.com/preview/610/331/738/balloons-charity-col…",
//     "alt": "Healthcare support image",
//     "donationAmount": 3000
//   },
//   {
//     "title": "Food Donation",
//     "description": "Join us in our mission to eliminate hunger by donating food packages.",
//     "imageLink": "https://c0.wallpaperflare.com/preview/610/331/738/balloons-charity-col…",
//     "alt": "Food donation image",
//     "donationAmount": 2000
//   },
//   {
//     "title": "Disaster Relief",
//     "description": "Support our disaster relief efforts to help affected communities.",
//     "imageLink": "https://c0.wallpaperflare.com/preview/610/331/738/balloons-charity-col…",
//     "alt": "Disaster relief image",
//     "donationAmount": 7000
//   },
//   {
//     "title": "Clean Water Initiative",
//     "description": "Ensure access to clean and safe drinking water for all.",
//     "imageLink": "https://c0.wallpaperflare.com/preview/610/331/738/balloons-charity-col…",
//     "alt": "Clean water initiative image",
//     "donationAmount": 4000
// }
// ]