import { useEffect } from 'react'; // Import React and useEffect
import { Link } from 'react-router-dom'; // Import Link for navigation
import logo from "../../assets/logo/North_Signal.png";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles
import Navbar from '../Navbar';
import Footer from "../../Components/pages/Footer"; // Importing Footer
import Chatbot from '../Chatbot/Chatbot';

const About = () => {
  // AOS initialization
  useEffect(() => {
    AOS.init({
      duration: 900, // Default duration for AOS animations
      once: true, // Animation happens only once when in view
    });
  }, []);

  return (
    <div className="dark:bg-black dark:text-white duration-300 min-h-screen flex flex-col">
      {/* Navbar */}
      <div className='flex mt-16'>
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-8 flex-grow flex items-center mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 place-items-center">
          {/* Image Section */}
          <div data-aos="slide-right" className="flex justify-center lg:justify-end">
            <img
              src={logo}
              alt="North Signal Logo" // Updated alt text for better accessibility
              className="max-w-full max-h-[300px] sm:max-h-[400px] object-contain drop-shadow-md"
            />
          </div>

          {/* Text Section */}
          <div data-aos="fade-up" className="text-center lg:text-left space-y-6 lg:pl-12">
            <h1 className="text-3xl sm:text-4xl font-bold font-serif">
              About Us
            </h1>
            <p className="text-sm sm:text-base lg:text-lg">
              Welcome to North Signal!

              At North Signal Village, were dedicated to providing top-notch services and support to our vibrant community. Established in 2009, our mission is to create a safe, inclusive, and thriving environment for all residents. Whether youre seeking community events, local amenities, or support services, were here to make your experience unforgettable.
            </p>

            <Link to="/aboutus">
              <button className="bg-primary text-white px-6 py-2 rounded shadow-md hover:bg-opacity-90 transform hover:scale-105 active:scale-95 transition-transform duration-300 mt-5">
                See More
              </button>
            </Link>

          </div>
        </div>
      </div>

      {/* Footer */}
      <Chatbot />
      <Footer />
    </div>
  );
};

export default About;
