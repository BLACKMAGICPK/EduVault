import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarOut";
import Sidebar from "../../components/Admin_Sidebar";
import { FaUsers, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import BASE_URL from "../../Configure";
import { useLocation, useNavigate } from "react-router-dom";

function ManageUsers() {
  

  const location = useLocation();

const ADMIN_ID =
  location.state?.userId || sessionStorage.getItem("userId");

console.log("🧩 Page received userId:", ADMIN_ID);

  const [admin, setAdmin] = useState({});
  const [students, setStudents] = useState([]);
  const [approvedCount, setApprovedCount] = useState(0);
  const [revokedCount, setRevokedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [search, setSearch] = useState("");


  /* ================= FETCH ADMIN ================= */
  useEffect(() => {
    fetch(`${BASE_URL}/profile-admin/${ADMIN_ID}`)
      .then(res => res.json())
      .then(data => setAdmin(data.data || {}));
  }, []);

  /* ================= FETCH ADMIN LOGS ================= */
  useEffect(() => {
    fetch(`${BASE_URL}/admin/logs/${ADMIN_ID}`)
      .then(res => res.json())
      .then(result => {
        const logs = result.data || [];
        setApprovedCount(logs.filter(l => l.action === "DOCUMENT_APPROVED").length);
        setRevokedCount(logs.filter(l => l.action === "DOCUMENT_REVOKED").length);
      });
  }, []);

  /* ================= FETCH PENDING DOCS ================= */
  useEffect(() => {
    fetch(`${BASE_URL}/documents/all`)
      .then(res => res.json())
      .then(result => {
        const docs = result.data || [];
        setPendingCount(docs.filter(d => d.status === "Pending").length);
      });
  }, []);

  /* ================= FETCH STUDENTS ================= */
  useEffect(() => {
    fetch(`${BASE_URL}/admin/students`)
      .then(res => res.json())
      .then(result => setStudents(result.data || []));
  }, []);


  const filteredStudents = students.filter((student) =>
  `${student.name} ${student.rollNumber} ${student.email} ${student.institutionName}`
    .toLowerCase()
    .includes(search.toLowerCase())
);

  return (
    <>
      <div className="navbar-fixed"><Navbar /></div>

      <div className="page-container">
        <Sidebar role="admin" isProfileComplete={true} />

        <main className="page-main">
          {/* WELCOME */}
          <h2 className="page-title">Welcome {admin.name}</h2>
          <p className="welcome-text">
            Manage users and monitor document verification activity.
          </p>

          {/* STATS */}
          <div className="stats-grid">
            <div className="stat-card success">
              <FaCheckCircle />
              <h4>{approvedCount}</h4>
              <span>Approved Documents</span>
            </div>

            <div className="stat-card revoked">
              <FaTimesCircle />
              <h4>{revokedCount}</h4>
              <span>Revoked Documents</span>
            </div>

            <div className="stat-card pending">
              <FaClock />
              <h4>{pendingCount}</h4>
              <span>Pending Requests</span>
            </div>
          </div>

          {/* STUDENTS LIST */}
          <div className="section">
            <div className="section-header">
                <h3 className="section-title">
                    <FaUsers /> All Students
                </h3>

                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by name, roll no, email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                </div>


           {filteredStudents.length === 0 ? (

              <p className="empty-text">No students found</p>
            ) : (
              filteredStudents.map(student => (

                <div className="user-card" key={student.userId}>
                  <div className="user-main">
                    <strong>{student.name}</strong>
                    <span>{student.rollNumber}</span>
                  </div>

                  <div className="user-meta">
                    <span><b>Email:</b> {student.email}</span>
                    <span><b>Institution:</b> {student.institutionName}</span>
                    <span><b>Department:</b> {student.department}</span>
                    <span><b>Degree:</b> {student.degree}</span>
                    <span><b>Documents:</b> {student.documentCount || 0}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      <style>{`
/* ================= ROOT THEME ================= */
:root {
  --burgundy: #800020;
  --gold: #FFD700;
  --offwhite: #fff9f3;
  --success: #2e7d32;
  --danger: #c62828;
  --warning: #ff8f00;
  --border-soft: rgba(0,0,0,0.08);
}

/* ================= GLOBAL ================= */
body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background: var(--offwhite);
}

/* ================= NAVBAR ================= */
.navbar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;
  z-index: 1000;
}

/* ================= LAYOUT ================= */
.page-container {
  display: flex;
  padding-top: 65px;
  min-height: 100vh;
}

.page-main {
  margin-left: 16rem;
  flex: 1;
  padding: 2rem 2.5rem;
}

@media (max-width: 992px) {
  .page-main {
    margin-left: 4rem;
    padding: 1.2rem;
  }
}

/* ================= TITLE ================= */
.page-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--burgundy);
  position: relative;
  display: inline-block;
  padding-bottom: 0.4rem;
}

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
    rgba(255,215,0,0.4)
  );
  border-radius: 999px;
}

.welcome-text {
  font-size: 0.95rem;
  color: #555;
  margin: 0.7rem 0 2.2rem;
}

/* ================= STATS ================= */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1.6rem;
  margin-bottom: 2.8rem;
}

.stat-card {
  background: #fff;
  padding: 1.7rem 1.5rem;
  border-radius: 18px;
  box-shadow: 0 8px 22px rgba(0,0,0,0.08);
  text-align: center;
  border-left: 6px solid var(--gold);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.12);
}

.stat-card svg {
  font-size: 2.3rem;
  margin-bottom: 0.4rem;
}

.stat-card h4 {
  font-size: 2rem;
  font-weight: 800;
  margin: 0.3rem 0;
  color: #222;
}

.stat-card span {
  font-size: 0.8rem;
  color: #666;
  font-weight: 600;
}

.stat-card.success {
  border-left-color: var(--success);
}

.stat-card.success svg {
  color: var(--success);
}

.stat-card.revoked {
  border-left-color: var(--danger);
}

.stat-card.revoked svg {
  color: var(--danger);
}

.stat-card.pending {
  border-left-color: var(--warning);
}

.stat-card.pending svg {
  color: var(--warning);
}

/* ================= SECTION ================= */
.section {
  background: #fff;
  border-radius: 20px;
  padding: 1.8rem;
  box-shadow: 0 8px 22px rgba(0,0,0,0.08);
}

.section-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--burgundy);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.6rem;
}

/* ================= SEARCH ================= */
.search-bar {
  margin-bottom: 1.8rem;
  display: flex;
  justify-content: flex-end;
}

.search-input {
  width: 280px;
  padding: 0.55rem 1rem;
  border-radius: 999px;
  border: 1.5px solid var(--gold);
  font-size: 0.75rem;
  font-family: 'Poppins', sans-serif;
  outline: none;
  transition: all 0.25s ease;
}

.search-input:focus {
  border-color: var(--burgundy);
  box-shadow: 0 0 0 3px rgba(128,0,32,0.12);
}

/* ================= STUDENT LIST ================= */
.user-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.3rem 1.5rem;
  margin-bottom: 1.3rem;
  border-left: 6px solid var(--gold);
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(0,0,0,0.12);
}

/* HEADER */
.user-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.user-main strong {
  font-size: 1.05rem;
  font-weight: 700;
  color: #222;
}

.user-main span {
  font-size: 0.78rem;
  color: #666;
  font-weight: 600;
}

/* META GRID */
.user-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.65rem 1.6rem;
  font-size: 0.78rem;
  color: #444;
}

.user-meta span {
  line-height: 1.5;
}

.user-meta span b {
  color: #000;
  font-weight: 600;
}

/* ================= EMPTY ================= */
.empty-text {
  font-size: 0.85rem;
  color: #777;
  padding: 0.6rem 0;
}

/* ================= RESPONSIVE ================= */
@media (max-width: 768px) {
  .user-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }

  .search-bar {
    justify-content: flex-start;
  }

  .search-input {
    width: 100%;
  }
}

/* ================= SECTION HEADER ROW ================= */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;
  gap: 1rem;
}

/* ================= SEARCH INPUT (ADMIN USERS) ================= */
.search-input {
  width: 280px;
  padding: 0.55rem 1rem;
  border-radius: 999px;
  border: 1.5px solid var(--gold);
  font-size: 0.75rem;
  font-family: 'Poppins', sans-serif;
  outline: none;
  transition: all 0.25s ease;
}

.search-input:focus {
  border-color: var(--burgundy);
  box-shadow: 0 0 0 3px rgba(128,0,32,0.12);
}

/* ================= USER CARD REFINEMENT ================= */
.user-card {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

/* Stronger name + roll alignment */
.user-main {
  border-bottom: 1px dashed rgba(0,0,0,0.12);
  padding-bottom: 0.6rem;
}

/* ================= MOBILE ================= */
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-input {
    width: 100%;
  }
}

`}</style>

    </>
  );
}

export default ManageUsers;
