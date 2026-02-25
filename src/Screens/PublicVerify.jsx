import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BASE_URL from "../Configure";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function PublicVerify() {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [verifiedData, setVerifiedData] = useState(null);

  useEffect(() => {
    const verifyDocument = async () => {
      try {
        const fullUrl = window.location.href;

        const res = await fetch(`${BASE_URL}/verify-document`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            verificationUrl: fullUrl,
          }),
        });

        const data = await res.json();

        if (res.ok && data.valid) {
          setValid(true);
          setVerifiedData(data);
        } else {
          setValid(false);
        }
      } catch (err) {
        console.error("Verification Error:", err);
        setValid(false);
      } finally {
        setLoading(false);
      }
    };

    verifyDocument();
  }, []);

  const studentInfo = verifiedData?.studentInfo;
  const documentType = verifiedData?.documentType;

  return (
    <>
      <Navbar />

      <div className="verify-container">
        <div className="verify-card">

          {loading && (
            <p className="loading-text">Verifying document...</p>
          )}

          {!loading && valid && studentInfo && (
            <>
              <div className="tick-circle">
                <FaCheckCircle />
              </div>

              <h2>Document Verified</h2>
              <p className="subtitle">
                This document is authentic and officially validated by EduVault.
              </p>

              <div className="verified-card">
                <h3>Student Details</h3>

                <div className="details-grid">
                  <div>
                    <label>Name</label>
                    <span>{studentInfo.name}</span>
                  </div>

                  <div>
                    <label>Roll Number</label>
                    <span>{studentInfo.rollNumber}</span>
                  </div>

                  <div>
                    <label>Institution</label>
                    <span>{studentInfo.institutionName}</span>
                  </div>

                  <div>
                    <label>Degree</label>
                    <span>{studentInfo.degree}</span>
                  </div>

                  <div>
                    <label>Department</label>
                    <span>{studentInfo.department}</span>
                  </div>

                  <div>
                    <label>Document Type</label>
                    <span>{documentType}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {!loading && !valid && (
            <div className="invalid-section">
              <FaTimesCircle className="invalid-icon" />
              <h2>Invalid or Tampered Document</h2>
              <p>This QR code is not recognized by EduVault.</p>
            </div>
          )}

        </div>
      </div>

      <Footer />

      <style>{`
        .verify-container {
          min-height: 90vh;
          background: linear-gradient(145deg, #660019, #800020, #a52a2a);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
        }

        .verify-card {
          background: #fff;
          border-radius: 24px;
          padding: 3rem 3.5rem;
          width: 100%;
          max-width: 720px;
          text-align: center;
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          animation: fadeIn 0.6s ease;
        }

        .tick-circle {
          font-size: 5rem;
          color: #2e7d32;
          margin-bottom: 1rem;
          animation: pop 0.5s ease;
        }

        .invalid-icon {
          font-size: 4rem;
          color: #c62828;
          margin-bottom: 1rem;
        }

        h2 {
          color: #800020;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          color: #666;
          margin-bottom: 2rem;
        }

        .verified-card {
          background: #fff;
          border-radius: 20px;
          padding: 2rem 2.5rem;
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
          border-left: 6px solid #FFD700;
          text-align: left;
        }

        .verified-card h3 {
          color: #800020;
          margin-bottom: 1.4rem;
          font-weight: 900;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.2rem 2rem;
        }

        .details-grid label {
          font-size: 0.75rem;
          color: #777;
          display: block;
          margin-bottom: 0.2rem;
        }

        .details-grid span {
          font-size: 0.95rem;
          font-weight: 700;
          color: #333;
        }

        .loading-text {
          font-weight: 600;
          color: #FFD700;
        }

        @keyframes pop {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .details-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

export default PublicVerify;