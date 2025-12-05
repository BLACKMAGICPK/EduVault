import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Verifier_Sidebar";
import { FaQrcode, FaCheckCircle, FaTimesCircle, FaDownload } from "react-icons/fa";

function VerifierDashboard() {
  const [activeTab, setActiveTab] = useState("scan");
  const [credentialId, setCredentialId] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = () => {
    if (credentialId.trim() === "VALID123") {
      setResult({ status: "valid", details: "B.Sc. Degree - Verified Successfully", date: "Nov 2025" });
    } else {
      setResult({ status: "invalid", details: "No record found for entered ID.", date: "Nov 2025" });
    }
  };

  const recentActivities = [
    { id: 1, action: "Verified QR - B.Sc. Degree", date: "Nov 5, 2025" },
    { id: 2, action: "Manual Check - Transcript", date: "Nov 4, 2025" },
    { id: 3, action: "Verified ID Card", date: "Nov 2, 2025" },
  ];

  return (
    <>
   
      <div className="navbar-fixed">
        <Navbar />
      </div>

      <style>{`
        :root {
          --burgundy: #800020;
          --gold: #FFD700;
          --offwhite: #fff9f3;
        }

        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background-color: var(--offwhite);
        }

     
        .navbar-fixed {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background-color: var(--burgundy);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

  
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          padding-top: 65px;
          background: linear-gradient(145deg, #fff9f3, #f8f5f2);
        }

        .dashboard-main {
          margin-left: 16rem;
          flex: 1;
          padding: 2rem 2.5rem;
          overflow-y: auto;
          transition: margin-left 0.3s ease;
        }

        @media (max-width: 992px) {
          .dashboard-main {
            margin-left: 4rem;
            padding: 1.2rem;
          }
        }


        .page-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--burgundy);
          margin-bottom: 1.5rem;
          border-bottom: 3px solid var(--gold);
          display: inline-block;
          padding-bottom: 0.3rem;
        }

   
        .tab-section {
          background: #fff;
          padding: 1.8rem 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 15px rgba(128, 0, 32, 0.08);
          margin-bottom: 2.5rem;
          border: 1px solid rgba(128, 0, 32, 0.1);
        }

        .tab-heading {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--burgundy);
          margin-bottom: 0.8rem;
          border-left: 5px solid var(--gold);
          padding-left: 0.8rem;
        }

        .tab-description {
          color: #666;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
        }

        .qr-frame {
          width: 100%;
          height: 320px;
          border: 3px dashed var(--gold);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #fffaf2, #fffdf6);
          color: var(--burgundy);
          font-weight: 600;
          box-shadow: inset 0 0 15px rgba(255, 215, 0, 0.1);
          margin-bottom: 1.2rem;
          text-align: center;
        }

   
        .manual-verify {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
          max-width: 400px;
        }

        .manual-verify input {
          padding: 0.7rem 1rem;
          border-radius: 10px;
          border: 2px solid var(--gold);
          outline: none;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .manual-verify input:focus {
          border-color: var(--burgundy);
          box-shadow: 0 0 6px rgba(128, 0, 32, 0.2);
        }


        .verify-btn, .download-btn {
          background-color: var(--burgundy);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 0.8rem 1.3rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .verify-btn:hover, .download-btn:hover {
          background-color: #9b1d30;
          transform: translateY(-2px);
        }

    
        .result-card {
          margin-top: 1.5rem;
          padding: 1.5rem;
          border-radius: 14px;
          background-color: white;
          border-left: 6px solid var(--gold);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease;
        }

        .result-card:hover {
          transform: translateY(-3px);
        }

        .result-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .activity-list {
          margin-top: 1rem;
        }

        .activity-item {
          background-color: #fff;
          padding: 1rem 1.2rem;
          border-left: 5px solid var(--gold);
          border-radius: 10px;
          margin-bottom: 0.8rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .activity-item:hover {
          transform: translateX(5px);
          background-color: #fffaf0;
        }

        .activity-item span {
          color: #555;
          font-size: 0.95rem;
        }


        @media (max-width: 768px) {
          .page-title {
            font-size: 1.4rem;
            margin-bottom: 1rem;
          }

          .tab-section {
            padding: 1.2rem 1rem;
            border-radius: 10px;
          }

          .tab-heading {
            font-size: 1.2rem;
            padding-left: 0.5rem;
          }

          .tab-description {
            font-size: 0.85rem;
            margin-bottom: 1rem;
          }

          .manual-verify input {
            font-size: 0.9rem;
            padding: 0.6rem 0.8rem;
          }

          .verify-btn, .download-btn {
            padding: 0.6rem 1rem;
            font-size: 0.85rem;
          }

          .qr-frame {
            height: 220px;
            font-size: 0.9rem;
          }

          .activity-item {
            padding: 0.8rem 1rem;
            font-size: 0.85rem;
          }

          .dashboard-main {
            padding: 1rem;
          }
        }
      `}</style>

      <div className="dashboard-container">
        <Sidebar role="verifier" activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="dashboard-main">
          <h2 className="page-title">Verifier Dashboard</h2>

     
          {activeTab === "scan" && (
            <div className="tab-section">
              <h3 className="tab-heading">🔍 Scan Credential QR Code</h3>
              <div className="qr-frame">
                <FaQrcode style={{ fontSize: "2rem", marginRight: "10px" }} />
                Align QR Code within the frame
              </div>
              <p className="tab-description">
                Use your device camera or scanner to verify credentials instantly.
              </p>
            </div>
          )}

         
          {activeTab === "manual" && (
            <div className="tab-section">
              <h3 className="tab-heading">📝 Manual Verification</h3>
              <p className="tab-description">
                Enter a credential ID manually to verify its authenticity.
              </p>

              <div className="manual-verify">
                <input
                  type="text"
                  placeholder="Enter Credential ID..."
                  value={credentialId}
                  onChange={(e) => setCredentialId(e.target.value)}
                />
                <button className="verify-btn" onClick={handleVerify}>
                  Verify Credential
                </button>
              </div>

              {result && (
                <div className={`result-card ${result.status}`}>
                  <div className="result-header">
                    {result.status === "valid" ? (
                      <FaCheckCircle color="#28a745" />
                    ) : (
                      <FaTimesCircle color="#dc3545" />
                    )}
                    {result.status === "valid" ? "Valid Credential" : "Invalid Credential"}
                  </div>
                  <p style={{ marginTop: "0.5rem", color: "#555" }}>{result.details}</p>
                  <p style={{ color: "#777", fontSize: "0.9rem" }}>Date: {result.date}</p>
                  <button className="download-btn">
                    <FaDownload /> Download Report
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "history" && (
            <div className="tab-section">
              <h3 className="tab-heading">📜 Request History</h3>
              <p className="tab-description">
                View your recent verification activity and check previous records.
              </p>
              <div className="activity-list">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <span>{activity.action}</span>
                    <span>{activity.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default VerifierDashboard;
