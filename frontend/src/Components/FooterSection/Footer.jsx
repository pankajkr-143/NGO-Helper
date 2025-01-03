import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

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
        <a href="#" className="mx-4 hover:underline">
          Contact
        </a>
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
