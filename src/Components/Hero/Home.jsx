import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState, useRef } from "react";
import logo from "../../assets/logo/North_Signal.png";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/pages/Footer";
import Chatbot from "../Chatbot/Chatbot";
import { db } from "../Firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";


const Hero = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const modalRef = useRef(null); // Ref for the modal

  useEffect(() => {
    // Initialize AOS once the component mounts
    AOS.init({
      duration: 900,
      once: true,
    });
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "announcements"), (snapshot) => {
      setAnnouncements(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    // Close modal if clicked outside of it
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedAnnouncement(null);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openModal = (announcement) => {
    setSelectedAnnouncement(announcement);
  };


  return (
    <div className="dark:bg-black dark:text-white duration-300 relative z-20 flex flex-col min-h-screen">
      <div className="flex mt-16">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto mt-8 px-4 sm:px-8 flex-grow flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
          <div
            data-aos="slide-left"
            className="flex justify-center sm:justify-end order-1 sm:order-2"
          >
            <img
              src={logo}
              alt="North Signal Logo"
              className="max-w-full max-h-[300px] sm:max-h-[400px] object-contain drop-shadow-lg"
            />
          </div>

          <div className="flex flex-col justify-center space-y-5 sm:space-y-6 text-center sm:text-left order-2 sm:order-1 mb-10">
            <p data-aos="fade-up" className="text-primary text-xl sm:text-2xl font-serif">
              WELCOME TO THE
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-4xl sm:text-5xl lg:text-7xl font-semibold font-serif"
            >
              North Signal
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="1000"
              className="mt-4 text-sm sm:text-base"
            >
              Welcome to North Signal! We&apos;re thrilled to have you here. Explore our vibrant
              community and discover the services we offer.
            </p>
          </div>
        </div>
      </div>

      <hr className="border-t-2 border-gray-300 my-8 mx-10" />

      {/* Announcements Section */}
      <div className="container mx-auto px-4 sm:px-8 mt-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-black mb-6">
          News Section
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div
                key={announcement.id}
                onClick={() => openModal(announcement)}
                className="cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
                data-aos="fade-up"
              >
                {announcement.imageUrl && (
                  <div className="overflow-hidden">
                    <img
                      src={announcement.imageUrl}
                      alt="Announcement"
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    {announcement.title || "Announcement"}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3">{announcement.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-600 col-span-full text-center">
              No announcements available at the moment.
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg p-6 w-full max-w-lg relative"
          >
            {/* Use React Icon for the close button */}
            {selectedAnnouncement.imageUrl && (
              <img
                src={selectedAnnouncement.imageUrl}
                alt={selectedAnnouncement.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {selectedAnnouncement.title}
            </h2>
            <p className="text-gray-600">{selectedAnnouncement.text}</p>
          </div>
        </div>
      )}

      {/* Chatbot and Footer */}
      <div className="mt-8">
        <Chatbot />
        <Footer />
      </div>
    </div>
  );
};

export default Hero;
