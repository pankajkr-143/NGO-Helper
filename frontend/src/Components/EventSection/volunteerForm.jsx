import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';


const VolunteerForm = () => {
   const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    Dob: '',
    phoneNo: '',
    email: '',
    city: '',
    state: '',
    address: '',
    pincode: '',
    availability: '',
    skills: '',
    experience: '',
    interest: '',
    reason: '',
    reference: ''
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/volunteer/volunteer', formData);
      console.log('Form submitted successfully', response.data);
      alert('Form Data sent successfully');
      navigate('/');


    } catch (error) {
      console.error('Error submitting form', error);
      alert('Form Data not successfully');

    }
  };

  return (
    <div className="bg-gray-100 text-blue-700 p-8">
      <h1 className="text-4xl font-bold text-center mt-12 mb-8">Volunteer Form</h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <h2 className="text-2xl font-semibold mb-4 text-gray-500">Get in Touch</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInput}
              placeholder="Enter your full name"
              required
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="Dob"
              value={formData.Dob}
              onChange={handleInput}
              required
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="number"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleInput}
              placeholder="Enter your phone number"
              required
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInput}
              placeholder="Enter your email"
              required
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInput}
              placeholder="Enter your city"
              required
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInput}
              placeholder="Enter your state"
              required
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInput}
              placeholder="Enter your address"
              required
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Pincode</label>
            <input
              type="number"
              name="pincode"
              value={formData.pincode}
              onChange={handleInput}
              placeholder="Enter your pincode"
              required
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Availability</label>
            <input
              type="date"
              name="availability"
              value={formData.availability}
              onChange={handleInput}
              required
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInput}
              placeholder="Enter your skills"
              required
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInput}
              placeholder="Enter your experience"
              required
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Interest</label>
            <input
              type="text"
              name="interest"
              value={formData.interest}
              onChange={handleInput}
              placeholder="Enter your interest"
              required
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Reason</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleInput}
              placeholder="Enter your reason"
              required
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Reference</label>
            <input
              type="text"
              name="reference"
              value={formData.reference}
              onChange={handleInput}
              placeholder="Enter your reference"
              required
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;
