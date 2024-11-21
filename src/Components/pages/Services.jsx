import { IoInformationCircleOutline } from "react-icons/io5";
import { MdDesignServices } from "react-icons/md";
import { TbMessageChatbotFilled } from "react-icons/tb";
import Navbar from "../Navbar";
import Footer from "./Footer"; // Import the Footer component

const skillsData = [
    {
        name: "Best Price",
        icon: <MdDesignServices className="text-5xl text-yellow-600 group-hover:text-yellow-700 transition duration-300" />,
        link: "#",
        description: "Affordable and competitive pricing tailored to your needs.",
        aosDelay: "0"
    },
    {
        name: "Quality Service",
        icon: <TbMessageChatbotFilled className="text-5xl text-yellow-600 group-hover:text-yellow-700 transition duration-300" />,
        link: "/qualityservices",
        description: "Delivering top-quality service for your satisfaction.",
        aosDelay: "100"
    },
    {
        name: "Customer Support",
        icon: <IoInformationCircleOutline className="text-5xl text-yellow-600 group-hover:text-yellow-700 transition duration-300" />,
        link: "/customersupport",
        description: "24/7 customer support for all your queries and issues.",
        aosDelay: "200"
    },
];

const Contact = () => {
    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <Navbar />
            {/* Main Content */}
            <div className="container mx-auto px-4 flex-grow flex flex-col justify-center">
                <div className="text-center mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold font-serif text-gray-800">Our Services</h1>
                    <p className="text-gray-600 mt-2">We provide the best services to meet your needs.</p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {skillsData.map((skill) => (
                        <div 
                            key={skill.name} 
                            data-aos="fade-up" 
                            data-aos-delay={skill.aosDelay} 
                            className="text-center group p-4 sm:p-6 bg-yellow hover:bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                        >
                            <div className="grid place-items-center mb-4">{skill.icon}</div>
                            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-gray-900">{skill.name}</h2>
                            <p className="mt-2 text-gray-600 group-hover:text-gray-800">{skill.description}</p>
                            <a href={skill.link} className="mt-4 inline-block text-yellow-600 hover:text-yellow-800 font-medium underline transition duration-300">
                                Learn More
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Contact;
