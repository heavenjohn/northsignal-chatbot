import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-4">
      <div className="container mx-auto px-4">
        {/* Emergency Hotlines Header */}
        <h2 className="text-lg font-bold mb-4">EMERGENCY HOTLINES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Left Column: Hotlines and Services */}
          <div className="text-sm">
            <ul className="space-y-1">
              <li className="flex justify-between">
                <span>Taguig Bureau of Fire Protection</span>
                <span>21 0919 / 883 70 704 / 883 70 919</span>
              </li>
              <li className="flex justify-between">
                <span>TAGUIG RESCUE</span>
                <span>0919 070 3112</span>
              </li>
              <li className="flex justify-between">
                <span>Police Station 6</span>
                <span>0975 713 8783</span>
              </li>
              <li className="flex justify-between">
                <span>Telemedicine</span>
                <span> 0961 234 0851</span>
              </li>
              <li className="flex justify-between">
                <span>Health Center</span>
                  <span>0961 234 0882</span>
              </li>
            </ul>
          </div>

          {/* Right Column: PNP and Other Services */}
          <div className="text-sm">
            <ul className="space-y-1">
              <li className="flex justify-between">
                <span>Barangay Hotline</span>
                <span>(02) 9839298</span>
              </li>
              <li className="flex justify-between">
                <span>Command Center</span>
                <span>(02) 87893200</span>
              </li>
              <li className="flex justify-between">
                <span>Security Force</span>
                <span>0962 419 4367</span>
              </li>
              <li className="flex justify-between">
                <span>Alternate Security Contact</span>
                <span>0936 460 0014</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-6 flex justify-center space-x-4">
          <a href="https://www.facebook.com/people/Bagong-North-Signal/61553108162456/" target="_blank" rel="noreferrer" aria-label="Facebook">
            <FaFacebook className="h-5 w-5 hover:text-gray-200" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <FaInstagram className="h-5 w-5 hover:text-gray-200" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
            <FaTwitter className="h-5 w-5 hover:text-gray-200" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
            <FaYoutube className="h-5 w-5 hover:text-gray-200" />
          </a>
        </div>

        {/* Footer Text */}
        <div className="mt-6 text-center border-t border-white pt-4 text-xs">
          <p>2024 © | North Signal</p>
          <p>
            <Link to="/security" className="hover:underline">Policy</Link> | Current Version: 0.1.5
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
