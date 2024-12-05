import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import logo from "../../assets/logo/North_Signal.png";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/pages/Footer";
import Chatbot from '../Chatbot/Chatbot';

const Hero = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true, // Animation will happen only once
    });
  }, []);

  return (
    <div className="dark:bg-black dark:text-white duration-300 relative z-20 flex flex-col min-h-screen">
      {/* Navbar */}
      <div className='flex mt-16'>
        <Navbar />
      </div>

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
          <div className="flex flex-col justify-center space-y-5 sm:space-y-6 text-center sm:text-left order-2 sm:order-1 mb-10">
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
              Welcome to North Signal!

              We are thrilled to have you here. North Signal offers a vibrant community with top-notch amenities and beautiful surroundings. Explore our services and enjoy a fulfilling experience with us. Feel free to reach out for any assistance or inquiries.

            </p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Hero;
