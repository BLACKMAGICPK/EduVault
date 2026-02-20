import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/NavbarOut";
import Sidebar from "../../components/Verifier_Sidebar";
import { FaCamera, FaUpload, FaCheckCircle } from "react-icons/fa";
import { Html5Qrcode } from "html5-qrcode";
import BASE_URL from "../../Configure";
import { useLocation } from "react-router-dom";

function ScanQR() {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [verifiedData, setVerifiedData] = useState(null);


  const qrRegionRef = useRef(null);
  const qrScannerRef = useRef(null);


  const location = useLocation();

const USER_ID =
  location.state?.userId || sessionStorage.getItem("userId");

console.log("🧩 Page received userId:", USER_ID);

  /* ======================================================
     🔐 VERIFY SIGNATURE (CORE LOGIC)
  ====================================================== */
const verifyDocument = async (qrData) => {
  try {
    console.log("QR Code detected:", qrData);

    setLoading(true);
    setError("");

    const verificationUrl = qrData?.trim();

    if (!verificationUrl.startsWith("http")) {
      setError("Invalid QR Code");
      return;
    }

    const res = await fetch(`${BASE_URL}/verify-document`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ verificationUrl , verifierId: USER_ID,  }),
    });

    // 🔴 SAFETY CHECK
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Server did not return JSON");
    }

    const data = await res.json();

    if (res.ok && data.valid) {
         setVerifiedData(data); 
      setVerified(true);
      stopCamera();
    } else {
      setError(data.message || "Document not valid or tampered");
    }

  } catch (err) {
    console.error("Verification Error:", err);
    setError("Verification failed (Invalid server response)");
  } finally {
    setLoading(false);
  }
};



  /* ======================================================
     📷 CAMERA SCANNER
  ====================================================== */
 useEffect(() => {
  if (!showCamera || verified) return;

  const startCamera = async () => {
    try {
      const scanner = new Html5Qrcode("qr-reader");
      qrScannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 280, height: 280 },
        },
        (decodedText) => {
  verifyDocument(decodedText);
  console.log("QR Code detected:", decodedText);
}

      );
    } catch (err) {
      console.error("Camera Start Error:", err);
      setError("Camera access denied or unavailable");
    }
  };

  startCamera();

  return () => {
    stopCamera();
  };
}, [showCamera, verified]);

const stopCamera = async () => {
  try {
    if (qrScannerRef.current) {
      await qrScannerRef.current.stop();
      await qrScannerRef.current.clear();
      qrScannerRef.current = null;
    }
  } catch (err) {
    console.warn("Camera Stop Error:", err);
  }
};


  /* ======================================================
     🖼 IMAGE UPLOAD (DRAG / CLICK)
  ====================================================== */
  const handleFileUpload = async (file) => {
    if (!file) return;

    try {
      setLoading(true);
      setError("");

      const html5QrCode = new Html5Qrcode("temp-reader");

      const result = await html5QrCode.scanFile(file, true);
      await html5QrCode.clear();
        console.log("QR Code detected:", result);
      verifyDocument(result);

    } catch (err) {
      console.error(err);
      setError("QR not detected in image");
      setLoading(false);
    }
  };

  /* ======================================================
     ✅ SUCCESS SCREEN (REPLACES PAGE)
  ====================================================== */
 if (verified && verifiedData) {
  const { studentInfo, documentType } = verifiedData;

  return (
    <>
      <div className="navbar-fixed"><Navbar /></div>

      <div className="page-container">
        <Sidebar role="verifier" isProfileComplete={true} />

        <main className="success-container">

          {/* ✅ SUCCESS ANIMATION */}
          <div className="tick-circle">
            <FaCheckCircle />
          </div>

          <h2>Document Verified</h2>
          <p>This document is authentic and untampered</p>

          {/* 📄 VERIFIED DETAILS CARD */}
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

        </main>
      </div>

      <style>{`
  
      
       .navbar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;
  z-index: 1000;
}

        .success-container {
          margin-top: 5.0rem;
          margin-left: 16rem;
          min-height: calc(100vh - 65px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          animation: fadeIn 0.6s ease;
        }

        .tick-circle {
          font-size: 5.2rem;
          color: #2e7d32;
          animation: pop 0.6s ease;
        }

        @keyframes pop {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        h2 {
          color: #800020;
          font-weight: 800;
          margin: 0.3rem 0;
        }

        p {
          color: #555;
          font-size: 0.9rem;
        }

        /* ================= VERIFIED CARD ================= */
        .verified-card {
          margin-top: 1.5rem;
          background: #fff;
          border-radius: 20px;
          padding: 2rem 2.5rem;
          width: 100%;
          max-width: 620px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
          border-left: 6px solid #FFD700;
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

        @media (max-width: 768px) {
          .details-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

  /* ======================================================
     📄 MAIN PAGE
  ====================================================== */
  return (
    <>
      <div className="navbar-fixed"><Navbar /></div>

      <div className="page-container">
        <Sidebar role="verifier" isProfileComplete={true} />

        <main className="page-main">
  <h2 className="page-title">Verify Document</h2>

  <div className="scan-stack">

  {/* ================= UPLOAD SECTION (PRIMARY) ================= */}
  <div className="scan-card upload-card">
    <h3 className="scan-title">Upload QR Image</h3>

    <label className="upload-box large-upload">
  <div className="upload-content">
    <FaUpload className="upload-icon" />
    <div className="upload-text">
      <p className="upload-main-text">
        Drag & drop QR image here
      </p>
      <span className="sub-text">
        or click to browse (PNG / JPG)
      </span>
    </div>
  </div>

  <input
    type="file"
    accept="image/*"
    hidden
    onChange={(e) => handleFileUpload(e.target.files[0])}
  />
</label>

  </div>

  {/* ================= CAMERA SECTION (SECONDARY) ================= */}
  <div className="scan-card camera-card">
    <h3 className="scan-title">Scan via Camera</h3>

    {!showCamera ? (
      <button
        className="open-camera-btn large-btn"
        onClick={() => setShowCamera(true)}
      >
        <FaCamera />
        Open Camera Scanner
      </button>
    ) : (
      <div className="camera-wrapper large-camera">
  <div className="camera-center">
    <div id="qr-reader" ref={qrRegionRef}></div>
  </div>


        <button
          className="close-camera-btn"
          onClick={() => {
            setShowCamera(false);
            stopCamera();
          }}
        >
          Close Camera
        </button>
      </div>
    )}
  </div>

</div>


  <div id="temp-reader" style={{ display: "none" }}></div>

  {loading && <p className="info">Verifying document…</p>}
  {error && <p className="error">{error}</p>}
</main>

      </div>

      <style>{`
      .page-main {
  margin-left: 16rem;
  padding: 3rem;
  padding-top: 6.5rem;
}
  .navbar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;
  z-index: 1000;
}

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


/* ================= STACK ================= */
.scan-stack {
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  margin-top: 2.0rem;
}

/* ================= CARD ================= */
.scan-card {
  background: #fff;
  border-radius: 22px;
  padding: 2.8rem;
  box-shadow: 0 14px 36px rgba(0,0,0,0.1);
  border-left: 7px solid #FFD700;
}

/* ================= TITLES ================= */
.scan-title {
  font-size: 1.35rem;
  font-weight: 900;
  color: #800020;
  margin-bottom: 2rem;
}

/* ================= UPLOAD (BIG) ================= */
.large-upload {
  min-height: 260px;
  border: 2.5px dashed rgba(128,0,32,0.35);
  border-radius: 20px;
  padding: 3.0rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.35s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(
    to bottom,
    rgba(255,215,0,0.12),
    rgba(255,215,0,0.04)
  );
}

.large-upload:hover {
  background: linear-gradient(
    to bottom,
    rgba(255,215,0,0.12),
    rgba(255,215,0,0.04)
  );
  border-color: #FFD700;
  transform: translateY(-4px);
}

.large-upload svg {
  font-size: 3.2rem;
  color: #800020;
  margin-bottom: 1rem;
}

.upload-main-text {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}

/* ================= CAMERA ================= */
.large-camera {
  padding: 2rem;
  border-radius: 18px;
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Center container */
.camera-center {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* Actual QR preview */
#qr-reader {
  width: 240px;              /* 👈 fixed square */
  height: 240px;             /* 👈 fixed square */
  border-radius: 18px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 12px 30px rgba(0,0,0,0.25);
}

/* Ensure internal video fits square */
#qr-reader video {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  border-radius: 18px;
}

/* Optional subtle scan-frame feel */
#qr-reader::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 18px;
  pointer-events: none;
}

/* ================= BUTTONS ================= */
.open-camera-btn {
  width: 100%;
  background: #800020;
  color: #FFD700;
  border: none;
  border-radius: 12px;
  font-weight: 800;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 18px;
}

.open-camera-btn:hover {
  background: #9e0027;
  transform: translateY(-2px);
}

.close-camera-btn {
  margin-top: 1.2rem;
  width: 100%;
  padding: 0.6rem;
  background: transparent;
  border: 1.6px solid #800020;
  color: #800020;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
}

/* ================= STATUS ================= */
.info {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #555;
}

.error {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #c62828;
}
/* ================= UPLOAD ALIGNMENT ================= */
.upload-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
}

.upload-icon {
  font-size: 3.4rem;
  color: #800020;
}

.upload-text {
  text-align: left;
}

.upload-main-text {
  font-size: 1.1rem;
  font-weight: 800;
  margin: 0;
}

.sub-text {
  font-size: 0.78rem;
  color: #777;
}


      `}</style>
    </>
  );
}

export default ScanQR;
