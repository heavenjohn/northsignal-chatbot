import { useEffect } from 'react';
import img from "../../assets/home/coreseal.png"; // Make sure the image path is correct
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS style
import Navbar from '../Navbar';
import Footer from "../../Components/pages/Footer"; // Import the Footer component

function Security() {
  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black dark:text-white"> {/* Set to flex column to accommodate footer */}
      <Navbar/>
      <div className="container flex flex-col md:flex-row items-center justify-center py-10 flex-grow"> {/* Use flex-grow to take remaining space */}
        {/* Left side: Image */}
        <div 
          className="flex justify-center mb-6 md:mb-0 md:mr-8"
          data-aos="fade-right" // AOS animation for the image
          data-aos-duration="300" // Animation duration in milliseconds
        >
          <img
            src={img}
            alt="DPO/DPS Seal"
            className="w-96 h-auto object-contain" // Adjust the size of the image as per your requirements
          />
        </div>

        {/* Right side: Text content */}
        <div className="lg:w-3/4 w-full flex flex-col px-5">
          <h1 
            className="text-4xl dark:text-white text-gray-900"
            data-aos="fade-left" // AOS animation for the title
            data-aos-duration="500"
          >
            The Data Privacy Policy of Taguig City
          </h1>
          <p 
            className="mt-7 text-lg lg:text-left text-justify dark:text-gray-300 text-gray-700"
            data-aos="fade-left" // AOS animation for the paragraph
            data-aos-duration="300"
          >
            The City of Taguig places importance on the privacy and security of
            information shared by users. This website provides information about
            the City Government of Taguig, the services it offers, and its various
            programs and projects. This policy applies to this website
            (website.taguig.info), as well as any related sites, platforms, or
            domains used by the City Government of Taguig.
          </p>
          <div className="flex mt-5" data-aos="fade-up" data-aos-duration="300">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded dark:bg-red-600 dark:hover:bg-red-800">
              Read More
            </button>
          </div>
        </div>
      </div>
      <Footer /> {/* Insert Footer here */}
    </div>
  );
}

export default Security;
