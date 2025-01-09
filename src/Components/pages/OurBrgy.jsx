import Navbar from "../Navbar";
import Chatbot from "../Chatbot/Chatbot";
import Footer from "./Footer";

const HistorySection = () => {
  return (
    <>
    <div className="mb-16">
        <Navbar />
      </div>
          {/* Section Title */}
          <section className="bg-yellow text-black py-5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Barangay</h1>
          <p className="text-base sm:text-lg">
          Our barangay is a united and vibrant community committed to growth, safety, and well-being. Guided by dedicated leaders, we strive to provide quality services, promote harmony, and foster development for all residents.          </p>
        </div>
      </section>
      <section className="py-5 px-4 md:px-16 bg-white text-gray-900">
      <div className="container mx-auto">
          {/* Content Area */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-yellow transition-all duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">2008 - Barangay Creation</h4>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                In 2008, following the successful political subdivision of the mother Barangay Signal Village, now known as Central Village, into four (4) barangays, Barangay North Signal Village was established by virtue of City Ordinance No. 58 Series of 2008. This ordinance, which created the barangay, was enacted on September 22, 2008, and ratified through a plebiscite on December 19, 2008, with 3,907 affirmative votes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-yellow transition-all duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">April 4, 2009 - Official Establishment</h4>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                On April 4, 2009, Barangay North Signal Village officially came into existence upon the appointment of competent barangay officials by the City Government of Taguig. These officials were tasked with managing the administrative and governmental affairs of the barangay.
              </p>
            </div>
          </div>

          <div className="mt-12 space-y-8">
            {/* Officials and Mission */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-yellow transition-all duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">First Barangay Officials</h4>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The first appointed officials of Barangay North Signal Village were: Punong Barangay Richard Paul T. Jordan, and members of the Sangguniang Barangay: Kagawad Jesus J. Pullente, Kagawad Nolan C. Peña, Kagawad Melquiades M. Isabedra, Kagawad Francisco M. Moyano, Kagawad Melinde S. Generaol, Kagawad Angielyn A. Bombase, Kagawad Jovita C. Villar, Barangay Treasurer Evelyn E. Hernandez, Barangay Secretary Rochelle W. Madelo, and Barangay Chief Executive Jorge C. Tabug.
              </p>
            </div>

            {/* Barangay Income */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-yellow transition-all duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">Barangay Income</h4>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Barangay North Signal Village generates income from real property taxes (RPT) and city aid from the Local Government of Taguig City.
              </p>
            </div>

            {/* Current Building Location */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-yellow transition-all duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">Current Location</h4>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Currently, North Signal Village is temporarily housed in a small building donated by the STP-Pinagsama Project, located on Ipil-Ipil Street, North Signal Village, Taguig City.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Chatbot />
      <Footer />
    </>
  );
};

export default HistorySection;
