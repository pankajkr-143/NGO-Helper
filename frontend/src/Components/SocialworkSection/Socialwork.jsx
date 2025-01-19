import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../store/auth';
import { useNavigate } from 'react-router-dom';

const handleDonate = async (price, isLoggedIn) => {
  if (!isLoggedIn) {
    alert('Please login to make a donation');
    return;
  }
  try {
    // console.log('Initiating donation with amount:', price); 
    // Browser console log
    const response = await axios.post('http://localhost:4000/donate', { price });

    if (response && response.status === 200) {
      // console.log('Donation response:', response.data); 
      // Browser console log
      if (response.data.url) {
        window.location.href = response.data.url;
        // Redirect to Stripe checkout
      } else {
        console.error('Failed to create checkout session');
      }
    }
  } catch (error) {
    console.error('Frontend error during checkout:', error); // Browser console log
  }
};

// After the user completes the donation, redirect them to the paymentHistory page
window.addEventListener('DOMContentLoaded', async (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('session_id')) {
    try {
      const sessionId = urlParams.get('session_id');
      // console.log('Processing payment completion for session:', sessionId); 
      // Browser console log
      
      const response = await axios.get(`http://localhost:4000/complete?session_id=${sessionId}`);
      // console.log('Payment completion response:', response.data); 
      // Browser console log
      
      if (response.data.message === "Payment successful") {
        // Store payment history in localStorage or state management
        localStorage.setItem('lastPayment', JSON.stringify(response.data.paymentHistory));
        // console.log('Stored payment data:', response.data.paymentHistory); 
        // Browser console log
        
        // Navigate to payment history page with the data
        window.location.href = `/paymentHistory?transaction=${response.data.paymentHistory.transactionId}`;
      }
    } catch (error) {
      console.error('Frontend error retrieving payment details:', error); 
      // Browser console log
    }
  }
});

const Socialwork = () => {
  const { isLoggedIn, supports } = useAuth();


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
                  onClick={() => handleDonate(donationAmount, isLoggedIn)}
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