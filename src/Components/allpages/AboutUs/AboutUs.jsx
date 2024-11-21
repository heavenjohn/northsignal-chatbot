const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg">
            Learn about our mission, values, and the team behind our success.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Mission</h2>
          <p className="text-gray-600 text-center leading-loose">
            Our mission is to make the world a better place through innovation and excellence. We strive to empower
            individuals and organizations to reach their full potential.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600">Integrity</h3>
              <p className="text-gray-600 mt-2">
                We uphold honesty and strong moral principles in all that we do.
              </p>
            </div>
            <div className="text-center p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600">Innovation</h3>
              <p className="text-gray-600 mt-2">
                We believe in constantly improving and bringing new ideas to life.
              </p>
            </div>
            <div className="text-center p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600">Community</h3>
              <p className="text-gray-600 mt-2">
                We prioritize building a supportive and inclusive community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">Jane Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">John Smith</h3>
              <p className="text-gray-600">Chief Technical Officer</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">Emily Davis</h3>
              <p className="text-gray-600">Head of Marketing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg mb-6">
            Have questions? Reach out to us and well be happy to assist.
          </p>
          <a
            href="mailto:support@example.com"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200"
          >
            Email Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
