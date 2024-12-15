import { useState, useEffect } from "react";
import { db } from "../Firebase/firebaseConfig"; // Import Firebase Firestore
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import Sidebar from "./sidebar"; // Import Sidebar

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState(""); // New title state
  const [newAnnouncementText, setNewAnnouncementText] = useState("");
  const [newAnnouncementImageUrl, setNewAnnouncementImageUrl] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Fetch announcements
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "announcements"), (snapshot) => {
      setAnnouncements(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // Add announcement
  const addAnnouncement = async () => {
    if (newAnnouncementTitle.trim() && newAnnouncementText.trim()) {
      await addDoc(collection(db, "announcements"), {
        title: newAnnouncementTitle,  // Store the title
        text: newAnnouncementText,
        imageUrl: newAnnouncementImageUrl,
        date: new Date(),
      });
      setNewAnnouncementTitle(""); // Reset title input
      setNewAnnouncementText(""); // Reset text input
      setNewAnnouncementImageUrl(""); // Reset image URL input
    }
  };

  // Delete announcement
  const deleteAnnouncement = async (id) => {
    await deleteDoc(doc(db, "announcements", id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isSidebarVisible={isSidebarVisible}
        setIsSidebarVisible={setIsSidebarVisible}
        setPageTitle={() => {}}
      />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Announcements</h1>

        {/* New Announcement Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Announcement</h2>
          <div className="flex flex-col gap-4">
            {/* Title Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Enter announcement title"
                value={newAnnouncementTitle}
                onChange={(e) => setNewAnnouncementTitle(e.target.value)}
                className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Text Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Enter announcement text"
                value={newAnnouncementText}
                onChange={(e) => setNewAnnouncementText(e.target.value)}
                className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Image URL Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Enter image URL (optional)"
                value={newAnnouncementImageUrl}
                onChange={(e) => setNewAnnouncementImageUrl(e.target.value)}
                className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              onClick={addAnnouncement}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-md hover:from-blue-600 hover:to-blue-700 transition duration-300"
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
                <div
                  key={announcement.id}
                  className="bg-white border border-gray-200 rounded-md shadow-md p-4 hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-gray-800 font-semibold mb-4">{announcement.title}</h3> {/* Display title */}
                  <p className="text-gray-800 font-medium mb-4">{announcement.text}</p>
                  {announcement.imageUrl && (
                    <div className="w-full h-48 overflow-hidden rounded-md">
                      <img
                        src={announcement.imageUrl}
                        alt="Announcement"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <button
                    onClick={() => deleteAnnouncement(announcement.id)}
                    className="text-red-600 hover:underline mt-4 block text-center"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p className="mb-4">No announcements available at the moment.</p>
              <img
                src="https://via.placeholder.com/150"
                alt="No announcements"
                className="mx-auto w-32 opacity-75"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnnouncements;
