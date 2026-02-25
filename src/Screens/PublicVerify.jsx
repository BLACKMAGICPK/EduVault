import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BASE_URL from "../Configure";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function PublicVerify() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [docData, setDocData] = useState(null);

  useEffect(() => {
    const verifyDocument = async () => {
      try {
        const fullUrl = window.location.href;

        const response = await fetch(`${BASE_URL}/verify-document`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            verificationUrl: fullUrl,
          }),
        });

        const data = await response.json();

        if (data.valid) {
          setValid(true);
          setDocData(data);
        } else {
          setValid(false);
        }
      } catch (err) {
        console.error("Verification error:", err);
        setValid(false);
      } finally {
        setLoading(false);
      }
    };

    verifyDocument();
  }, [location]);

  return (
    <>
      <Navbar />

      <style>{`
        :root {
          --burgundy: #800020;
          --gold: #f4c542;
          --white: #ffffff;
          --offwhite: #f9f9f9;
          --charcoal: #2e2e2e;
        }

        .verify-container {
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, #660019, #800020, #a52a2a);
          padding: 40px 20px;
        }

        .verify-card {
          background: var(--white);
          border-radius: 20px;
          padding: 40px;
          width: 100%;
          max-width: 500px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .verify-title {
          font-size: 1.8rem;
          margin-bottom: 20px;
          color: var(--burgundy);
          font-weight: 700;
        }

        .status-valid {
          color: green;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .status-invalid {
          color: red;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .doc-details {
          margin-top: 20px;
          text-align: left;
          background: var(--offwhite);
          padding: 20px;
          border-radius: 12px;
        }

        .doc-details p {
          margin: 8px 0;
          font-weight: 500;
          color: var(--charcoal);
        }

        .loading {
          color: var(--gold);
          font-weight: 600;
        }
      `}</style>

      <div className="verify-container">
        <div className="verify-card">

          <div className="verify-title">EduVault Document Verification</div>

          {loading && <p className="loading">Verifying document...</p>}

          {!loading && valid && (
            <>
              <div className="status-valid">
                <FaCheckCircle /> Document Verified
              </div>

              <div className="doc-details">
                <p><strong>Student Name:</strong> {docData.studentInfo?.name}</p>
                <p><strong>Register No:</strong> {docData.studentInfo?.registerNumber}</p>
                <p><strong>Document Type:</strong> {docData.documentType}</p>
              </div>
            </>
          )}

          {!loading && !valid && (
            <div className="status-invalid">
              <FaTimesCircle /> Invalid or Tampered Document
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}

export default PublicVerify;