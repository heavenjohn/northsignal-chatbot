import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';
import { db } from "../Firebase/firebaseConfig";
import Sidebar from "./sidebar";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [modalType, setModalType] = useState("");
  const [pageTitle, setPageTitle] = useState("Admin List"); // Add pageTitle state

  const adminsPerPage = 10;
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    let isMounted = true;
    const fetchAdmins = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "admins"));
        if (isMounted) {
          const adminList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAdmins(adminList);
        }
      } catch {
        if (isMounted) {
          setError("Failed to fetch admins. Please try again.");
          toast.error("Error fetching data"); 
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchAdmins();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  useEffect(() => {
    document.title = pageTitle;  // Update the document title
  }, [pageTitle]);

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.firstName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      admin.lastName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const displayedAdmins = filteredAdmins.slice(
    currentPage * adminsPerPage,
    (currentPage + 1) * adminsPerPage
  );

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const deleteAdmin = async (adminId) => {
    try {
      await deleteDoc(doc(db, "admins", adminId));
      setAdmins(admins.filter((admin) => admin.id !== adminId));
      toast.success("Admin deleted successfully!");
    } catch (error) {
      toast.error("Error deleting admin");
      console.error("Error deleting admin:", error);
    }
  };

  const handleViewProfile = (admin) => {
    setSelectedAdmin(admin);
    setModalType("view");
  };

  const handleEditProfile = (admin) => {
    setSelectedAdmin(admin);
    setEditForm({
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      contactNumber: admin.contactNumber || "",
      address: admin.address || "",
      password: "",
      confirmPassword: "",
    });
    setModalType("edit");
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSaveEdit = async () => {
    if (editForm.password !== editForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await updateDoc(doc(db, "admins", selectedAdmin.id), {
        ...editForm,
        password: editForm.password ? editForm.password : selectedAdmin.password,
      });
      setAdmins(admins.map((admin) =>
        admin.id === selectedAdmin.id ? { ...admin, ...editForm } : admin
      ));
      toast.success("Admin updated successfully!");
      setSelectedAdmin(null);
      setModalType("");
      setEditForm({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        address: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Failed to update admin");
      console.error("Error updating admin:", error);
    }
  };

  const closeModal = () => {
    setSelectedAdmin(null);
    setModalType("");
  };

  return (
    <div className="flex h-screen bg-gray-100 justify-between">
    <Sidebar 
      isSidebarVisible={isSidebarVisible} 
      setIsSidebarVisible={setIsSidebarVisible} 
      setPageTitle={setPageTitle}  // Pass the function to Sidebar
    />
      <div className={`flex-grow p-6 transition-all duration-300 ${isSidebarVisible ? "ml-5" : "ml-5"}`}>
        <div className="max-w-7xl w-full mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Admin List</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {loading ? (
            <div className="flex justify-center items-center">
              <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0A8 8 0 014 12z"></path>
              </svg>
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <div className="text-gray-700 font-semibold">Total Admins: {filteredAdmins.length} / {admins.length}</div>
                <div className="flex space-x-2 w-full sm:w-1/3 lg:w-1/4">
                  <input
                    type="text"
                    placeholder="Search by name, email"
                    className="p-2 border border-gray-300 rounded-md w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button onClick={() => setSearchTerm("")} className="p-2 bg-gray-200 text-gray-600 rounded-md">Clear</button>
                </div>
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">No.</th>
                      <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">Email</th>
                      <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">Contact Number</th>
                      <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">Address</th>
                      <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedAdmins.map((admin, index) => (
                      <tr key={admin.id}>
                        <td className="py-3 px-6 border-b text-sm">{index + 1}</td>
                        <td className="py-3 px-6 border-b text-sm">{admin.firstName} {admin.lastName}</td>
                        <td className="py-3 px-6 border-b text-sm">{admin.email}</td>
                        <td className="py-3 px-6 border-b text-sm">{admin.contactNumber}</td>
                        <td className="py-3 px-6 border-b text-sm">{admin.address}</td>
                        <td className="py-3 px-6 border-b text-sm space-x-2">
                          <button onClick={() => handleViewProfile(admin)} className="text-blue-500"><FaEye /></button>
                          <button onClick={() => handleEditProfile(admin)} className="text-yellow-500"><FaEdit /></button>
                          <button onClick={() => deleteAdmin(admin.id)} className="text-red-500"><FaTrash /></button>
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
                pageCount={Math.ceil(filteredAdmins.length / adminsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"flex justify-center items-center space-x-2"}
                pageClassName={"py-1 px-2 bg-primary border rounded-md text-"}
                activeClassName={"bg-blue-500 text-white"}
                disabledClassName={"text-gray-400 cursor-not-allowed"}
              />
            </>
          )}
        </div>

        {/* Admin View/Edit Modal */}
        {selectedAdmin && modalType && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {modalType === "edit" ? "Edit Admin" : "View Admin"}
              </h3>
              {modalType === "edit" ? (
                <div>
                  <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-600">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={editForm.firstName}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-600">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={editForm.lastName}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="contactNumber" className="block text-sm font-semibold text-gray-600">Contact Number</label>
                    <input
                      type="text"
                      id="contactNumber"
                      name="contactNumber"
                      value={editForm.contactNumber}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-semibold text-gray-600">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={editForm.address}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={editForm.password}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-600">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={editForm.confirmPassword}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button onClick={handleSaveEdit} className="bg-green-500 text-white p-2 rounded-md">Save</button>
                    <button onClick={closeModal} className="bg-gray-500 text-white p-2 rounded-md">Close</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p><strong>Name:</strong> {selectedAdmin.firstName} {selectedAdmin.lastName}</p>
                  <p><strong>Email:</strong> {selectedAdmin.email}</p>
                  <p><strong>Contact Number:</strong> {selectedAdmin.contactNumber}</p>
                  <p><strong>Address:</strong> {selectedAdmin.address}</p>
                  <div className="flex justify-end">
                    <button onClick={closeModal} className="bg-gray-500 text-white p-2 rounded-md">Close</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminList;
