import { useEffect } from 'react'; // Import React and useEffect
import { Link } from 'react-router-dom'; // Import Link for navigation
import logo from "../../assets/logo/North_Signal.png";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles
import Navbar from '../Navbar';
import Footer from "../../Components/pages/Footer"; // Importing Footer

const About = () => {
  // AOS initialization
  useEffect(() => {
    AOS.init({
      duration: 900, // Default duration for AOS animations
      once: false, // Animation should happen every time you scroll to it
    });
  }, []);

  return (
    <div className="dark:bg-black dark:text-white bg-slate-100 duration-300 h-screen flex flex-col"> {/* Changed to flex-col to accommodate the footer */}
      <Navbar />
      <div className="container flex-grow flex items-center"> {/* Use flex-grow to ensure it takes up remaining space */}
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          {/* Image Section with AOS Animation */}
          <div data-aos="slide-right">
            <img 
              src={logo} 
              alt="North Signal Logo" // Updated alt text for better accessibility
              className="sm:scale-105 sm:translate-x-11 max-h-[400px] drop-shadow-[2px_20px_6px_rgba(0, 0, 0, 0.5)]" // Added some styling for responsiveness
            />
          </div>

          {/* Text Section */}
          <div className="space-y-5 sm:p-16 pb-6">
            <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold font-serif">About</h1>
            <p data-aos="fade-up">
              Welcome to North Signal, where we aim to provide exceptional services and support to our community.
            </p>
            <p data-aos="fade-up">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur sequi corrupti delectus itaque aut dignissimos.
            </p>
            <Link to="/aboutus" data-aos="fade-up">
              <button className="button-outline">See more</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer /> {/* Footer will appear at the bottom of the page */}
    </div>
  );
};

export default About;
