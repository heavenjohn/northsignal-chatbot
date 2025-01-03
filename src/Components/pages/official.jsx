import { FaFacebook, FaTwitter } from 'react-icons/fa';
import Navbar from '../Navbar';
import Footer from './Footer';
import Chatbot from '../Chatbot/Chatbot';
import img1 from "../../assets/officials/img1.png"

const councilors = [
  {
    name: 'Danilo Castro',
    title: 'BRGY. CAPITAN',
    img: 'https://via.placeholder.com/150',
  },
  {
    name: 'Jimmy Gomez',
    title: 'KAGAWAD',
    img: 'https://via.placeholder.com/150',
  },
  {
    name: 'Jojo Quijano',
    title: 'KAGAWAD',
    img: 'https://via.placeholder.com/150',
  },
  {
    name: 'Ric Jordan',
    title: 'KAGAWAD',
    img: 'https://via.placeholder.com/150',
  },
  {
    name: 'Jonas Barca',
    title: 'KAGAWAD',
    img: 'https://via.placeholder.com/150',
  },
  {
    name: 'Yolly Velasco',
    title: 'KAGAWAD',
    img: 'https://via.placeholder.com/150',
  },
  {
    name: 'Ronald Ramirez',
    title: 'KAGAWAD',
    img: 'https://via.placeholder.com/150',
  },
  {
    name: 'Irene Ingco',
    title: 'KAGAWAD',
    img: 'https://via.placeholder.com/150',
  },
];

const CityOfficials = () => {
  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <div className="mb-16">
        <Navbar />
      </div>
        <div className='py-5 px-4 md:px-16'>
          <div className='container max-auto'>
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
            Our Barangay Leaders 
          </h2>
          <h3 className="text-3xl font-semibold text-center mb-6">
             Barangay Officials
          </h3>
        </div>

          </div>
      {/* Mayor Section */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg p-6 rounded-lg mb-10">


        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Left Image Section */}
          <div className="w-full md:w-1/3 flex justify-center">
            <img src={img1} alt="City Mayor" className="rounded-lg shadow-lg w-48 md:w-56" />
          </div>

          {/* Right Info Section */}
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h3 className="text-xl font-bold">
              Hon. Maria Laarni <q>Lani</q> Cayetano
            </h3>
            <p className="text-gray-500 mb-4">City Mayor</p>

            <p className="text-gray-700 mb-4">
              Maria Laarni <q>Lani</q> Lopez Cayetano is the Mayor of the City of Taguig. Her career in public service is
              marked by the glass ceilings she shattered. At 22, she founded the Progressive Ladies League of the
              Philippines (PLL), an organization that promotes the welfare of women across the country...
            </p>

            <p className="text-gray-700 mb-4">
              She also serves as the Chairperson of the Board of Regents of the Taguig City University (TCU), Member
              of the Board of Regents of the Technological University of the Philippines (TUP), and Policy Advisor
              from a Local Government Unit in the Second Congressional Commission on Education (EDCOM II).
            </p>

            {/* Social Media Links */}
            <div className="flex justify-center md:justify-start items-center gap-4 mt-6">
              <a
                href="https://facebook.com"
                className="text-blue-600 hover:text-blue-800 text-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                className="text-blue-500 hover:text-blue-700 text-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t-2 border-gray-300 my-8" />

      {/* Councilors Section */}
      <div className="max-w-7xl mx-auto mb-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">BARANGAY OFFICALS</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {councilors.map((councilor, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden text-center p-4 hover:shadow-xl hover:bg-gray-50 hover:scale-105 transition-all duration-300"
            >
              <img
                src={councilor.img}
                alt={councilor.name}
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold">{councilor.name}</h3>
              <p className="text-gray-500">{councilor.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Chatbot />
      <Footer />
    </div>
  );
};

export default CityOfficials;
