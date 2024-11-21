import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-red-600 text-white py-2">
      <div className="container mx-auto px-2">
        {/* Emergency Hotlines Header */}
        <h2 className="text-base md:text-lg font-bold mb-1">EMERGENCY HOTLINES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Left Column: Hotlines and Services */}
          <div className="text-xs">
            <ul className="space-y-1">
              <li className="flex justify-between">
                <span>TAGUIG COMMAND CENTER</span>
                <span>(02) 8789 3200</span>
              </li>
              <li className="flex justify-between">
                <span>TAGUIG RESCUE</span>
                <span>0919 070 3112</span>
              </li>
              <li className="flex justify-between">
                <span>DOCTOR-ON-CALL</span>
                <span>0919 079 9112</span>
              </li>
              <li className="flex justify-between">
                <span>TAGUIG BUREAU OF FIRE PROTECTION</span>
                <span>(02) 8837 0740</span>
              </li>
              <li className="flex justify-between">
                <div className="text-left">
                  <span>TRUNKLINE: Taguig City Hall Office</span><br />
                  <span>SM Aura Satellite Office</span>
                </div>
                <div className="text-right">
                  <span>(02) 8555 7800</span><br />
                  <span>(02) 7795 9999</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column: PNP and Other Services */}
          <div className="text-xs">
            <ul className="space-y-1">
              <li className="flex justify-between">
                <span>TAGUIG PNP</span>
                <span>(02) 8642 3582</span>
              </li>
              <li className="flex justify-between">
                <span></span>
                <span>0998 598 7932</span>
              </li>
              <li className="flex justify-between">
                <span>R.E.A.C.T.</span>
                <span>(02) 8640 7006</span>
              </li>
              <li className="flex justify-between">
                <span>ROADSIDE EMERGENCY ASSISTANCE</span>
                <span>0929 631 5924</span>
              </li>
              <li className="flex justify-between">
                <span></span>
                <span>0921 2780 0569</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-2 flex justify-center space-x-2">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <FaFacebook className="h-4 w-4" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <FaInstagram className="h-4 w-4" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
            <FaTwitter className="h-4 w-4" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
            <FaYoutube className="h-4 w-4" />
          </a>
        </div>

        {/* Footer Text */}
        <div className="mt-2 text-center border-t border-white pt-1 text-xs">
          <p>2024 © | North Signal</p>
          <p>Powered by Heaven John | Current Version: 0.1.5</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
