import { useState, useEffect } from "react";
import { db } from "../Firebase/firebaseConfig";
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";  // Import SweetAlert2
import Sidebar from "./Sidebar"; // Import Sidebar component

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState("");
  const [newAnnouncementText, setNewAnnouncementText] = useState("");
  const [newAnnouncementImageUrl, setNewAnnouncementImageUrl] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editAnnouncementId, setEditAnnouncementId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedText, setEditedText] = useState("");
  const [editedImageUrl, setEditedImageUrl] = useState("");

  // Function to set the page title
  const setPageTitle = (title) => {
    document.title = title;
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "announcements"), (snapshot) => {
      setAnnouncements(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const addAnnouncement = async () => {
    if (newAnnouncementTitle.trim() && newAnnouncementText.trim()) {
      try {
        await addDoc(collection(db, "announcements"), {
          title: newAnnouncementTitle.trim(),
          text: newAnnouncementText.trim(),
          imageUrl: newAnnouncementImageUrl.trim() || "",
          date: new Date().toISOString(),
        });
        Swal.fire({
          icon: "success",
          title: "Announcement added successfully!",
        });
        setNewAnnouncementTitle("");
        setNewAnnouncementText("");
        setNewAnnouncementImageUrl("");
      } catch (error) {
        console.error("Error adding announcement:", error);
        Swal.fire({
          icon: "error",
          title: "Error adding announcement!",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please fill in the required fields.",
      });
    }
  };

  const deleteAnnouncement = async (id) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (result.isConfirmed) {
      try {
        // Proceed with the deletion
        await deleteDoc(doc(db, "announcements", id));
        Swal.fire({
          icon: "success",
          title: "Announcement deleted successfully!",
        });
      } catch (error) {
        console.error("Error deleting announcement:", error);
        Swal.fire({
          icon: "error",
          title: "Error deleting announcement.",
        });
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Deletion cancelled.",
      });
    }
  };
  

  const openEditModal = (id, currentTitle, currentText, currentImageUrl) => {
    setEditAnnouncementId(id);
    setEditedTitle(currentTitle);
    setEditedText(currentText);
    setEditedImageUrl(currentImageUrl || "");
    setIsEditModalOpen(true);
  };

  const saveEditedAnnouncement = async () => {
    if (editedTitle.trim() && editedText.trim()) {
      try {
        const announcementDoc = doc(db, "announcements", editAnnouncementId);
        await updateDoc(announcementDoc, {
          title: editedTitle.trim(),
          text: editedText.trim(),
          imageUrl: editedImageUrl.trim(),
        });
        Swal.fire({
          icon: "success",
          title: "Announcement updated successfully!",
        });
        setIsEditModalOpen(false);
        setEditedTitle("");
        setEditedText("");
        setEditedImageUrl("");
        setEditAnnouncementId(null);
      } catch (error) {
        console.error("Error updating announcement:", error);
        Swal.fire({
          icon: "error",
          title: "Error updating announcement.",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please fill in all the fields before saving.",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar component */}
      <Sidebar isSidebarVisible={isSidebarVisible} setIsSidebarVisible={setIsSidebarVisible} setPageTitle={setPageTitle} />

      {/* Main Content */}
      <div className={`flex-1 p-6 ${isSidebarVisible ? 'ml-64' : 'ml-16'} transition-all`}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Announcements</h1>

        {/* Add New Announcement Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Announcement</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter announcement title"
              value={newAnnouncementTitle}
              onChange={(e) => setNewAnnouncementTitle(e.target.value)}
              className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Enter announcement description"
              value={newAnnouncementText}
              onChange={(e) => setNewAnnouncementText(e.target.value)}
              className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Enter image URL (optional)"
              value={newAnnouncementImageUrl}
              onChange={(e) => setNewAnnouncementImageUrl(e.target.value)}
              className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={addAnnouncement}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Add Announcement
            </button>
          </div>
        </div>

        {/* Announcements List */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">All Announcements</h2>
          {announcements.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="border rounded-md shadow-md p-4">
                  <h3 className="text-gray-800 font-semibold mb-2">{announcement.title}</h3>
                  {announcement.imageUrl && (
                    <img
                      src={announcement.imageUrl}
                      alt={announcement.title}
                      className="w-full h-48 object-cover rounded-md mb-2"
                    />
                  )}
                  <p className="text-gray-700 mb-2">{announcement.text}</p>
                  <p className="text-gray-500 text-sm mb-4">
                    {new Date(announcement.date).toLocaleString()}
                  </p>
                  <div className="flex justify-between">
                    <button
                      onClick={() =>
                        openEditModal(
                          announcement.id,
                          announcement.title,
                          announcement.text,
                          announcement.imageUrl
                        )
                      }
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteAnnouncement(announcement.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No announcements available.</p>
          )}
        </div>
      </div>

      {/* Edit Announcement Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Announcement</h2>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Edit Title"
              className="border border-gray-300 rounded-md p-3 w-full mb-4"
            />
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              placeholder="Edit Description"
              className="border border-gray-300 rounded-md p-3 w-full mb-4"
            />
            <input
              type="text"
              value={editedImageUrl}
              onChange={(e) => setEditedImageUrl(e.target.value)}
              placeholder="Edit Image URL"
              className="border border-gray-300 rounded-md p-3 w-full mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={saveEditedAnnouncement}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncements;
