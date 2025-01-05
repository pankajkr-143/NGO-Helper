import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="bg-gray-100 text-blue-700 p-8">
      {/* Page Header */}
      <h1 className="text-4xl font-bold text-center mt-12 mb-8">Contact Us</h1>

      {/* Contact Form Section */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <h2 className="text-2xl font-semibold mb-4 text-gray-500">Get in Touch</h2>
        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              required
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Subject</label>
            <input
              type="text"
              placeholder="Enter subject"
              required
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Message</label>
            <textarea
              placeholder="Your message..."
              rows="5"
              required
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Address and Map Section */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-600">Our Location</h2>
        <p className="text-blue-500">NGO Helpers Office</p>
        <p className="text-blue-500">123 Main Street, Bhopal, Madhya Pradesh 12345</p>
        <div className="mt-4">
          <div className="relative w-full max-w-2xl mx-auto border border-gray-400 rounded overflow-hidden">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1832.8436170867828!2d77.488556720265!3d23.254465830302614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4137a3ce800d%3A0x4d0d43e45e0cd1ae!2sRishipuram%20phase%203!5e0!3m2!1sen!2sin!4v1736089071981!5m2!1sen!2sin"
              className="w-full aspect-[16/9]"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="social-icons mt-8 flex justify-center items-center gap-x-5">
        <FaFacebook className="text-blue-700 text-xl hover:text-blue-500 cursor-pointer duration-500" />
        <FaTwitter className="text-blue-700 text-xl hover:text-blue-400 cursor-pointer duration-500" />
        <FaInstagram className="text-blue-700 text-xl hover:text-pink-500 cursor-pointer duration-500" />
      </div>
    </div>
  );
};

export default ContactUs;
