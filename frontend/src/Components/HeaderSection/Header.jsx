import { FaBars } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-blue-700 text-white py-2.5 px-5 fixed top-0 w-full z-50 shadow-md flex justify-between items-center">
      <div className="flex items-center">
        <img
          src="https://img.freepik.com/premium-vector/social-charity-heart-abstract-human-logo_23758-114.jpg?ga=GA1.1.345411300.1719397064&semt=ais_hybrid"
          alt="NGO Logo"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <button className="text-white text-2md md:hidden">
        <FaBars />
      </button>
      <nav
        id="header-nav"
        className="hidden md:flex gap-6 text-lg flex-wrap items-center"
      >
        <a
          href="#"
          className="hover:text-yellow-400 transition duration-300 ease-in-out text-base"
        >
          Home
        </a>
        <a
          href="#gallery"
          className="hover:text-yellow-400 transition duration-300 ease-in-out text-base"
        >
          Gallery
        </a>
        <a
          href="#about"
          className="hover:text-yellow-400 transition duration-300 ease-in-out text-base"
        >
          About Us
        </a>
        <a
          href="#contact"
          className="hover:text-yellow-400 transition duration-300 ease-in-out text-base"
        >
          Contact
        </a>
        <a
          href="#login"
          id="login-link"
          className="hover:text-yellow-400 transition duration-300 ease-in-out text-base"
        >
          Login/Signup
        </a>
        <a
          href="#"
          id="logout-link"
          className="hover:text-yellow-400 transition duration-300 ease-in-out text-base"
        >
          Logout
        </a>
      </nav>
    </header>
  );
};

export default Header;
