import { useState, useEffect } from "react";
import Sidebar from "../../admin/Sidebar"; // Ensure the correct relative path
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";
import { FaEdit, FaPlus, FaPowerOff, FaTrash } from "react-icons/fa";
import axios from "axios";
import Modal from "./modal";
import Swal from "sweetalert2";
import globalSearch from "../../search";

const Corpus = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [loading, setLoading] = useState(true);
  const [intents, setIntents] = useState([]);
  const [models, setModels] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    handleBrowse();
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setModels(intents);
  }, [intents]);

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const displayIntents = models.slice(currentPage * 5, (currentPage + 1) * 5);

  const handleToggle = () => setIsShow(!isShow);

  const handleModal = (isCreate) => {
    if (isCreate) {
      setSelected({
        intent: "",
        answers: [],
        utterances: [],
      });
    }
    setIsShow(true);
  };

  const handleCreate = () => handleModal(true);

  const handleEdit = (selected) => {
    const selectedIntent = intents.find((intent) => intent.id === selected.id);
    setSelected(selectedIntent);
    handleModal(false);
  };

  const handleDelete = (selected) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("corpus/delete", { data: { id: selected.id } })
          .then((res) => {
            setIntents(res?.data?.payload || []);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting corpus:", error);
          });
      }
    });
  };

  const handleSearch = (val) => {
    setModels(globalSearch(intents, val));
  };

  const handleRestart = () => {
    axios
      .post("/corpus/restart")
      .then(() => {
        Swal.fire("Success", "Corpus restarted successfully", "success");
      })
      .catch((error) => {
        console.error("Error restarting corpus:", error);
      });
  };

  const handleBrowse = async () => {
    try {
      const res = await axios.get("/corpus");
      const payload = res?.data?.payload || [];
      setIntents(payload);
      setModels(payload);
    } catch (error) {
      console.error("Error fetching corpus:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-poppins">
      {loading ? (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <motion.div
            className="h-16 w-16 border-4 border-t-blue-500 border-gray-300 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
          />
        </div>
      ) : (
        <div className="flex flex-grow">
          <Sidebar
            isSidebarVisible={isSidebarVisible}
            setIsSidebarVisible={setIsSidebarVisible}
            setPageTitle={setPageTitle}
          />
          <div
            className={`flex-1 p-6 ${
              isSidebarVisible ? "ml-64" : "ml-16"
            } transition-all`}>
            <main className="flex-grow bg-white p-6 overflow-y-auto h-screen">
              <h2 className="text-2xl font-bold mb-4">{pageTitle}</h2>
              <div className="max-w-7xl w-full mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                  Training Model
                </h2>
                <div className="flex justify-end mb-4">
                  <button
                    className="bg-red-500 mx-3 text-white p-2 rounded-md"
                    onClick={handleRestart}>
                    <FaPowerOff />
                  </button>
                  <button
                    className="bg-green-500 text-white p-2 rounded-md"
                    onClick={handleCreate}>
                    <FaPlus />
                  </button>
                </div>
                <div className="mb-4 flex justify-between items-center">
                  <input
                    type="text"
                    placeholder="Search by name, email"
                    className="p-2 border border-gray-300 rounded-md w-full sm:w-1/3 lg:w-1/4"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="py-3 px-6 border-b text-left">No.</th>
                        <th className="py-3 px-6 border-b text-left">
                          Intents
                        </th>
                        <th className="py-3 px-6 border-b text-left">
                          Answers
                        </th>
                        <th className="py-3 px-6 border-b text-left">
                          Utterances
                        </th>
                        <th className="py-3 px-6 border-b text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayIntents.map((intent, index) => (
                        <tr key={intent.id}>
                          <td className="py-3 px-6 border-b">
                            {currentPage * 5 + index + 1}
                          </td>
                          <td className="py-3 px-6 border-b">
                            {intent.intent}
                          </td>
                          <td className="py-3 px-6 border-b">
                            {intent.answers.join(", ")}
                          </td>
                          <td className="py-3 px-6 border-b">
                            {intent.utterances.join(", ")}
                          </td>
                          <td className="py-3 px-6 border-b space-x-2">
                            <button
                              className="text-yellow-500"
                              onClick={() => handleEdit(intent)}>
                              <FaEdit />
                            </button>
                            <button
                              className="text-red-500"
                              onClick={() => handleDelete(intent)}>
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
                  pageClassName={"py-1 px-2 bg-gray-200 border rounded-md"}
                  onPageChange={handlePageClick}
                  activeClassName={"bg-blue-500 text-white"}
                  disabledClassName={"text-gray-400 cursor-not-allowed"}
                />
              </div>
              <Modal
                setIntents={setIntents}
                handleToggle={handleToggle}
                isShow={isShow}
                selected={selected}
              />
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Corpus;
