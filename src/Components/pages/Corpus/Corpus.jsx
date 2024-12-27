/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Sidebar from "../../admin/Sidebar"; // Ensure the correct relative path and casing
import { motion } from "framer-motion"; // Import from Framer Motion
import ReactPaginate from "react-paginate";
import { FaEdit, FaEye, FaPlus, FaPowerOff, FaTrash } from "react-icons/fa";
import axios from "axios";
import Modal from "./modal";
import Swal from "sweetalert2";
import globalSearch from "../../search";

const Corpus = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Toggle sidebar visibility
  const [pageTitle, setPageTitle] = useState("Dashboard"); // Default page title
  const [loading, setLoading] = useState(true); // Loading state
  const [intents, setIntents] = useState([]);
  const [models, setModels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isShow, setIsShow] = useState(false);
  const [selected, setSelected] = useState({});
  // Simulate data fetching or setup delay
  useEffect(() => {
    handleBrowse();
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate a 2-second loading time
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setModels(intents);
  }, [intents]);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const displayIntents = models.slice(currentPage * 5, (currentPage + 1) * 5);

  const handleToggle = () => setIsShow(!isShow);

  const handleModal = isCreate => {
    if (isCreate) {
      setSelected({
        intent: "",
        answers: [],
        utterances: [],
      });
    }
    setIsShow(!isShow);
  };

  const handleCreate = () => {
    handleModal(true);
  };

  const handleEdit = selected => {
    const selectedIntent = intents.find(intent => intent.id === selected.id);
    console.log(selectedIntent);

    setSelected(selectedIntent);
    handleModal(false);
  };

  const handleDelete = selected => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        console.log(selected.id);

        axios({
          method: "delete",
          url: `corpus/delete`,
          data: { id: selected.id },
        })
          .then(res => {
            setIntents(res?.data?.payload);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch(error => {
            console.error("Error deleting corpus:", error);
          });
      }
    });
  };
  const handleSearch = val => {
    console.log(globalSearch(intents, val));

    setModels(globalSearch(intents, val));
  };
  const handleRestart = () => {
    axios
      .post("/corpus/restart")
      .then(res => {
        Swal.fire("Success", "Corpus restarted successfully", "success");
      })
      .catch(error => {
        console.error("Error restarting corpus:", error);
      });
  };
  const handleBrowse = async () => {
    await axios
      .get("/corpus")
      .then(res => {
        setIntents(res?.data?.payload);
        setModels(res?.data?.payload);
      })
      .catch(error => {
        console.error("Error fetching corpus:", error);
      });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-poppins">
      {loading ? (
        // Animated Loading Spinner
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <motion.div
            className="h-16 w-16 border-4 border-t-blue-500 border-gray-300 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}></motion.div>
        </div>
      ) : (
        // Main Content After Loading
        <div className="flex flex-grow">
          {/* Sidebar Component */}
          <Sidebar
            isSidebarVisible={isSidebarVisible}
            setIsSidebarVisible={setIsSidebarVisible}
            setPageTitle={setPageTitle}
          />
          <main className="flex-grow bg-white p-6 overflow-y-auto h-screen">
            {/* Dynamic Page Title */}
            <h2 className="text-2xl font-bold mb-4">{pageTitle}</h2>

            {/* Welcome Message */}
            <div className="max-w-7xl w-full mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
              <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                Training Model
              </h2>
              <div className="flex justify-end mb-4">
                <button className="bg-red-500 mx-3 text-white p-2 rounded-md mb-4 ">
                  <FaPowerOff className="text-danger" onClick={handleRestart} />
                </button>
                <button className="bg-green-500 text-white p-2 rounded-md mb-4 ">
                  <FaPlus className="text-white" onClick={handleCreate} />
                </button>
              </div>
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-8 w-8 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 0116 0A8 8 0 014 12z"></path>
                  </svg>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex justify-between items-center">
                    <div className="text-gray-700 font-semibold">
                      {/* Total Admins: {filteredAdmins.length} / {admins.length} */}
                    </div>
                    <div className="flex space-x-2 w-full sm:w-1/3 lg:w-1/4">
                      <input
                        type="text"
                        placeholder="Search by name, email"
                        className="p-2 border border-gray-300 rounded-md w-full"
                        // value={searchTerm}
                        onChange={e => handleSearch(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">
                            No.
                          </th>
                          <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">
                            Intents
                          </th>
                          <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">
                            Answers
                          </th>
                          <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">
                            Uttraces
                          </th>
                          <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayIntents.map((intent, index) => (
                          <tr key={intent.id}>
                            <td className="py-3 px-6 border-b text-sm">
                              {index + 1}
                            </td>
                            <td className="py-3 px-6 border-b text-sm">
                              {intent.intent}
                            </td>
                            <td className="py-3 px-6 border-b text-sm">
                              {intent.answers.join(", ")}
                            </td>
                            <td className="py-3 px-6 border-b text-sm">
                              {intent.utterances.join(", ")}
                            </td>
                            <td className="py-3 px-6 border-b text-sm space-x-2">
                              <button
                                className="text-yellow-500"
                                onClick={() => handleEdit(intent)}>
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(intent)}
                                className="text-red-500">
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={Math.ceil(models.length / 5)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    containerClassName={
                      "flex justify-center items-center space-x-2"
                    }
                    pageClassName={
                      "py-1 px-2 bg-primary border rounded-md text-"
                    }
                    onPageChange={handlePageClick}
                    activeClassName={"bg-blue-500 text-white"}
                    disabledClassName={"text-gray-400 cursor-not-allowed"}
                  />
                </>
              )}
            </div>
            <Modal
              setIntents={setIntents}
              handleToggle={handleToggle}
              isShow={isShow}
              selected={selected}
            />
          </main>
        </div>
      )}
    </div>
  );
};

export default Corpus;
