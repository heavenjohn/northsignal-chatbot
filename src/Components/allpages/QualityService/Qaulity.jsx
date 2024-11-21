import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const QualityServices = () => {
  // Sample list of services
  const services = [
    {
      title: 'Health and Wellness',
      description: 'Providing accessible health services including medical check-ups, vaccination drives, and wellness programs.',
    },
    {
      title: 'Public Safety',
      description: 'Ensuring the safety and security of our residents with 24/7 barangay patrol and quick response teams.',
    },
    {
      title: 'Educational Support',
      description: 'Offering scholarships, after-school programs, and educational resources for the youth in our community.',
    },
    {
      title: 'Waste Management',
      description: 'Organizing regular waste collection and promoting sustainable waste management practices.',
    },
    {
      title: 'Community Events',
      description: 'Hosting community events to foster unity, such as festivals, sports leagues, and cultural celebrations.',
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-12 px-6 bg-gray-50 min-h-screen relative">
      {/* Home icon positioned in the upper-right corner */}
      <div className="absolute top-4 right-4">
        <Link to="/"> {/* Link to home page */}
          <FaHome className="text-3xl text-gray-700 cursor-pointer hover:text-blue-500 transition-all" />
        </Link>
      </div>

      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Quality Services</h1>
        <p className="text-lg text-gray-600">
          We are committed to delivering quality services to ensure the well-being, safety, and development of our community.
          Explore the various services that our barangay offers to meet the needs of all residents.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-md transition-all duration-500 hover:bg-yellow hover:text-white hover:scale-105 transform hover:shadow-xl"
            data-aos="fade-up" // Animation effect
            data-aos-delay={index * 200} // Delay each box
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">{service.title}</h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QualityServices;
