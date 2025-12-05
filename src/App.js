import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Screens/Home";
import AuthPage from "./Screens/Auth";
import Contact from "./Screens/Contact";
import About from "./Screens/About";
import StudentDashboard from "./Screens/StudentDashboard";
import VerifierDashboard from "./Screens/VerifierDashboard";
import AdminDashboard from "./Screens/AdminDashboard";

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
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/student-dashboard/*" element={<StudentDashboard />} />
        <Route path="/verifier-dashboard/*" element={<VerifierDashboard />} />
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
