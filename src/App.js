import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Screens/Home";
import AuthPage from "./Screens/Auth";
import ForgotPassword from "./Screens/ForgotPassword";
import ResetPassword from "./Screens/ResetPassword";
import Contact from "./Screens/Contact";
import About from "./Screens/About";
import PublicVerify from "./Screens/PublicVerify";



import StudentProfile from "./Screens/StudentDashboard/StudentProfile";
import VerifierProfile from "./Screens/VerifierDashboard/VerifierProfile";
import AdminProfile from "./Screens/AdminDashboard/AdminProfile";

import StudentUpload from "./Screens/StudentDashboard/UploadDocument";
import NotificationHistory from "./Screens/StudentDashboard/NotificationHistory";
import MyDocuments from "./Screens/StudentDashboard/MyDocuments";

import AdminRevocationRequests from "./Screens/AdminDashboard/RevocationRequest";
import AdminActivityLogs from "./Screens/AdminDashboard/Activity_logs";
import AdminManageDocuments from "./Screens/AdminDashboard/ManageDocuments";
import AdminManageUsers from "./Screens/AdminDashboard/ManageUsers";

import FindDocument from "./Screens/VerifierDashboard/FindDocument";
import ScanQR from "./Screens/VerifierDashboard/ScanQR";
import VerifierActivityLogs from "./Screens/VerifierDashboard/ActivityLogs";

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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      
        
        <Route path="/student-dashboard/profile" element={<StudentProfile />} />
        <Route path="/verifier-dashboard/profile" element={<VerifierProfile />} />
        <Route path="/admin-dashboard/profile" element={<AdminProfile />} />

        <Route path="/student-dashboard/upload" element={<StudentUpload />} />
        <Route path="/student-dashboard/history" element={<NotificationHistory />} />
        <Route path="/student-dashboard/documents" element={<MyDocuments />} /> 

        <Route path="/admin-dashboard/revocation-requests" element={<AdminRevocationRequests />} />
        <Route path="/admin-dashboard/logs" element={<AdminActivityLogs />} />
        <Route path="/admin-dashboard/documents" element={<AdminManageDocuments />} />
        <Route path="/admin-dashboard/users" element={<AdminManageUsers />} />

        <Route path="/verifier-dashboard/find-document" element={<FindDocument />} />
        <Route path="/verifier-dashboard/scan" element={<ScanQR />} />
        <Route path="/verifier-dashboard/logs" element={<VerifierActivityLogs />} />

        <Route path="/verify/:documentId" element={<PublicVerify />} />


      </Routes>
    </Router>
  );
}

export default App;
