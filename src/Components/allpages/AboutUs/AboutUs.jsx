import Navbar from "../../Navbar";
import Footer from "../../pages/Footer";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="mb-16">
      <Navbar/>
      </div>
      {/* Hero Section */}
      <section className="bg-blue text-white py-5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-base sm:text-lg">
            Learn about our mission, values, and the team behind our success.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Our Vision
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-loose">
            Our mission is to make the world a better place through innovation
            and excellence. We strive to empower individuals and organizations
            to reach their full potential.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Integrity",
                description:
                  "We uphold honesty and strong moral principles in all that we do.",
              },
              {
                title: "Innovation",
                description:
                  "We believe in constantly improving and bringing new ideas to life.",
              },
              {
                title: "Community",
                description:
                  "We prioritize building a supportive and inclusive community.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-blue-600">
                  {value.title}
                </h3>
                <p className="text-gray-600 mt-2">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Jane Doe",
                role: "CEO & Founder",
                img: "https://via.placeholder.com/150",
              },
              {
                name: "John Smith",
                role: "Chief Technical Officer",
                img: "https://via.placeholder.com/150",
              },
              {
                name: "Emily Davis",
                role: "Head of Marketing",
                img: "https://via.placeholder.com/150",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={member.img}
                  alt={`${member.name}`}
                  className="w-24 h-24 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-bold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
