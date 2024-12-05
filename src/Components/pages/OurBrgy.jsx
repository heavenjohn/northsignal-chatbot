import Navbar from "../Navbar";
import Chatbot from "../Chatbot/Chatbot";
import Footer from "./Footer";

const HistorySection = () => {
  return (
    <>
    <div className="mb-16">
        <Navbar />
      </div>
      <section className="py-12 px-4 md:px-16 bg-white text-gray-900">
        <div className="container mx-auto">
          {/* Section Title */}
          <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
            Barangay Profile
          </h2>
          <h3 className="text-3xl font-semibold text-center mb-6">
            History of the Barangay
          </h3>

          {/* Content Area */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-100 transition-all duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">2008 - Barangay Creation</h4>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                In 2008, following the successful political subdivision of the mother Barangay Signal Village, now known as Central Village, into four (4) barangays, Barangay North Signal Village was established by virtue of City Ordinance No. 58 Series of 2008. This ordinance, which created the barangay, was enacted on September 22, 2008, and ratified through a plebiscite on December 19, 2008, with 3,907 affirmative votes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-100 transition-all duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">April 4, 2009 - Official Establishment</h4>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                On April 4, 2009, Barangay North Signal Village officially came into existence upon the appointment of competent barangay officials by the City Government of Taguig. These officials were tasked with managing the administrative and governmental affairs of the barangay.
              </p>
            </div>
          </div>

          <div className="mt-12 space-y-8">
            {/* Officials and Mission */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-100 transition-all duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">First Barangay Officials</h4>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The first appointed officials of Barangay North Signal Village were: Punong Barangay Richard Paul T. Jordan, and members of the Sangguniang Barangay: Kagawad Jesus J. Pullente, Kagawad Nolan C. Peña, Kagawad Melquiades M. Isabedra, Kagawad Francisco M. Moyano, Kagawad Melinde S. Generaol, Kagawad Angielyn A. Bombase, Kagawad Jovita C. Villar, Barangay Treasurer Evelyn E. Hernandez, Barangay Secretary Rochelle W. Madelo, and Barangay Chief Executive Jorge C. Tabug.
              </p>
            </div>

            {/* Vision and Mission */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-100 transition-all duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">Vision & Mission</h4>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The Sangguniang Barangay of North Signal Village is driven by its vision to become a verdant, business-friendly, peaceful, healthy, and livable community. Its mission is to provide its citizens access to education, skills and livelihood training, sports, and other programs that equip them with the tools to improve their standard of living and lead productive, decent lives. Furthermore, the barangay aims to ensure transparency, honesty, and efficiency in the delivery of services.
              </p>
            </div>

            {/* Barangay Income */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-100 transition-all duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">Barangay Income</h4>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Barangay North Signal Village generates income from real property taxes (RPT) and city aid from the Local Government of Taguig City.
              </p>
            </div>

            {/* Current Building Location */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-100 transition-all duration-300">
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
