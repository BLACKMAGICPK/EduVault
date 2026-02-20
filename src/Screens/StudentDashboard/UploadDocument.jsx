import React, { useState, useEffect } from "react";
import Navbar from "../../components/NavbarOut";
import Sidebar from "../../components/Student_Sidebar";
import { FaUpload, FaFilePdf, FaLock } from "react-icons/fa";
import BASE_URL from "../../Configure";
import { useLocation } from "react-router-dom";

/* ================= DOCUMENT SCHEMAS ================= */

const DOCUMENT_SCHEMAS = {
  DEGREE: {
    label: "Degree / Provisional Degree Certificate",
    required: [
      "degreeName",
      "university",
      "certificateIssueDate",
      "documentFile",
    ],
    optional: ["certificateNumber", "cgpa", "modeOfStudy"],
  },

  COURSE: {
    label: "Course Completion Certificate",
    required: [
      "courseName",
      "platform",
      "issuedBy",
      "duration",
      "completionDate",
      "certificateId",
      "documentFile",
    ],
    optional: ["instructor", "grade", "verificationUrl"],
  },

  INTERNSHIP: {
    label: "Internship Certificate",
    required: [
      "organizationName",
      "role",
      "internshipType",
      "startDate",
      "endDate",
      "mode",
      "issuedBy",
      "documentFile",
    ],
    optional: ["supervisor", "stipend"],
  },

  EVENT: {
    label: "Event / Hackathon Certificate",
    required: [
      "eventName",
      "eventType",
      "organizedBy",
      "participationType",
      "eventDate",
      "location",
      "documentFile",
    ],
    optional: ["rank", "teamName"],
  },

  SKILL: {
    label: "Skill / Training Certificate",
    required: [
      "skillName",
      "trainingProvider",
      "duration",
      "completionDate",
      "mode",
      "certificateId",
      "documentFile",
    ],
  },

  PROJECT: {
    label: "Project Certificate / Proof",
    required: [
      "projectTitle",
      "projectDomain",
      "issuer",
      "mentor",
      "duration",
      "year",
      "documentFile",
    ],
  },

  ACHIEVEMENT: {
    label: "Achievement / Award Certificate",
    required: [
      "awardTitle",
      "awardingBody",
      "category",
      "dateAwarded",
      "level",
      "documentFile",
    ],
  },
};

function StudentUpload() {

const location = useLocation();

const USER_ID =
  location.state?.userId || sessionStorage.getItem("userId");

console.log("🧩 Page received userId:", USER_ID);

  const [student, setStudent] = useState({});
  const [documentType, setDocumentType] = useState("");
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);


  /* ================= FETCH STUDENT ================= */
useEffect(() => {
  async function fetchProfile() {
    try {
      const res = await fetch(`${BASE_URL}/profile-student/${USER_ID}`);
      const result = await res.json();

      if (res.ok) {
        setStudent(result.data);   // ✅ full student object
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error("Profile Fetch Error:", err);
    }
  }

  fetchProfile();
}, []);


  /* ================= HANDLERS ================= */

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

const handleFileSelect = (e) => {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    setFile(selectedFile);
  }
};

const handleUpload = async () => {
  if (!documentType || !file) {
    alert("Please complete required fields and upload file");
    return;
  }

  try {
     setUploading(true); // 🔄 START LOADING
    const formData = new FormData();

    // 🔒 Student (trusted, locked)
    formData.append("userId", student.userId);
    formData.append("name", student.name);
    formData.append("rollNumber", student.rollNumber);
    formData.append("institutionName", student.institutionName);
    formData.append("degree", student.degree);
    formData.append("department", student.department);

    // 📄 Document info
    formData.append("documentType", documentType);

    // 🧾 Dynamic metadata (convert object → JSON)
    formData.append("metadata", JSON.stringify(form));

    // 📎 File
    formData.append("document", file);

    const res = await fetch(`${BASE_URL}/student/upload-document`, {
      method: "POST",
      body: formData, // ❗ DO NOT set Content-Type manually
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.message || "Upload failed");
      return;
    }

    alert("✅ Document uploaded successfully");

    // Reset form
    setDocumentType("");
    setForm({});
    setFile(null);

    // Optional: refresh uploaded documents list
    // fetchDocuments();

  } catch (error) {
    console.error("Upload Error:", error);
    alert("Something went wrong while uploading");
  }finally {
    setUploading(false); // ✅ STOP LOADING
  }
};


/* ================= FETCH STUDENT DOCUMENTS ================= */
useEffect(() => {
  async function fetchDocuments() {
    try {
      const res = await fetch(
        `${BASE_URL}/student/documents/${USER_ID}`
      );
      const result = await res.json();

      if (res.ok) {
        setDocuments(result.data || []);
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error("Fetch Documents Error:", err);
    }
  }

  fetchDocuments();
}, []);


const getFileUrl = (base64, mimeType) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const blob = new Blob([new Uint8Array(byteNumbers)], { type: mimeType });
  return URL.createObjectURL(blob);
};


  const schema = DOCUMENT_SCHEMAS[documentType];

  return (
  <>
    {/* ================= FIXED NAVBAR ================= */}
    <div className="navbar-fixed">
      <Navbar />
    </div>

    {/* ================= PAGE LAYOUT ================= */}
    <div className="page-container">
      <Sidebar
  role="student"
  userId={USER_ID}
  isProfileComplete={true}
/>


      <main className="page-main">
        {/* ================= PAGE TITLE ================= */}
        <h2 className="page-title">Upload Certificates</h2>

{/* ================= LOCKED STUDENT INFO ================= */}
<div className="section">
  <div className="section-header">
    <h3>
      <FaLock style={{ marginRight: "6px" }} />
      Student Details (Auto-Filled)
    </h3>
  </div>

  <div className="form-grid">
    <div className="form-group">
      <label>Full Name</label>
      <input value={student.name || ""} disabled />
    </div>

    <div className="form-group">
      <label>Date of Birth</label>
      <input value={student.dateOfBirth || ""} disabled />
    </div>

    <div className="form-group">
      <label>Roll Number</label>
      <input value={student.rollNumber || ""} disabled />
    </div>

    <div className="form-group">
      <label>Institution</label>
      <input value={student.institutionName || ""} disabled />
    </div>

    <div className="form-group">
      <label>Degree</label>
      <input value={student.degree || ""} disabled />
    </div>

    <div className="form-group">
      <label>Department</label>
      <input value={student.department || ""} disabled />
    </div>

    <div className="form-group">
      <label>Year of Admission</label>
      <input value={student.yearOfAdmission || ""} disabled />
    </div>

    <div className="form-group">
      <label>Year of Graduation</label>
      <input value={student.yearOfGraduation || ""} disabled />
    </div>
  </div>
</div>


        {/* ================= UPLOAD CARD ================= */}
        <div className="section">
          <div className="section-header">
            <h3>Upload New Certificate</h3>
          </div>

          <p className="subtitle">
            Required fields change automatically based on document type
          </p>

          {/* ================= DOCUMENT TYPE ================= */}
          <div className="form-group" style={{ maxWidth: "360px" }}>
            <label>Document Type</label>
            <select
              value={documentType}
              onChange={(e) => {
                setDocumentType(e.target.value);
                setForm({});
                setFile(null);
              }}
            >
              <option value="">Select document type</option>
              {Object.entries(DOCUMENT_SCHEMAS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>

          {/* ================= DYNAMIC FORM ================= */}
          {schema && (
            <div className="upload-layout">
              {/* ===== LEFT : FORM FIELDS ===== */}
              <div>
                <h4 className="form-subtitle">Required Details</h4>

                <div className="form-grid">
                  {schema.required
                    .filter((f) => f !== "documentFile")
                    .map((field) => (
                      <div className="form-group" key={field}>
                        <label>
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          onChange={(e) =>
                            handleFieldChange(field, e.target.value)
                          }
                        />
                      </div>
                    ))}
                </div>

                {/* ===== OPTIONAL FIELDS ===== */}
                {schema.optional && (
                  <>
                    <h4 className="form-subtitle" style={{ marginTop: "1.8rem" }}>
                      Optional Details
                    </h4>

                    <div className="form-grid">
                      {schema.optional.map((field) => (
                        <div className="form-group" key={field}>
                          <label>
                            {field.replace(/([A-Z])/g, " $1")}
                          </label>
                          <input
                            onChange={(e) =>
                              handleFieldChange(field, e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* ===== RIGHT : DRAG & DROP ===== */}
              <div className="upload-dropzone">
                {!file ? (
                    <>
                    <FaFilePdf className="upload-icon" />
                    <p>Drag & drop certificate here</p>
                    <span>PDF / JPG / PNG (Max 5MB)</span>
                    </>
                ) : (
                    <div className="file-preview">
                    <FaFilePdf className="file-icon" />
                    <div className="file-info">
                        <p className="file-name">{file.name}</p>
                        <p className="file-size">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                    </div>
                    </div>
                )}

                <input type="file" onChange={handleFileSelect} />
                </div>

            </div>
          )}

          {/* ================= ACTION ================= */}
          {schema && (
            <div className="upload-action">
              <button
                    className="upload-btn loading-btn"
                    onClick={handleUpload}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <span className="btn-spinner"></span>
                        Uploading Document
                      </>
                    ) : (
                      <>
                        <FaUpload /> Upload Document
                      </>
                    )}
                  </button>

            </div>
          )}
        </div>

        {/* ================= DOCUMENT LIST ================= */}
<div className="section">
  <div className="section-header">
    <h3>Uploaded Certificates</h3>
  </div>

  {documents.length === 0 ? (
    <p style={{ color: "#777", fontSize: "0.9rem" }}>
      No certificates uploaded yet
    </p>
  ) : (
    <div className="doc-vcard-list">
      {documents.map((doc) => {
        const fileUrl = getFileUrl(
          doc.file.base64,
          doc.file.mimeType
        );

        return (
          <div className="doc-vcard" key={doc.documentId}>
  {/* HEADER */}
  <div className="doc-vcard-header">
    <FaFilePdf className="doc-icon" />
    <div className="doc-header-text">
      <h4>{doc.documentType}</h4>
      <span className={`status-badge ${doc.status.toLowerCase()}`}>
  {doc.status}
</span>

    </div>
  </div>

  {/* DOCUMENT DETAILS */}
  <div className="doc-details">
    <div className="meta-grid">
      {Object.entries(doc.metadata).map(([key, value]) => (
        <div key={key} className="meta-item">
          <span className="meta-key">
            {key.replace(/([A-Z])/g, " $1")}
          </span>
          <span className="meta-value">{value}</span>
        </div>
      ))}
    </div>
  </div>

  {/* ACTION BAR */}
  <div className="doc-bottom">
    <span className="doc-footer">
      Uploaded on {new Date(doc.createdAt).toLocaleDateString()}
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
      })}
    </div>
  )}
</div>

      </main>
    </div>
 

      {/* ================= STYLES ================= */}
      <style>{`
        .page-main { margin-left: 16rem; padding: 2rem; }
        @media (max-width: 992px) { .page-main { margin-left: 4rem; } }

        .locked-card, .upload-card {
          background: #fff;
          padding: 1.6rem;
          border-radius: 16px;
          margin-bottom: 2rem;
          box-shadow: 0 6px 18px rgba(0,0,0,.08);
        }

        .locked-grid, .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        label { font-size: .8rem; color: #666; }
        input, select {
          width: 90%;
          padding: .55rem;
          border-radius: 8px;
          border: 1.5px solid #FFD700;
        }

        .upload-right {
          margin-top: 1.5rem;
          border: 2px dashed #FFD700;
          padding: 1.6rem;
          border-radius: 14px;
          text-align: center;
          position: relative;
          background: #fffdf5;
        }

        .upload-right input {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
        }

        .upload-action { 
        text-align: right; 
        margin-top: 1.5rem;
        text-align: center;

        }

        button {
          background: #FFD700;
          border: none;
          padding: .6rem 1.6rem;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
        }
          .navbar-fixed {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 65px;        /* must match Navbar height */
            z-index: 1000;
            background: #800020; /* or your navbar bg */
            }
            .page-container {
                padding-top: 65px; /* same as navbar height */
                height: 100vh;
                }

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

/* ================= FIXED NAVBAR ================= */
.navbar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;
  z-index: 1000;
}

/* ================= PAGE LAYOUT ================= */
.page-container {
  display: flex;
  padding-top: 65px; /* navbar height */
  height: 100vh;
}

.page-main {
  margin-left: 16rem;
  flex: 1;
  padding: 2rem 2.5rem;
  height: calc(100vh - 65px);
 
}

@media (max-width: 992px) {
  .page-main {
    margin-left: 4rem;
    padding: 1.2rem;
  }
}

/* ================= PAGE TITLE ================= */
.page-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--burgundy);
  border-bottom: 3px solid var(--gold);
  display: inline-block;
  margin-bottom: 2rem;
}

/* ================= COMMON SECTION CARD ================= */
.section {
  background: #fff;
  border-radius: 14px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-header h3 {
  margin: 0;
  color: var(--burgundy);
  font-weight: 700;
}

/* ================= FORM GRID ================= */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
}

.form-group label {
  font-size: 0.8rem;
  color: #777;
}

.form-group input,
.form-group select {
  width: 90%;
  padding: 0.45rem 0.6rem;
  border-radius: 8px;
  border: 1.5px solid var(--gold);
  font-size: 0.85rem;
  font-family: 'Poppins', sans-serif;
}

/* ================= UPLOAD LAYOUT ================= */
.upload-layout {
  display: grid;
  grid-template-columns: 2fr 1.3fr;
  gap: 2rem;
}

@media (max-width: 900px) {
  .upload-layout {
    grid-template-columns: 1fr;
  }
}

/* ================= DROPZONE ================= */
.upload-dropzone {
  border: 2px dashed var(--gold);
  border-radius: 14px;
  padding: 2rem 1rem;
  text-align: center;
  background: #fffdf5;
  position: relative;
}

.upload-dropzone input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.upload-icon {
  font-size: 3rem;
  color: var(--burgundy);
}

.upload-dropzone p {
  font-weight: 600;
  color: #444;
}

.upload-dropzone span {
  font-size: 0.75rem;
  color: #777;
}

/* ================= BUTTON ================= */
.upload-action {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.upload-btn {
  background: var(--gold);
  border: none;
  padding: 0.55rem 1.6rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
}

.doc-list {
  display: flex;
  gap: 1.5rem;
  
}

.doc-card {
  min-width: 260px;
  background: white;
  padding: 1.2rem;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border-left: 6px solid var(--gold);
}

/* ================= STATUS BADGE ================= */
/* ================= STATUS BADGE (TOP RIGHT) ================= */
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
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  z-index: 2;
}


/* ===== VALID ===== */
.status-badge.valid {
  background: rgba(46, 125, 50, 0.12);
  color: #2e7d32;
  border: 1px solid #2e7d32;
}

/* ===== REVOKED ===== */
.status-badge.revoked {
  background: rgba(198, 40, 40, 0.12);
  color: #c62828;
  border: 1px solid #c62828;
}

/* ===== PENDING (future-safe) ===== */
.status-badge.pending {
  background: rgba(255, 193, 7, 0.18);
  color: #ff8f00;
  border: 1px solid #ff8f00;
}

/* ===== FILE PREVIEW ===== */
.file-preview {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  justify-content: center;
}

.file-icon {
  font-size: 2.4rem;
  color: var(--burgundy);
}

.file-info {
  text-align: left;
}

.file-name {
  font-weight: 600;
  font-size: 0.85rem;
  color: #333;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  font-size: 0.7rem;
  color: #777;
}
/* ================= VCARD ================= */
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
  position: relative;   /* 🔥 REQUIRED */
}


/* ================= HEADER ================= */
.doc-vcard-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.doc-icon {
  font-size: 2.8rem;
  color: var(--burgundy);
}

.doc-header-text h4 {
  margin: 0;
  font-weight: 700;
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

/* ================= BOTTOM BAR ================= */
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

/* ================= ACTION BUTTONS ================= */
.doc-actions {
  display: flex;
  gap: 0.8rem;
}

.view-btn,
.download-btn {
  text-decoration: none;
  font-size: 0.75rem;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  font-weight: 600;
}

.view-btn {
  background: var(--gold);
  color: #000;
}

.download-btn {
  background: #eee;
  color: #333;
}

/* ================= RESPONSIVE ================= */
@media (max-width: 768px) {
  .doc-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }
}

/* ================= UPLOAD BUTTON LOADING ================= */
.loading-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.loading-btn:disabled {
  cursor: not-allowed;
  opacity: 0.85;
}

/* Spinner */
.btn-spinner {
  width: 18px;
  height: 18px;
  border: 3px solid rgba(128, 0, 32, 0.25);
  border-top: 3px solid #800020; /* burgundy */
  border-radius: 50%;
  animation: btn-spin 0.8s linear infinite;
}

@keyframes btn-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


      `}</style>
    </>
  );
}

export default StudentUpload;
