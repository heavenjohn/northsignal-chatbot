import Navbar from "../../Navbar";
import Footer from "../../pages/Footer";
import Chatbot from "../../Chatbot/Chatbot";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="mb-16">
      <Navbar/>
      </div>
      {/* Hero Section */}
      <section className="bg-primaryblue text-white py-5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-base sm:text-lg">
          Were dedicated to providing top-notch services and creating a thriving community. Established in 2009, were here to make your experience unforgettable with our events, amenities, and support services.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-10 px-6">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
      Our Mission
    </h2>
    <p className="text-gray-600 text-base sm:text-lg leading-loose">
      North Signal Village aims to enable its Citizenry gain access to Education, Skills and Livelihood Training Sport and other programs that can equip and make them capable of earning an income to help raise their standard of living to live Productive and decent live. and to be able to actively carry out the mandates and ensure transparency, honesty and efficency in the delivery of services in the Barangay.
    </p>
  </div>
</section>
  <hr className="border-t-2 border-gray-300 my-8" />
<section className="py-10 pb-20">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
      Our Vision
    </h2>
    <p className="text-gray-600 text-base sm:text-lg leading-loose">
     Barangay North Signal Village takes pride in its people coming from all over the various regions of the Archipelago, Diverse in the Origin and Culture, but united in its effort, to establish a verdant Community that is peaceful healthy and livable.
    </p>
  </div>
</section>


     
      {/* Footer */}
      <Chatbot/>
      <Footer />
    </div>
  );
};

export default About;
