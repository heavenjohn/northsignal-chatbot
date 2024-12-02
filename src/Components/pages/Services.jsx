import img1 from "../../assets/officials/img1.png";

// Leader's Profile Data
const leader = {
  name: "Hon. Maria Laarni 'Lani' Cayetano",
  title: "City Mayor",
  image: img1,
  description: `
    Maria Laarni “Lani” Lopez Cayetano is the Mayor of the City of Taguig. Her career in public service is marked by the glass ceilings she shattered. At 22, she founded the Progressive Ladies League of the Philippines (PLL), an organization that promotes the welfare of women across the country. At 25, she became the City of Taguig’s youngest and first female congressional representative, and she was recognized by the United Nations Association of the Philippines for her accomplishments in Politics and Government Service.
    ...
    Mayor Lani earned her degree in Mass Communications from the Centro Escolar University. She also studied Innovative and Developmental Local Governance and Policy Making for Local Chief Executives and Legislators in the University of the Philippines Diliman.
    She is married to fellow public servant, Senator Alan Peter S. Cayetano.
  `,
  socialLinks: {
    facebook: "https://facebook.com/officiallannicayetano",
    instagram: "https://instagram.com/lanicayetano"
  }
};

// Councilors Data
const councilors = [
  { name: "PERSONS", title: "1", image: "https://via.placeholder.com/150" },
  { name: "PERSONS", title: "2", image: "https://via.placeholder.com/150" },
  { name: "PERSONS", title: "3", image: "https://via.placeholder.com/150" },
  { name: "PERSONS", title: "4", image: "https://via.placeholder.com/150" },
  { name: "PERSONS", title: "5", image: "https://via.placeholder.com/150" },
  { name: "PERSONS", title: "6", image: "https://via.placeholder.com/150" },
  { name: "PERSONS", title: "7", image: "https://via.placeholder.com/150" },
  { name: "PERSONS", title: "8", image: "https://via.placeholder.com/150" }
];

const DistrictPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      {/* Leader's Profile */}
      <div className="">
        {/* Profile Image (Left Side) */}
        <div className="w-32 h-32 md:w-48 md:h-48 mb-6 md:mb-0 mr-0 md:mr-6">
          <img
            src={leader.image}
            alt={leader.name}
            className=" shadow-lg" // Adding shadow for a better effect
          />
        </div>

        {/* Profile Info */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-800">{leader.name}</h1>
          <p className="text-xl text-gray-600 mb-4">{leader.title}</p>
          <p className="text-gray-700 mb-6">{leader.description}</p>

          {/* Social Links */}
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href={leader.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Facebook
            </a>
            <a
              href={leader.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-800"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Councilors Section */}
      <h2 className="text-4xl font-bold text-center text-black mb-8">OUR OFFICIAL</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {councilors.map((councilor, index) => (
          <div key={index} className="bg-white p-6 shadow-lg rounded-lg text-center">
            <img
              src={councilor.image}
              alt={councilor.name}
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">{councilor.name}</h3>
            <p className="text-gray-600">{councilor.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistrictPage;
