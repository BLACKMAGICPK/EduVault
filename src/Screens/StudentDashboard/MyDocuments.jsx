import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarOut";
import Sidebar from "../../components/Student_Sidebar";
import { FaFileAlt, FaCheckCircle, FaClock } from "react-icons/fa";
import BASE_URL from "../../Configure";
import { useLocation } from "react-router-dom";

function MyDocuments() {

const location = useLocation();

const USER_ID =
  location.state?.userId || sessionStorage.getItem("userId");

console.log("🧩 Page received userId:", USER_ID);

  const [student, setStudent] = useState({});
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");

  /* ================= FILE BASE64 → URL ================= */
  const getFileUrl = (base64, mimeType) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([new Uint8Array(byteNumbers)], { type: mimeType });
    return URL.createObjectURL(blob);
  };

  /* ================= FETCH STUDENT ================= */
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${BASE_URL}/profile-student/${USER_ID}`);
        const result = await res.json();
        if (res.ok) setStudent(result.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    }
    fetchProfile();
  }, []);

  /* ================= FETCH DOCUMENTS ================= */
  useEffect(() => {
    async function fetchDocuments() {
      try {
        const res = await fetch(`${BASE_URL}/student/documents/${USER_ID}`);
        const result = await res.json();

        if (res.ok) {
          const sorted = [...(result.data || [])].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setDocuments(sorted);
        }
      } catch (err) {
        console.error("Documents fetch error:", err);
      }
    }
    fetchDocuments();
  }, []);

  /* ================= COUNTS ================= */
  const totalDocs = student.documentCount || documents.length;
  const verifiedCount = documents.filter(d => d.status === "Verified").length;
  const pendingCount = documents.filter(d => d.status === "Pending").length;

  /* ================= FILTER ================= */
  const filteredDocs = documents.filter(doc =>
    doc.documentType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* ================= FIXED NAVBAR ================= */}
      <div className="navbar-fixed">
        <Navbar />
      </div>

      <div className="page-container">
        <Sidebar role="student" isProfileComplete={true} />

        <main className="page-main">
          {/* ================= WELCOME ================= */}
          <h2 className="page-title">Hello, {student.name}</h2>

          <p className="welcome-text">
            Welcome back! Manage your academic documents and verification details securely.
          </p>

          {/* ================= STATS ================= */}
          <div className="stats-grid">
            <div className="stat-card">
              <FaFileAlt />
              <h4>{totalDocs}</h4>
              <span>Documents Uploaded</span>
            </div>

            <div className="stat-card success">
              <FaCheckCircle />
              <h4>{verifiedCount}</h4>
              <span>Verified Credentials</span>
            </div>

            <div className="stat-card pending">
              <FaClock />
              <h4>{pendingCount}</h4>
              <span>Pending Requests</span>
            </div>
          </div>

          {/* ================= MY DOCUMENTS ================= */}
          <div className="section">
            <div className="section-header documents-header">
              <h3 className="section-title">My Documents</h3>

              <input
                type="text"
                placeholder="Search documents..."
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {filteredDocs.length === 0 ? (
              <p className="empty-text">No documents found</p>
            ) : (
              filteredDocs.map((doc) => {
                const fileUrl = getFileUrl(
                  doc.file.base64,
                  doc.file.mimeType
                );

                return (
                  <div className="doc-vcard" key={doc.documentId}>
                    {/* STATUS */}
                    <span className={`status-badge ${doc.status.toLowerCase()}`}>
                      {doc.status}
                    </span>

                    {/* HEADER */}
                    <div className="doc-vcard-header">
                      <FaFileAlt className="doc-icon" />
                      <div className="doc-header-text">
                        <h4>{doc.documentType}</h4>
                      </div>
                    </div>

                    {/* ================= DOCUMENT DETAILS + QR (4 COLUMN) ================= */}
                      <div className="student-qr-4col">

                        {/* DETAILS (COL 1–3) */}
                        <div className="student-details-4col">
                          {Object.entries(doc.metadata).map(([key, value]) => (
                            <div className="meta-item" key={key}>
                              <span className="meta-key">
                                {key.replace(/([A-Z])/g, " $1")}
                              </span>
                              <span className="meta-value">{value}</span>
                            </div>
                          ))}
                        </div>

                        {/* QR CODE (COL 4) */}
                        {doc.qrCode && (
                          <div className="qr-column">
                            <img
                              src={doc.qrCode.dataUrl}
                              alt="Document Verification QR"
                              className="qr-image"
                            />
                            <span className="qr-label">Scan to Verify</span>
                          </div>
                        )}

                      </div>

                    {/* FOOTER */}
                    <div className="doc-bottom">
                      <span className="doc-footer">
                        Uploaded on{" "}
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </span>

                      <div className="doc-actions">
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="view-btn"
                        >
                          View Document
                        </a>

                        <a
                          href={fileUrl}
                          download={`${doc.documentType}.pdf`}
                          className="download-btn"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>
              <style>{`

              /* ================= GLOBAL TYPOGRAPHY ================= */
body {
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.2px;
  line-height: 1.5;
}
/* ================= PAGE TITLE ================= */
/* ================= HELLO USERNAME UNDERLINE ================= */
.page-title {
  position: relative;
  display: inline-block;
  font-size: 2.1rem;
  font-weight: 800;
  color: var(--burgundy);
  letter-spacing: 0.4px;
  padding-bottom: 0.4rem;
}

/* Gold underline */
.page-title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(
    to right,
    var(--gold),
    rgba(255, 215, 0, 0.4)
  );
  border-radius: 999px;
}


/* Username emphasis */
.page-title span,
.page-title strong {
  color: #000;
}
/* ================= SECTION HEADER ================= */
.section-header h3 {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--burgundy);
  letter-spacing: 0.3px;
}
/* ================= DOCUMENT TITLE ================= */
.doc-header-text h4 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #222;
  letter-spacing: 0.25px;
}

        .navbar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;   /* must match Navbar height */
  z-index: 1000;
}
.page-container {
  display: flex;
  padding-top: 65px;      /* space for navbar */
  min-height: 100vh;
}

/* Sidebar width = 16rem (desktop) */
.page-main {
  margin-left: 16rem;    /* 👈 THIS FIXES OVERLAP */
  flex: 1;
  padding: 2rem 2.5rem;
}

/* Tablet / Mobile sidebar */
@media (max-width: 992px) {
  .page-main {
    margin-left: 4rem;   /* collapsed sidebar */
    padding: 1.2rem;
  }
}
.stats-grid {
  margin-top: 1rem;
}

.section {
  margin-top: 2rem;
}

        
        /* ================= WELCOME TEXT ================= */
.welcome-text {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 2rem;
}

/* ================= STATS SECTION ================= */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.4rem;
  margin-bottom: 2.2rem;
}

.stat-card {
  background: #fff;
  padding: 1.5rem 1.4rem;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  text-align: center;
  border-left: 6px solid var(--gold);
}

.stat-card svg {
  font-size: 2rem;
  color: var(--burgundy);
}

.stat-card h4 {
  font-size: 1.8rem;
  margin: 0.4rem 0;
  font-weight: 800;
  color: #222;
}

.stat-card span {
  font-size: 0.8rem;
  color: #666;
}

/* ===== VERIFIED CARD ===== */
.stat-card.success {
  border-left-color: #2e7d32;
}

.stat-card.success svg {
  color: #2e7d32;
}

/* ===== PENDING CARD ===== */
.stat-card.pending {
  border-left-color: #ff8f00;
}

.stat-card.pending svg {
  color: #ff8f00;
}

/* ================= DOCUMENT VCARD ================= */
.doc-vcard {
  background: #fff;
  border-radius: 16px;
  padding: 1.4rem;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  border-left: 6px solid var(--gold);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
}

/* ================= HEADER ================= */
.doc-vcard-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.doc-icon {
  font-size: 2.6rem;
  color: var(--burgundy);
}

.doc-header-text h4 {
  margin: 0;
  font-weight: 700;
  color: #333;
}

/* ================= STATUS BADGE ================= */
.status-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

/* ===== VERIFIED ===== */
.status-badge.verified {
  background: rgba(46,125,50,0.15);
  color: #2e7d32;
  border: 1px solid #2e7d32;
}

/* ===== PENDING ===== */
.status-badge.pending {
  background: rgba(255,193,7,0.18);
  color: #ff8f00;
  border: 1px solid #ff8f00;
}

/* ===== REJECTED ===== */
.status-badge.rejected {
  background: rgba(198,40,40,0.15);
  color: #c62828;
  border: 1px solid #c62828;
}

/* ================= DETAILS GRID ================= */
.doc-details {
  width: 100%;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.8rem 1.6rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  font-size: 0.78rem;
}

.meta-key {
  font-weight: 600;
  color: #666;
}

.meta-value {
  color: #222;
}

/* ================= FOOTER ================= */
.doc-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px dashed #ddd;
  padding-top: 0.8rem;
}

.doc-footer {
  font-size: 0.7rem;
  color: #777;
}

/* ================= EMPTY TEXT ================= */
.empty-text {
  font-size: 0.85rem;
  color: #777;
  margin-top: 0.8rem;
}
/* ================= ACTION BUTTONS ================= */
.doc-actions {
  display: flex;
  gap: 0.8rem;
}

/* VIEW BUTTON */
.view-btn {
  background: var(--gold);
  color: #000;
  text-decoration: none;
  font-size: 0.75rem;
  padding: 0.45rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.25s ease;
  box-shadow: 0 3px 8px rgba(0,0,0,0.15);
}

.view-btn:hover {
  background: #e6c200;
  transform: translateY(-1px);
}

/* DOWNLOAD BUTTON */
.download-btn {
  background: #f2f2f2;
  color: #333;
  text-decoration: none;
  font-size: 0.75rem;
  padding: 0.45rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  border: 1px solid #ddd;
  transition: all 0.25s ease;
}

.download-btn:hover {
  background: #e8e8e8;
  transform: translateY(-1px);
}

/* ================= DOCUMENTS HEADER ================= */
.documents-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

/* SECTION TITLE */
.section-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--burgundy);
}

/* ================= SEARCH INPUT ================= */
.search-input {
  width: 260px;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1.5px solid var(--gold);
  font-size: 0.75rem;
  outline: none;
  font-family: 'Poppins', sans-serif;
  transition: all 0.25s ease;
}

/* FOCUS EFFECT */
.search-input:focus {
  border-color: var(--burgundy);
  box-shadow: 0 0 0 3px rgba(128,0,32,0.12);
}

/* MOBILE */
@media (max-width: 768px) {
  .documents-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-input {
    width: 100%;
  }
}

/* ================= RESPONSIVE ================= */
@media (max-width: 768px) {
  .doc-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }
}

/* ================= 4 COLUMN DOCUMENT + QR ================= */
.student-qr-4col {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2.5rem;
  align-items: center;
}

/* DETAILS GRID */
.student-details-4col {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 0.9rem 1.8rem;
}

/* QR COLUMN */
.qr-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.qr-image {
  width: 130px;
  height: 130px;
  padding: 10px;
  background: #fff;
  border-radius: 16px;
  border: 2px dashed rgba(0,0,0,0.25);
}

.qr-label {
  margin-top: 8px;
  font-size: 0.7rem;
  font-weight: 700;
  color: #555;
  letter-spacing: 0.4px;
}

/* ================= MOBILE ================= */
@media (max-width: 992px) {
  .student-qr-4col {
    grid-template-columns: 1fr;
  }

  .student-details-4col {
    grid-template-columns: repeat(2, 1fr);
  }

  .qr-column {
    margin-top: 1rem;
  }
}

@media (max-width: 576px) {
  .student-details-4col {
    grid-template-columns: 1fr;
  }
}
        `}</style>
    </>
  );
}

export default MyDocuments;
