import PropTypes from 'prop-types';
import { useState } from 'react';
import { BiMenu } from "react-icons/bi";
import { Link } from 'react-router-dom';
import logo from "../assets/logo/North_Signal.png";

const NavLinks = [
  { id: "1", name: "HOME", link: "/home" },
  { id: "2", name: "ABOUT", link: "/about" },
  { id: "3", name: "SERVICES", link: "/services" },
  { id: "4", name: "SECURITY", link: "/security" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loggedIn] = useState(false); // State to track login status

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    !loggedIn && (
      <nav className="fixed top-0 left-0 right-0 shadow-md bg-white z-50">
        <div className="container mx-auto flex justify-between items-center py-2 px-4">
          {/* Logo Section */}
          <div className="flex items-center">
            <img src={logo} alt="North Signal Logo" className="w-8 h-8 mr-2" />
            <h1 className="text-2xl font-bold font-serif">North Signal</h1>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <BiMenu onClick={toggleMobileMenu} className="text-3xl cursor-pointer" />
          </div>

          {/* Navigation Links */}
          <div className={`hidden md:flex md:ml-auto items-center space-x-4 ${isMobileMenuOpen ? 'flex flex-col' : ''}`}>
            <ul className="flex items-center space-x-4">
              {NavLinks.map((data, index) => (
                <li key={data.id} className="flex items-center">
                  <Link
                    className="py-2 px-2 text-lg hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500"
                    to={data.link}
                  >
                    {data.name}
                  </Link>
                  {/* Add separator unless it's the last item */}
                  {index < NavLinks.length - 1 && (
                    <span className="text-gray-500 mx-2">|</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col items-start mt-2 pb-3 px-4 bg-white">
            <ul className="flex flex-col space-y-2">
              {NavLinks.map((data) => (
                <li key={data.id}>
                  <Link
                    className="py-2 px-4 text-lg hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500"
                    to={data.link}
                    onClick={toggleMobileMenu} // Close menu on link click
                  >
                    {data.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    )
  );
};

// PropTypes validation
Navbar.propTypes = {
  theme: PropTypes.string, // Optional prop if you're refactoring the app gradually
  setTheme: PropTypes.func,
};

export default Navbar;
