import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./Components/allpages/AboutUs/AboutUs";
import { AuthProvider } from "./Components/context/AuthProvider";
import ProtectedRoute from "./Components/context/ProtectedRoute";
import LoginForm from "./Components/From/Loginform";
import Home from "./Components/Hero/Home";
import NotFound from "./Components/Notfound/NotFound";
import About from "./Components/pages/About";
import Dashboard from "./Components/pages/admin-dashboard";
import Security from "./Components/pages/Security";
import Contact from "./Components/pages/official";
import AddAdmin from "./Components/admin/AddAdminform";
import AdminList from "./Components/admin/AdminList";
import Ourbrgy from "./Components/pages/OurBrgy";
import NewsSection from "./Components/admin/NewsSection";
import Sidebar from "./Components/admin/Sidebar"; // Make sure the import is correct
import Corpus from "./Components/pages/Corpus/Corpus";

const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar visibility state

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
    });
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/official" element={<Contact />} />
          <Route path="/security" element={<Security />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/addAdmin" element={<AddAdmin />} />
          <Route path="/adminList" element={<AdminList />} />
          <Route path="/ourbrgy" element={<Ourbrgy />} />
          <Route path="/newssection" element={<NewsSection />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<LoginForm />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <div className="flex">
                  <Sidebar
                    isSidebarVisible={isSidebarVisible}
                    setIsSidebarVisible={setIsSidebarVisible}
                    setPageTitle={() => {}} // Remove the function if it's not needed
                  />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/corpus"
            element={
              <ProtectedRoute>
                <Corpus />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route for undefined pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
