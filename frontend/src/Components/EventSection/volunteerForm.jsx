import { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from "../../store/auth";

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

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.username,
        email: user.email,
        Dob: '',
        phoneNo: '',
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
    }
  }, [user]);

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
      alert('Form Data not submitted successfully');
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-6">
      <h1 className="text-4xl font-bold text-center mt-6 mb-8">Volunteer Form</h1>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-1 text-gray-700">Get in Touch</h2>
        <form className="space-y-0" onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInput}
              placeholder="Enter your full name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Date of Birth</label>
            <input
              type="date"
              name="Dob"
              value={formData.Dob}
              onChange={handleInput}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Phone Number</label>
            <input
              type="number"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleInput}
              placeholder="Enter your phone number"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInput}
              placeholder="Enter your email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInput}
              placeholder="Enter your city"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInput}
              placeholder="Enter your state"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInput}
              placeholder="Enter your address"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Pincode</label>
            <input
              type="number"
              name="pincode"
              value={formData.pincode}
              onChange={handleInput}
              placeholder="Enter your pincode"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Availability</label>
            <input
              type="date"
              name="availability"
              value={formData.availability}
              onChange={handleInput}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2 ">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInput}
              placeholder="Enter your skills"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInput}
              placeholder="Enter your experience"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Interest</label>
            <input
              type="text"
              name="interest"
              value={formData.interest}
              onChange={handleInput}
              placeholder="Enter your interest"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Reason</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleInput}
              placeholder="Enter your reason"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-lg font-medium ">Reference</label>
            <input
              type="text"
              name="reference"
              value={formData.reference}
              onChange={handleInput}
              placeholder="Enter your reference"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-8 text-gray-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;
