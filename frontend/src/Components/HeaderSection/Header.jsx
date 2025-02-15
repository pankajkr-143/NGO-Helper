import { FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Header = () => {
  const { isLoggedIn, user } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLinkClick = () => setMobileMenuOpen(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
    console.log("user:", user);
  }, [isLoggedIn, user]);

  return (
    <header className="bg-blue-700 text-white py-3 px-5 fixed top-0 w-full z-50 shadow-lg flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="https://img.freepik.com/premium-vector/social-charity-heart-abstract-human-logo_23758-114.jpg"
          alt="NGO Logo"
          className="w-10 h-10 rounded-full"
        />
      </div>

      {/* Hamburger Icon for Mobile */}
      <button
        className="text-white text-2xl md:hidden ml-auto"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        <FaBars />
      </button>

      {/* Navigation Menu */}
      <nav
        className={`absolute top-full right-0 w-28 bg-blue-700 transition-all duration-300 ease-in-out md:static md:w-auto md:flex md:gap-4 md:justify-center ${
          isMobileMenuOpen ? "block" : "hidden md:flex"
        }`}
      >
        <Link to="/" className="block py-2 px-4 hover:text-yellow-400" onClick={handleLinkClick}>
          Home
        </Link>
        <Link to="/Gallery" className="block py-2 px-4 hover:text-yellow-400" onClick={handleLinkClick}>
          Gallery
        </Link>
        <Link to="/aboutus" className="block py-2 px-4 hover:text-yellow-400" onClick={handleLinkClick}>
          About Us
        </Link>
        <Link to="/contactus" className="block py-2 px-4 hover:text-yellow-400" onClick={handleLinkClick}>
          Contact
        </Link>

        {/* User Authentication Menu */}
        {isLoggedIn ? (
          <div className="relative inline-block text-justify">
            <button
              onClick={toggleDropdown}
              className="bg-blue-200 text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-100 text-md ml-2 mb-3 md:ml-0 md:mb-0"
            >
              {user ? user.username : "Loading..."}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <Link
                  to="/logout"
                  className="block px-3 py-1 text-gray-700 hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  Logout
                </Link>
                <Link
                  to="/paymentHistory"
                  className="block px-3 py-1 text-gray-700 hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  Your Donation
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="block py-2 px-4 hover:text-yellow-400" onClick={handleLinkClick}>
              Login
            </Link>
            <Link to="/signup" className="block py-2 px-4 hover:text-yellow-400" onClick={handleLinkClick}>
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
