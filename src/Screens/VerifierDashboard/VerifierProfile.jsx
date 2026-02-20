import React, { useState, useEffect } from "react";
import Navbar from "../../components/NavbarOut";
import Sidebar from "../../components/Verifier_Sidebar";
import { FaUserCircle, FaEdit, FaSave } from "react-icons/fa";
import BASE_URL from "../../Configure";
import { useLocation, useNavigate } from "react-router-dom";

function VerifierProfile() {

const location = useLocation();

const USER_ID =
  location.state?.userId || sessionStorage.getItem("userId");
  console.log("🧩 Page received userId:", USER_ID);

  // 🔹 Verifier State
  const [verifier, setVerifier] = useState({
    userId: "",
    name: "",
    email: "",
    role: "",
    accountStatus: "",

    // 🔹 Personal Info
    dateOfBirth: "",
    gender: "",
    nationality: "",

    // 🔹 Organization Info
    designation: "",
    organizationName: "",
    organizationType: "",
    industryDomain: "",

    // 🔹 Contact Info
    officialEmail: "",
    mobileNumber: "",
    officeAddress: "",

    profileImage: null,
  });

  const isProfileComplete = Boolean(
  verifier.name &&
  verifier.designation &&
  verifier.organizationName &&
  verifier.officialEmail &&
  verifier.mobileNumber &&
  verifier.officeAddress &&
    verifier.dateOfBirth &&
    verifier.gender &&
    verifier.nationality
);


  // 🔹 Edit States
  const [isPersonalEdit, setIsPersonalEdit] = useState(false);
  const [isProfessionalEdit, setIsProfessionalEdit] = useState(false);
  const [isContactEdit, setIsContactEdit] = useState(false);

  // ======================================================
  // 🔹 FETCH PROFILE
  // ======================================================
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${BASE_URL}/profile-verifier/${USER_ID}`);
        const result = await res.json();
        if (res.ok) setVerifier(result.data);
      } catch (err) {
        console.error("Profile Fetch Error:", err);
      }
    }
    fetchProfile();
  }, []);

  // ======================================================
  // 🔹 HANDLE INPUT CHANGE
  // ======================================================
  const handleChange = (e) => {
    setVerifier({ ...verifier, [e.target.name]: e.target.value });
  };

  // ======================================================
  // 🔹 UPDATE PROFILE
  // ======================================================
  const updateProfile = async () => {
    try {
      await fetch(`${BASE_URL}/update-profile-verifier`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(verifier),
      });
    } catch (err) {
      console.error("Profile Update Error:", err);
    }
  };

  // ======================================================
  // 🔹 IMAGE UPLOAD (CLOUDINARY)
  // ======================================================
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Verifier_Profile");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dffwyk3ik/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        const updatedVerifier = {
          ...verifier,
          profileImage: data.secure_url,
        };

        setVerifier(updatedVerifier);

        await fetch(`${BASE_URL}/update-profile-verifier`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedVerifier),
        });
      }
    } catch (err) {
      console.error("Image Upload Error:", err);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files[0]) handleImageUpload(e.target.files[0]);
  };

  const displayValue = (value) => value || "—";

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
          width: 100%;
          z-index: 1000;
        }

        .profile-container {
          display: flex;
          
          padding-top: 65px;
        }

        .profile-main {
          margin-left: 16rem;
          flex: 1;
          padding: 2rem 2.5rem;
      
        }

        @media (max-width: 992px) {
          .profile-main {
            margin-left: 4rem;
            padding: 1.2rem;
          }
        }

        .page-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--burgundy);
          border-bottom: 3px solid var(--gold);
          display: inline-block;
          margin-bottom: 2rem;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: #fff;
          padding: 1.5rem;
          border-radius: 14px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          margin-bottom: 2rem;
        }

        .avatar {
          font-size: 4.5rem;
          color: #debd00ff;
        }

        .profile-header h2 {
          margin: 0;
          color: var(--burgundy);
        }

        .profile-meta {
          font-size: 0.9rem;
          color: #555;
        }

        .status {
          display: inline-block;
          margin-top: 0.4rem;
          padding: 0.2rem 0.7rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          background: #e7f8ee;
          color: #2e7d32;
        }

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

        .section h3 {
          color: var(--burgundy);
          margin: 0;
        }

        .edit-btn {
          background: var(--gold);
          border: none;
          border-radius: 6px;
          padding: 0.3rem 0.7rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 600;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }

        .info-item label {
          font-size: 0.8rem;
          color: #777;
        }

        .info-item p {
          margin: 0.2rem 0 0;
          font-weight: 600;
          color: #333;
        }
          .info-item input,
            .info-item select {
            width: 90%;
            padding: 0.35rem 0.45rem;
            border-radius: 6px;
            border: 1.5px solid var(--gold);
            font-size: 0.85rem;
            font-family: 'Poppins', sans-serif;
            }

      `}</style>

       <div className="profile-container">
        <Sidebar role="verifier" userId={USER_ID} isProfileComplete={isProfileComplete} />

        <main className="profile-main">
          <h2 className="page-title">My Profile</h2>

          {/* 🔹 Header */}
          <div className="profile-header">
            <div style={{ position: "relative" }}>
              {verifier.profileImage ? (
                <img
                  src={verifier.profileImage}
                  alt="Profile"
                  style={{ borderRadius: "50%", width: "72px", height: "72px" }}
                />
              ) : (
                <>
                  <FaUserCircle className="avatar" />
                  <label
                    htmlFor="profileImageUpload"
                    style={{
                      position: "absolute",
                      bottom: "5px",
                      right: "5px",
                      background: "var(--gold)",
                      borderRadius: "50%",
                      width: "25px",
                      height: "25px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </label>
                </>
              )}

              <input
                type="file"
                id="profileImageUpload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
            </div>

            <div>
              <h2>{verifier.name}</h2>
              <div className="profile-meta">
                EduVault ID: {verifier.userId} | Role: {verifier.role}
              </div>
              <span className="status">{verifier.accountStatus}</span>
            </div>
          </div>

          {/* 🔹 Personal Info */}
          <div className="section">
            <div className="section-header">
              <h3>Personal Information</h3>
              <button className="edit-btn" onClick={async () => {
                setIsPersonalEdit(!isPersonalEdit);
                if (isPersonalEdit) await updateProfile();
              }}>
                {isPersonalEdit ? <FaSave /> : <FaEdit />}
                {isPersonalEdit ? " Save" : " Edit"}
              </button>
            </div>

            <div className="info-grid">
              <div className="info-item">
                    <label>Full Name</label>
                    {isPersonalEdit ? (
                        <input name="name" value={verifier.name} onChange={handleChange} />
                    ) : (
                        <p>{displayValue(verifier.name)}</p>
                    )}
                    </div>

                    <div className="info-item">
                    <label>Date of Birth</label>
                    {isPersonalEdit ? (
                        <input
                        type="date"
                        name="dateOfBirth"
                        value={verifier.dateOfBirth}
                        onChange={handleChange}
                        />
                    ) : (
                        <p>{displayValue(verifier.dateOfBirth)}</p>
                    )}
                    </div>

                    <div className="info-item">
                    <label>Gender</label>
                    {isPersonalEdit ? (
                        <select name="gender" value={verifier.gender} onChange={handleChange}>
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                        </select>
                    ) : (
                        <p>{displayValue(verifier.gender)}</p>
                    )}
                    </div>

                    <div className="info-item">
                    <label>Nationality</label>
                    {isPersonalEdit ? (
                        <input
                        name="nationality"
                        value={verifier.nationality}
                        onChange={handleChange}
                        />
                    ) : (
                        <p>{displayValue(verifier.nationality)}</p>
                    )}
                    </div>

            </div>
          </div>

          {/* 🔹 Organization Info */}
          <div className="section">
            <div className="section-header">
              <h3>Organization Information</h3>
              <button className="edit-btn" onClick={async () => {
                setIsProfessionalEdit(!isProfessionalEdit);
                if (isProfessionalEdit) await updateProfile();
              }}>
                {isProfessionalEdit ? <FaSave /> : <FaEdit />}
                {isProfessionalEdit ? " Save" : " Edit"}
              </button>
            </div>

            <div className="info-grid">
              {["designation","organizationName","organizationType","industryDomain"].map(f => (
                <div className="info-item" key={f}>
                  <label>{f.replace(/([A-Z])/g, " $1")}</label>
                  {isProfessionalEdit ? (
                    <input name={f} value={verifier[f] || ""} onChange={handleChange} />
                  ) : (
                    <p>{displayValue(verifier[f])}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 🔹 Contact Info */}
          <div className="section">
            <div className="section-header">
              <h3>Contact Information</h3>
              <button className="edit-btn" onClick={async () => {
                setIsContactEdit(!isContactEdit);
                if (isContactEdit) await updateProfile();
              }}>
                {isContactEdit ? <FaSave /> : <FaEdit />}
                {isContactEdit ? " Save" : " Edit"}
              </button>
            </div>

            <div className="info-grid">
              {["officialEmail","mobileNumber","officeAddress"].map(f => (
                <div className="info-item" key={f}>
                  <label>{f.replace(/([A-Z])/g, " $1")}</label>
                  {isContactEdit ? (
                    <input name={f} value={verifier[f] || ""} onChange={handleChange} />
                  ) : (
                    <p>{displayValue(verifier[f])}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </>
  );
}

export default VerifierProfile;