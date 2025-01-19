import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";



const Header = () => {
  const { isLoggedIn } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const {user} = useAuth();
  
  const handleLinkClick = () =>  
    setMobileMenuOpen(false);
    
  const toggleDropdown = () =>  setIsOpen(!isOpen); 
    

    
  return (
    <header className="bg-blue-700 text-white py-2.5 px-5 fixed top-0 w-full z-50 shadow-md flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="https://img.freepik.com/premium-vector/social-charity-heart-abstract-human-logo_23758-114.jpg?ga=GA1.1.345411300.1719397064&semt=ais_hybrid"
          alt="NGO Logo"
          className="w-10 h-10 rounded-full"
        />
      </div>

      {/* Hamburger Icon (Visible on small screens only) */}
      <button
        className="text-white text-2xl md:hidden"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        <FaBars />
      </button>

      {/* Navigation */}
      <nav
        className={`${isMobileMenuOpen ? "flex" : "hidden"
          } flex-col gap-4 text-lg bg-blue-700 p-4 absolute top-full left-0 w-full md:static md:flex md:flex-row md:gap-6 md:p-0 md:w-auto`}
      >
        {/* Links to navigate to different sections or pages */}
        <Link
          to="/"
          className="hover:text-yellow-400 transition duration-300 ease-in-out text-base"
          onClick={handleLinkClick}
        >
          Home
        </Link>
        <Link
          to="/Gallery"
          className="hover:text-yellow-400 transition duration-300 ease-in-out text-base"
          onClick={handleLinkClick}
        >
          Gallery
        </Link>
        <Link
          to="/aboutus"
          className="hover:text-yellow-400 transition duration-300 ease-in-out text-base"
          onClick={handleLinkClick}
        >
          About Us
        </Link>
        <Link
          to="/contactus"
          className="hover:text-yellow-400 transition duration-300 ease-in-out text-base"
          onClick={handleLinkClick}
        >
          Contact
        </Link>

        {/* Links to login and signup pages */}
        {isLoggedIn ? (
          <div className="relative inline-block text-left">
             <button 
                onClick={toggleDropdown} 
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-200 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" > 
                {user.username} 
                </button> 
                {isOpen && (
                  <div 
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"> 
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu"> 
                        <a href="/logout" 
                            onClick={handleLinkClick} 
                            className="hover:text-yellow-400 transition duration-300 ease-in-out block px-4 py-2 text-sm text-gray-700" role="menuitem" > 
                            Logout 
                        </a>
                        <Link to=  '/paymentHistory' 
                            className="hover:text-yellow-400 transition duration-300 ease-in-out block px-4 py-2 text-sm text-gray-700" role="menuitem" > 
                            Your Donation 
                        </Link>
                      </div> 
                    </div>)} 
                  </div>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-yellow-400 transition duration-300 ease-in-out text-base"
              onClick={handleLinkClick}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hover:text-yellow-400 transition duration-300 ease-in-out text-base"
              onClick={handleLinkClick}
            >
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
