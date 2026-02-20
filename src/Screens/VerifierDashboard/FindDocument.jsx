import React, { useState } from "react";
import Navbar from "../../components/NavbarOut";
import Sidebar from "../../components/Verifier_Sidebar";
import { FaSearch, FaFileAlt } from "react-icons/fa";
import BASE_URL from "../../Configure";
import { useLocation } from "react-router-dom";

function FindDocument() {

  /* ======================================================
     📄 DOCUMENT TYPE CONFIG (LOCAL)
  ====================================================== */
  const DOCUMENT_TYPES = {
    DEGREE: {
      label: "Degree / Provisional Degree Certificate",
      required: ["degreeName", "university", "certificateIssueDate"],
    },
    COURSE: {
      label: "Course Completion Certificate",
      required: ["courseName", "platform", "certificateId"],
    },
    INTERNSHIP: {
      label: "Internship Certificate",
      required: ["organizationName", "role", "internshipType"],
    },
    EVENT: {
      label: "Event / Hackathon Certificate",
      required: [
        "eventName",
        "eventType",
        "organizedBy",
        "participationType",
      ],
    },
    SKILL: {
      label: "Skill / Training Certificate",
      required: [
        "skillName",
        "trainingProvider",
        "certificateId",
      ],
    },
    PROJECT: {
      label: "Project Certificate / Proof",
      required: [
        "projectTitle",
        "projectDomain",
        "issuer",
        "mentor",
      ],
    },
    ACHIEVEMENT: {
      label: "Achievement / Award Certificate",
      required: [
        "awardTitle",
        "awardingBody",
        "category",
      ],
    },
  };

  /* ======================================================
     🧠 STATE
  ====================================================== */
  const [form, setForm] = useState({
    studentName: "",
    rollNumber: "",
    userId: "",
    documentType: "",
  });

  const [metadata, setMetadata] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedDoc = DOCUMENT_TYPES[form.documentType];

    const location = useLocation();
  
  const USER_ID =
    location.state?.userId || sessionStorage.getItem("userId");

    console.log("📦 FindDocument USER_ID:", USER_ID);

  /* ======================================================
     🔍 SEARCH HANDLER
  ====================================================== */
  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");
      setResult(null);

      const res = await fetch(`${BASE_URL}/verifier/find-document`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          metadata,
          verifierId: USER_ID,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "No matching document found");
        return;
      }

      setResult(data.data);
    } catch (err) {
      console.error(err);
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= BASE64 → FILE URL ================= */
const getFileUrl = (base64, mimeType) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const blob = new Blob([new Uint8Array(byteNumbers)], { type: mimeType });
  return URL.createObjectURL(blob);
};

  return (
    <>
      <div className="navbar-fixed"><Navbar /></div>

      <div className="page-container">
        <Sidebar role="verifier" isProfileComplete={true} />

        <main className="page-main">
          <h2 className="page-title">Find Document</h2>

          {/* ================= SEARCH CARD ================= */}
          <div className="search-card">

            <h3>Student Information</h3>

            <div className="form-grid">
              <input
                placeholder="Student Name"
                onChange={(e) =>
                  setForm({ ...form, studentName: e.target.value })
                }
              />

              <input
                placeholder="Roll Number"
                onChange={(e) =>
                  setForm({ ...form, rollNumber: e.target.value })
                }
              />

              <input
                placeholder="Student User ID"
                onChange={(e) =>
                  setForm({ ...form, userId: e.target.value })
                }
              />

              <select
                value={form.documentType}
                onChange={(e) => {
                  setForm({ ...form, documentType: e.target.value });
                  setMetadata({});
                }}
              >
                <option value="">Select Document Type</option>
                {Object.keys(DOCUMENT_TYPES).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* ================= DYNAMIC DOCUMENT FIELDS ================= */}
            {selectedDoc && (
              <>
                <h3>{selectedDoc.label}</h3>

                <div className="form-grid">
                  {selectedDoc.required.map((field) => (
                    <input
                      key={field}
                      placeholder={field.replace(/([A-Z])/g, " $1")}
                      onChange={(e) =>
                        setMetadata({
                          ...metadata,
                          [field]: e.target.value,
                        })
                      }
                    />
                  ))}
                </div>
              </>
            )}

            <button className="search-btn" onClick={handleSearch}>
              <FaSearch /> Find Document
            </button>

            {loading && <p className="info">Searching document…</p>}
            {error && <p className="error">{error}</p>}
          </div>

          {/* ================= RESULT VCARD ================= */}
          {result && (
            <div className="doc-vcard verified">
              <span className="status-badge verified">Verified</span>

              <div className="doc-vcard-header">
                <FaFileAlt className="doc-icon" />
                <h4>{result.documentType}</h4>
              </div>

              <div className="student-qr-4col">
                <div className="student-details-4col">
                  <div className="meta-item">
                    <span className="meta-key">Name</span>
                    <span className="meta-value">
                      {result.studentInfo.name}
                    </span>
                  </div>

                  <div className="meta-item">
                    <span className="meta-key">Roll Number</span>
                    <span className="meta-value">
                      {result.studentInfo.rollNumber}
                    </span>
                  </div>

                  <div className="meta-item">
                    <span className="meta-key">Institution</span>
                    <span className="meta-value">
                      {result.studentInfo.institutionName}
                    </span>
                  </div>
                </div>

                {result.qrCode && (
                  <div className="qr-column">
                    <img
                      src={result.qrCode.dataUrl}
                      alt="QR"
                      className="qr-image"
                    />
                    <span className="qr-label">Scan to Verify</span>
                  </div>
                )}
              </div>

              <div className="doc-divider" />


<div className="doc-details">
  <div className="meta-grid">
    {Object.entries(result.metadata || {})
      .filter(
        ([_, v]) =>
          v !== null &&
          v !== undefined &&
          String(v).trim() !== ""
      )
      .map(([k, v]) => (
        <div className="meta-item" key={k}>
          <span className="meta-key">
            {k.replace(/([A-Z])/g, " $1")}
          </span>
          <span className="meta-value">{v}</span>
        </div>
      ))}
  </div>
</div>

{/* ================= FOOTER ================= */}
<div className="doc-bottom">
  <span className="doc-footer">
    Uploaded on{" "}
    {new Date(result.createdAt).toLocaleDateString()}
  </span>

  <div className="doc-actions">
    <a
      href={getFileUrl(result.file.base64, result.file.mimeType)}
      target="_blank"
      rel="noopener noreferrer"
      className="view-btn"
    >
      View Document
    </a>

    <a
      href={getFileUrl(result.file.base64, result.file.mimeType)}
      download={`${result.documentType}.pdf`}
      className="download-btn"
    >
      Download
    </a>
  </div>
</div>

            </div>
          )}
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

/* ================= SEARCH CARD ================= */
.search-card {
  background: #ffffff;
  border-radius: 22px;
  padding: 2.6rem 2.8rem;
  box-shadow: 0 16px 42px rgba(0, 0, 0, 0.12);
  border-left: 7px solid #FFD700;
  margin-top: 2.2rem;
  margin-bottom: 2.8rem;
}

/* ================= SECTION TITLES ================= */
.search-card h3 {
  font-size: 1.15rem;
  font-weight: 900;
  color: #800020;
  margin-bottom: 1.4rem;
  letter-spacing: 0.3px;
}

/* ================= FORM GRID ================= */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem 1.8rem;
  margin-bottom: 1.8rem;
}

/* ================= INPUTS ================= */
.form-grid input,
.form-grid select {
  padding: 0.65rem 1rem;
  border-radius: 12px;
  border: 1.8px solid rgba(128, 0, 32, 0.35);
  font-size: 0.78rem;
  font-weight: 600;
  outline: none;
  background: #fff;
  transition: all 0.25s ease;
  font-family: 'Poppins', sans-serif;
}

/* ================= PLACEHOLDER ================= */
.form-grid input::placeholder {
  color: #777;
  font-weight: 500;
}

/* ================= FOCUS STATE ================= */
.form-grid input:focus,
.form-grid select:focus {
  border-color: #800020;
  box-shadow: 0 0 0 3px rgba(128, 0, 32, 0.15);
}

/* ================= SELECT ================= */
.form-grid select {
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23800020' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.2rem;
}

/* ================= SEARCH BUTTON ================= */
.search-btn {
  margin-top: 0.8rem;
  width: 100%;
  padding: 0.85rem;
  background: linear-gradient(135deg, #800020, #9e0027);
  color: #FFD700;
  border: none;
  border-radius: 14px;
  font-size: 0.9rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(128, 0, 32, 0.35);
}

/* ================= BUTTON HOVER ================= */
.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(128, 0, 32, 0.45);
  background: linear-gradient(135deg, #9e0027, #800020);
}

/* ================= BUTTON ACTIVE ================= */
.search-btn:active {
  transform: scale(0.97);
}

/* ================= STATUS TEXT ================= */
.search-card .info {
  margin-top: 1.2rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: #555;
}

.search-card .error {
  margin-top: 1.2rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: #c62828;
}

/* ================= MOBILE ================= */
@media (max-width: 768px) {
  .search-card {
    padding: 2rem 1.6rem;
  }

  .search-btn {
    font-size: 0.85rem;
  }
}
.doc-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(0, 0, 0, 0.30),
    transparent
  );
        `}</style>
    </>
  );
}

export default FindDocument;
