import { FaFacebook, FaTwitter } from 'react-icons/fa';
import img2 from "../../assets/officials/1.png";
import img3 from "../../assets/officials/2.png";
import img4 from "../../assets/officials/3.png";
import img5 from "../../assets/officials/4.png";
import img6 from "../../assets/officials/5.png";
import img7 from "../../assets/officials/6.png";
import img8 from "../../assets/officials/7.png";
import img9 from "../../assets/officials/8.png";
import img1 from "../../assets/officials/img1.png";
import Chatbot from '../Chatbot/Chatbot';
import Navbar from '../Navbar';
import Footer from './Footer';
const councilors = [
  {
    name: 'Hon. Danilo Castro',
    title: 'BRGY. CAPITAN',
    img: img2,
  },
  {
    name: 'Hon. Ricardo T. Jordan Jr.',
    title: 'KAGAWAD',
    img: img3,
  },
  {
    name: 'Hon.Joseph D. Quijano',
    title: 'KAGAWAD',
    img: img4,
  },
  {
    name: 'Hon. Jimmy A. Gomez',
    title: 'KAGAWAD',
    img: img5,
  },
  {
    name: 'Hon. Jonas T. Barca',
    title: 'KAGAWAD',
    img: img6,
  },
  {
    name: 'Hon. Yolanda C. Velasco',
    title: 'KAGAWAD',
    img: img7,
  },
  {
    name: 'Hon. Ronald M. Ramirez',
    title: 'KAGAWAD',
    img: img8,
  },
  {
    name: 'Hon. Regina Sta. Maria Ingco',
    title: 'KAGAWAD',
    img: img9,
  },
];

const CityOfficials = () => {
  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <div className="mb-16">
        <Navbar />
      </div>
      <section className="bg-primary text-white py-5 mb-5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Officials</h1>
          <p className="text-base sm:text-lg">
          Barangay officials are dedicated leaders who serve the community by ensuring peace, order, and efficient delivery of services. They work to address local needs and foster community development.
          </p>
        </div>
      </section>
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
