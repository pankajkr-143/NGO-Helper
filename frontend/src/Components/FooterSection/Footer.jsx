import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center">
      <div className="footer-links mb-4">
        <a href="#" className="mx-4 hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="mx-4 hover:underline">
          Terms of Service
        </a>
        <Link
          to="/contactus"
          className="hover:text-yellow-400 transition duration-300 ease-in-out text-base"
        >
          Contact Us
        </Link>
        
      </div>
      <div className="social-icons mt-4 flex justify-center items-center gap-x-5">
  <FaFacebook className=" text-white text-xl hover:text-blue-500 cursor-pointer" />
  <FaTwitter className="text-white text-xl hover:text-blue-400 cursor-pointer" />
  <FaInstagram className=" text-white text-xl hover:text-pink-500 cursor-pointer" />
</div>

      <p className="mt-4">&copy; 2024 NGO Helpers. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
