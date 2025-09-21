import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Screens/Home"; // make sure Home.js exists in the src folder
import Domain from "./Screens/Domain"; // make sure Domain.js exists in the src/Screens folder
import AboutUs from "./Screens/AboutUs"; // make sure AboutUs.js exists in the src/Screens folder
import WD_PS from "./Screens/WD_PS";  
import AIML_PS from "./Screens/AIML_PS"; 
import APP_PS from "./Screens/APP_PS" ;
import CC_PS from "./Screens/CC_PS" ;
import CS_PS from "./Screens/CS_PS" ;
import ARVR_PS from "./Screens/ARVR_PS";
import Registeration from "./Screens/registerationclose";
import Login from "./Screens/login";
import Profile from "./Screens/Profile";
import ForgotPassword from "./Screens/ForgotPassword";
import ResetPassword from "./Screens/ResetPassword";
import AdminPage from "./Screens/Admin"; // Import the AdminPage component
import OIRegisteration from "./Screens/OI-registeration";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/domains" element={<Domain />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/wd-ps" element={<WD_PS />} />
        <Route path="/aiml-ps" element={<AIML_PS />} />
        <Route path="/arvr-ps" element={<ARVR_PS />} />
        <Route path="/cc-ps" element={<CC_PS />} />
        <Route path="/cs-ps" element={<CS_PS />} />
        <Route path="/app-ps" element={<APP_PS />} />
        <Route path="/register" element={<Registeration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin" element={<AdminPage />} /> {/* Admin route */}
        <Route path="/oi-Register" element={<OIRegisteration />} />
      </Routes>
    </Router>
  );
}

export default App;
