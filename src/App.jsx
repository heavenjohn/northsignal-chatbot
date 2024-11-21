import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AboutUs from "./Components/allpages/AboutUs/AboutUs";
import QualityService from './Components/allpages/QualityService/Qaulity';
import LoginForm from './Components/From/Loginform';
import Signupform from "./Components/From/Signupform";
import Home from './Components/Hero/Home';
import NotFound from './Components/Notfound/NotFound'; // Create this component
import About from './Components/pages/About';
import Security from './Components/pages/Security';
import Contact from './Components/pages/Services';
import CustomerSupport from './Components/allpages/CustomerSupport/Customersupp'


const App = () => {
  // AOS initialization
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Contact />} />
          <Route path="/security" element={<Security />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path='/signup' element={<Signupform/>}/>
          <Route path="*" element={<NotFound />} /> {/* Catch all unmatched routes */}
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/customersupport" element={<CustomerSupport/>} />
          <Route path="/qualityservices" element={<QualityService />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
