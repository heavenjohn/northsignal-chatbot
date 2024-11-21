import { useState } from "react";
import Footer from "../../pages/Footer";

const CommunitySupport = () => {
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I join the community forum?",
      answer:
        "You can join our forum by signing up with your email and creating a profile. Visit the Forum page to get started.",
    },
    {
      question: "What support options are available?",
      answer:
        "We offer email support, live chat, and a detailed FAQ section to help with common issues.",
    },
    {
      question: "How can I give feedback?",
      answer:
        "We value your input! Use the feedback form available on the 'Contact Us' section.",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Community Support Hub</h1>
          <p className="mt-3 text-lg">
            Need help? We’ve got you covered. Explore our resources below.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-10 px-4 md:px-0">
        {/* Welcome Section */}
        <section className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome to Our Support Page
          </h2>
          <p className="mt-3 text-gray-600">
            Whether youre looking for answers, connecting with others, or
            requesting assistance, we’re here to help.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white shadow-md p-4 rounded-lg border"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full"
                >
                  <span className="text-gray-800 font-medium text-lg">
                    {faq.question}
                  </span>
                  <span className="text-gray-500">
                    {faqOpen === index ? "-" : "+"}
                  </span>
                </button>
                {faqOpen === index && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Support Options Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Support Options
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600">Email Us</h3>
              <p className="mt-2 text-gray-600">
                Send your queries to{" "}
                <a
                  href="mailto:support@communityhub.com"
                  className="text-blue-500 underline"
                >
                  support@communityhub.com
                </a>
                , and well get back to you promptly.
              </p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600">
                Live Chat
              </h3>
              <p className="mt-2 text-gray-600">
                Chat with a support agent 24/7 for real-time assistance.
              </p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600">Visit FAQ</h3>
              <p className="mt-2 text-gray-600">
                Browse our{" "}
                <a
                  href="#"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  FAQ Section
                </a>{" "}
                for quick solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Contact Us
          </h2>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <p className="text-gray-600">
              For additional help, reach out to us:
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@communityhub.com"
                  className="text-blue-500 underline"
                >
                  support@communityhub.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong> +1-800-COMMUNITY
              </li>
              <li>
                <strong>Live Chat:</strong> Available 24/7
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default CommunitySupport;
