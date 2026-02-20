import React, { useState, useEffect } from "react";
import Navbar from "../../components/NavbarOut";
import Sidebar from "../../components/Student_Sidebar";
import { FaUserCircle, FaEdit, FaSave } from "react-icons/fa";
import BASE_URL from "../../Configure";
import { useLocation, useNavigate } from "react-router-dom";

function StudentProfile() {

const location = useLocation();
const navigate = useNavigate();

const USER_ID = sessionStorage.getItem("userId");

console.log("🆔 Student User ID from Auth:", USER_ID);


  // 🔹 Student state
  const [student, setStudent] = useState({
    userId: "",
    name: "",
    email: "",
    role: "",
    accountStatus: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    rollNumber: "",
    institutionName: "",
    degree: "",
    department: "",
    yearOfAdmission: "",
    yearOfGraduation: "",
    mobileNumber: "",
    address: "",
    profileImage: null,
   
  });

  // 🔹 PROFILE COMPLETION CHECK
const isProfileComplete = Boolean(
  student.name &&
  student.dateOfBirth &&
  student.gender &&
  student.nationality &&
  student.rollNumber &&
  student.institutionName &&
  student.degree &&
  student.department &&
  student.yearOfAdmission &&
  student.yearOfGraduation &&
  student.mobileNumber &&
  student.address
);


  // 🔹 Edit states
  const [isPersonalEdit, setIsPersonalEdit] = useState(false);
  const [isContactEdit, setIsContactEdit] = useState(false);
  const [isAcademicEdit, setIsAcademicEdit] = useState(false);

  // ======================================================
  // 🔹 FETCH PROFILE DATA (GET)
  // ======================================================
useEffect(() => {
  if (!USER_ID) return;

  async function fetchProfile() {
    try {
      const res = await fetch(`${BASE_URL}/profile-student/${USER_ID}`);
      const result = await res.json();

      console.log("📥 Profile API Response:", result);

      if (res.ok) {
        setStudent(result.data);
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error("Profile Fetch Error:", err);
    }
  }

  fetchProfile();
}, [USER_ID]);


  // ======================================================
  // 🔹 HANDLE INPUT CHANGE
  // ======================================================
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // ======================================================
  // 🔹 UPDATE PROFILE (POST)
  // ======================================================
  const updateProfile = async () => {
    try {
      const res = await fetch(`${BASE_URL}/update-profile-student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Update failed");
      }
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
  formData.append("upload_preset", "Student_Profile");

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
      const updatedStudent = {
        ...student,
        profileImage: data.secure_url,
      };

      setStudent(updatedStudent);

      // Save image URL to DB
      await fetch(`${BASE_URL}/update-profile-student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStudent),
      });
    }
  } catch (err) {
    console.error("Image Upload Error:", err);
  }
};

  // ======================================================
  // 🔹 SAVE HANDLERS (SECTION-WISE)
  // ======================================================
  const savePersonal = async () => {
    setIsPersonalEdit(false);
    await updateProfile();
  };

  const saveAcademic = async () => {
    setIsAcademicEdit(false);
    await updateProfile();
  };

  const saveContact = async () => {
    setIsContactEdit(false);
    await updateProfile();
  };
  
    const handleFileSelect = (e) => {
    if (e.target.files[0]) {
        handleImageUpload(e.target.files[0]);
    }
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
       <Sidebar
  role="student"
  userId={USER_ID}
  isProfileComplete={true}
/>



        <main className="profile-main">
          <h2 className="page-title">My Profile</h2>

          {/* 🔹 Profile Header */}
          <div className="profile-header">
            <div style={{ position: "relative" }}>
            {student.profileImage ? (
                <img
                src={student.profileImage}
                alt="Profile"
                className="avatar"
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
                    right: "5px ",
                    background: "var(--gold)",
                    color: "#000",
                    borderRadius: "50%",
                    width: "25px",
                    height: "25px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontWeight: "bold",
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
              <h2>{student.name}</h2>
              <div className="profile-meta">
                EduVault ID: {student.userId} | Role: {student.role}
              </div>
              <span className="status">{student.accountStatus}</span>
            </div>
          </div>

          {/* 🔹 Personal Information */}
          <div className="section">
            <div className="section-header">
              <h3>Personal Information</h3>
              <button
                className="edit-btn"
                onClick={isPersonalEdit ? savePersonal : () => setIsPersonalEdit(true)}
              >
                {isPersonalEdit ? <FaSave /> : <FaEdit />}
                {isPersonalEdit ? " Save" : " Edit"}
              </button>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <label>Full Name</label>
                {isPersonalEdit ? (
                  <input name="name" value={student.name} onChange={handleChange} />
                ) : (
                  <p>{displayValue(student.name)}</p>
                )}
              </div>

              <div className="info-item">
                <label>Date of Birth</label>
                {isPersonalEdit ? (
                  <input type="date" name="dateOfBirth" value={student.dateOfBirth} onChange={handleChange} />
                ) : (
                  <p>{displayValue(student.dateOfBirth)}</p>
                )}
              </div>

              <div className="info-item">
                <label>Gender</label>
                {isPersonalEdit ? (
                  <select name="gender" value={student.gender} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                ) : (
                  <p>{displayValue(student.gender)}</p>
                )}
              </div>

              <div className="info-item">
                <label>Nationality</label>
                {isPersonalEdit ? (
                  <input name="nationality" value={student.nationality} onChange={handleChange} />
                ) : (
                  <p>{displayValue(student.nationality)}</p>
                )}
              </div>
            </div>
          </div>

          {/* 🔹 Academic Information */}
          <div className="section">
            <div className="section-header">
              <h3>Academic Information</h3>
              <button
                className="edit-btn"
                onClick={isAcademicEdit ? saveAcademic : () => setIsAcademicEdit(true)}
              >
                {isAcademicEdit ? <FaSave /> : <FaEdit />}
                {isAcademicEdit ? " Save" : " Edit"}
              </button>
            </div>

            <div className="info-grid">
              {["rollNumber","institutionName","degree","department","yearOfAdmission","yearOfGraduation"]
                .map((field) => (
                  <div className="info-item" key={field}>
                    <label>{field.replace(/([A-Z])/g, " $1")}</label>
                    {isAcademicEdit ? (
                      <input name={field} value={student[field] || ""} onChange={handleChange} />
                    ) : (
                      <p>{displayValue(student[field])}</p>
                    )}
                  </div>
              ))}
            </div>
          </div>

          {/* 🔹 Contact Information */}
          <div className="section">
            <div className="section-header">
              <h3>Contact Information</h3>
              <button
                className="edit-btn"
                onClick={isContactEdit ? saveContact : () => setIsContactEdit(true)}
              >
                {isContactEdit ? <FaSave /> : <FaEdit />}
                {isContactEdit ? " Save" : " Edit"}
              </button>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <label>Email</label>
                {isContactEdit ? (
                  <input name="email" value={student.email} onChange={handleChange} />
                ) : (
                  <p>{displayValue(student.email)}</p>
                )}
              </div>

              <div className="info-item">
                <label>Mobile Number</label>
                {isContactEdit ? (
                  <input name="mobileNumber" value={student.mobileNumber} onChange={handleChange} />
                ) : (
                  <p>{displayValue(student.mobileNumber)}</p>
                )}
              </div>

              <div className="info-item">
                <label>Address</label>
                {isContactEdit ? (
                  <input name="address" value={student.address} onChange={handleChange} />
                ) : (
                  <p>{displayValue(student.address)}</p>
                )}
              </div>
            </div>
          </div>

        </main>
      </div>
    </>
  );
}

export default StudentProfile;
