import { useEffect, useState } from "react";
import { db } from "../Firebase/firebaseConfig"; // Firebase config import
import { collection, getDocs } from "firebase/firestore"; // Firestore functions
import ReactPaginate from "react-paginate"; // Pagination library
import Sidebar from "./sidebar"; // Import the Sidebar component

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [adminsPerPage] = useState(10);

  // Define the setPageTitle function
  const setPageTitle = (title) => {
    document.title = title;
  };

  // Fetch the list of admins from Firestore
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "admins"));
        const adminList = querySnapshot.docs.map((doc) => {
          const adminData = doc.data();
          return { id: doc.id, ...adminData };
        });
        setAdmins(adminList);
      } catch (error) {
        setError("Failed to fetch admins. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  // Handle page change for pagination
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Get admins for the current page
  const displayedAdmins = admins.slice(
    currentPage * adminsPerPage,
    (currentPage + 1) * adminsPerPage
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Pass setPageTitle to Sidebar */}
      <Sidebar setPageTitle={setPageTitle} />

      {/* Admin List Section */}
      <div className="flex-grow p-6 ml-64"> {/* Add margin left for the sidebar */}
        <div className="max-w-4xl w-full mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Admin List</h2>

          {/* Error Notification */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Loading Indicator */}
          {loading ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-8 w-8 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0116 0A8 8 0 014 12z"
                ></path>
              </svg>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Position</th>
                      <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Office</th>
                      <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Age</th>
                      <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Start date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedAdmins.length > 0 ? (
                      displayedAdmins.map((admin) => (
                        <tr key={admin.id} className="hover:bg-gray-100">
                          <td className="py-3 px-4 border-b text-sm text-gray-600">{admin.firstName} {admin.lastName}</td>
                          <td className="py-3 px-4 border-b text-sm text-gray-600">{admin.position}</td>
                          <td className="py-3 px-4 border-b text-sm text-gray-600">{admin.office}</td>
                          <td className="py-3 px-4 border-b text-sm text-gray-600">{admin.age}</td>
                          <td className="py-3 px-4 border-b text-sm text-gray-600">{admin.startDate}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-3 px-4 text-center text-sm text-gray-600">No admins found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-4 flex justify-center">
                <ReactPaginate
                  pageCount={Math.ceil(admins.length / adminsPerPage)}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  onPageChange={handlePageClick}
                  containerClassName="flex justify-center items-center space-x-2"
                  previousClassName="px-4 py-2 border bg-gray-200 rounded"
                  nextClassName="px-4 py-2 border bg-gray-200 rounded"
                  activeClassName="bg-blue-500 text-white"
                  disabledClassName="text-gray-400 cursor-not-allowed"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminList;
