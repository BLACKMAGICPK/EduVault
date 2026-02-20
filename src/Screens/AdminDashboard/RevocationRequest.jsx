import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarOut";
import Sidebar from "../../components/Admin_Sidebar";
import { FaFileAlt } from "react-icons/fa";
import BASE_URL from "../../Configure";
import { useLocation, useNavigate } from "react-router-dom";

function AdminRevocationRequests() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");

const location = useLocation();

const USER_ID =
  location.state?.userId || sessionStorage.getItem("userId");

console.log("🧩 Page received userId:", USER_ID);

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

  /* ================= FETCH ALL DOCUMENTS ================= */
  useEffect(() => {
    async function fetchAllDocuments() {
      try {
        const res = await fetch(`${BASE_URL}/documents/all`);
        const result = await res.json();

        if (res.ok) {
          setDocuments(result.data || []);
        } else {
          console.error(result.message);
        }
      } catch (err) {
        console.error("Fetch all documents error:", err);
      }
    }

    fetchAllDocuments();
  }, []);

  const updateStatus = async (documentId, status) => {
  try {
    const res = await fetch(`${BASE_URL}/admin/document/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ documentId, status , adminId: USER_ID }),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.message || "Action failed");
      return;
    }

    // update UI instantly
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.documentId === documentId
          ? { ...doc, status, qrCode: result.qrCode }
          : doc
      )
    );

  } catch (err) {
    console.error("Status update error:", err);
  }
};


  /* ================= FILTER ================= */
  const filteredDocs = documents.filter(
    (doc) =>
      doc.documentType.toLowerCase().includes(search.toLowerCase()) ||
      doc.studentInfo?.name?.toLowerCase().includes(search.toLowerCase()) ||
      doc.studentInfo?.rollNumber?.includes(search)
  );

  return (
    <>
      {/* ================= FIXED NAVBAR ================= */}
      <div className="navbar-fixed">
        <Navbar />
      </div>

      <div className="page-container">
        <Sidebar role="admin" isProfileComplete={true} />

        <main className="page-main">
          {/* ================= PAGE TITLE ================= */}
          <h2 className="page-title">
            Revocation Requests
          </h2>

          <p className="welcome-text">
            Review, verify, and revoke academic credentials submitted by students.
          </p>

          {/* ================= DOCUMENTS SECTION ================= */}
          <div className="section">
            <div className="section-header documents-header">
              <h3 className="section-title">All Requests</h3>

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
                  <div className={`doc-vcard ${doc.status.toLowerCase()}`} key={doc.documentId}>

                    {/* ================= STATUS ================= */}
                    <span
                      className={`status-badge ${doc.status.toLowerCase()}`}
                    >
                      {doc.status}
                    </span>

                   {/* ================= HEADER ================= */}
                    <div className="doc-vcard-header">
                    <FaFileAlt className="doc-icon" />

                    <div className="doc-header-text">
                        <h4>{doc.documentType}</h4>

                        <span className="meta-value">
                        {doc.studentInfo?.name} • {doc.studentInfo?.rollNumber}
                        </span>
                    </div>
                    </div>

                  {/* ================= STUDENT DETAILS + QR ================= */}
{/* ================= STUDENT DETAILS + QR (4 COLUMN) ================= */}
<div className="student-qr-4col">

  {/* STUDENT DETAILS (COL 1–3) */}
  <div className="student-details-4col">

    <div className="meta-item">
      <span className="meta-key">Student Name</span>
      <span className="meta-value">{doc.studentInfo?.name}</span>
    </div>

    <div className="meta-item">
      <span className="meta-key">Roll Number</span>
      <span className="meta-value">{doc.studentInfo?.rollNumber}</span>
    </div>

    <div className="meta-item">
      <span className="meta-key">Institution</span>
      <span className="meta-value">{doc.studentInfo?.institutionName}</span>
    </div>

    <div className="meta-item">
      <span className="meta-key">Degree</span>
      <span className="meta-value">{doc.studentInfo?.degree}</span>
    </div>

    <div className="meta-item">
      <span className="meta-key">Department</span>
      <span className="meta-value">{doc.studentInfo?.department}</span>
    </div>

  </div>

  {/* QR CODE (COLUMN 4) */}
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


                    {/* ================= DIVIDER ================= */}
                    <div className="doc-divider" />


                    {/* ================= DOCUMENT DETAILS ================= */}
                   {/* METADATA */}
<div className="doc-details">
  <div className="meta-grid">
    {Object.entries(doc.metadata || {})
      .filter(
        ([_, value]) =>
          value !== null &&
          value !== undefined &&
          String(value).trim() !== ""
      )
      .map(([key, value]) => (
        <div className="meta-item" key={key}>
          <span className="meta-key">
            {key.replace(/([A-Z])/g, " $1")}
          </span>
          <span className="meta-value">{value}</span>
        </div>
      ))}
  </div>
</div>



                    

                    {/* ================= FOOTER ================= */}
                    <div className="doc-bottom">
                      <span className="doc-footer">
                        Uploaded on{" "}
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </span>

                      <div className="doc-actions">

                          {doc.status === "Pending" && (
    <>
      <button
        className="approve-btn"
        onClick={() => updateStatus(doc.documentId, "Verified")}
      >
        Approve
      </button>

      <button
        className="revoke-btn"
        onClick={() => updateStatus(doc.documentId, "Revoked")}
      >
        Revoke
      </button>
    </>
  )}

  
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

/* ===== REVOKED ===== */
.status-badge.revoked {
  background: rgba(198, 40, 40, 0.18);
  color: #c62828;
  border: 1px solid #c62828;
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
  /* ================= DIVIDER LINE ================= */
.doc-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(0, 0, 0, 0.30),
    transparent
  );
  
}
/* ================= APPROVE BUTTON ================= */
.approve-btn {
  background: linear-gradient(135deg, #2e7d32, #1b5e20);
  color: #fff;
  border: none;
  padding: 0.45rem 1.2rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(46, 125, 50, 0.35);
  transition: all 0.25s ease;
}

.approve-btn:hover {
  background: linear-gradient(135deg, #1b5e20, #145214);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(46, 125, 50, 0.45);
}

.approve-btn:active {
  transform: scale(0.96);
}

/* ================= REVOKE BUTTON ================= */
.revoke-btn {
  background: linear-gradient(135deg, #c62828, #8e0000);
  color: #fff;
  border: none;
  padding: 0.45rem 1.2rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(198, 40, 40, 0.35);
  transition: all 0.25s ease;
}

.revoke-btn:hover {
  background: linear-gradient(135deg, #8e0000, #7f0000ff);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(198, 40, 40, 0.45);
}

.revoke-btn:active {
  transform: scale(0.96);
}

/* ================= DISABLED STATE (SAFETY) ================= */
.approve-btn:disabled,
.revoke-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}
/* ================= 4 COLUMN STUDENT + QR ================= */
.student-qr-4col {
  display: grid;
  grid-template-columns: 3fr 1fr; /* student block | qr */
  gap: 2.5rem;
  align-items: center;
}

/* STUDENT DETAILS → INTERNAL 3 COLUMN GRID */
.student-details-4col {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 0.9rem 1.8rem;
}

/* QR COLUMN (4th column) */
.qr-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* QR IMAGE */
.qr-image {
  width: 130px;
  height: 130px;
  padding: 10px;
  background: #fff;
  border-radius: 16px;
  border: 2px dashed rgba(0,0,0,0.25);
}

/* QR TEXT */
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


/* ================= RESPONSIVE ================= */
@media (max-width: 768px) {
  .doc-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }
}
        `}</style>
    </>
  );
}

export default AdminRevocationRequests;
