import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo/North_Signal.png";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/pages/Footer"; // Importing the Footer component

const Hero = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true, // Animation will happen only once
    });
  }, []);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page (ensure this matches your route)
  };

  return (
    <div className="dark:bg-black dark:text-white duration-300 relative z-20 flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-8 flex-grow flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
          
          {/* Image Section */}
          <div
            data-aos="slide-left"
            className="flex justify-center sm:justify-end order-1 sm:order-2"
          >
            <img
              src={logo}
              alt="North Signal Logo"
              className="max-w-full max-h-[300px] sm:max-h-[400px] object-contain drop-shadow-lg"
            />
          </div>

          {/* Text Section */}
          <div className="flex flex-col justify-center space-y-5 sm:space-y-6 text-center sm:text-left order-2 sm:order-1">
            <p
              data-aos="fade-up"
              className="text-primary text-xl sm:text-2xl font-serif"
            >
              WELCOME TO THE
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-4xl sm:text-5xl lg:text-7xl font-semibold font-serif"
            >
              North Signal
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="1000"
              className="mt-4 text-sm sm:text-base"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel sequi
              est inventore architecto eligendi enim officiis, eaque iure itaque
              eius error fugit eveniet magnam numquam.
            </p>
            <div className="flex justify-center sm:justify-start">
              <button
                onClick={handleLoginClick}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-8 text-sm sm:text-base rounded dark:bg-red-600 dark:hover:bg-red-800 transition-all duration-300"
                aria-label="Go to Login Page"
              >
                Online Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Hero;
