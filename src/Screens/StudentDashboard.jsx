import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Student_Sidebar";
import { FaSearch, FaQrcode, FaFileAlt, FaPlus } from "react-icons/fa";

function StudentDashboard() {
  const documents = [
    { id: 1, title: "B.Sc. Degree Certificate", issuer: "University of X", date: "May 2023" },
    { id: 2, title: "Higher Secondary Transcript", issuer: "Board of Education", date: "April 2020" },
    { id: 3, title: "Identity Proof", issuer: "Government of India", date: "March 2019" },
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
    height: 100vh;
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
    font-size: 2.2rem;
    font-weight: 800;
    color: var(--burgundy);
    margin-bottom: 1.5rem;
    border-bottom: 3px solid var(--gold);
    display: inline-block;
    padding-bottom: 0.3rem;
  }

  
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.8rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .dashboard-header h1 {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--burgundy);
    margin: 0;
  }

  .dashboard-header p {
    color: #555;
    font-size: 1rem;
    margin-top: 0.3rem;
  }

  .upload-btn {
    background-color: var(--gold);
    color: var(--burgundy);
    border: none;
    border-radius: 8px;
    padding: 0.6rem 1.2rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  }

  .upload-btn:hover {
    background-color: #f5cf26;
    transform: scale(1.05);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.2rem;
    margin-bottom: 2.5rem;
  }

  .stat-card {
    background-color: #fff;
    border-top: 4px solid var(--gold);
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    padding: 1rem 1.2rem;
    transition: all 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .stat-card h2 {
    font-size: 0.95rem;
    color: var(--burgundy);
    margin-bottom: 0.5rem;
  }

  .stat-card p {
    font-size: 1.6rem;
    color: var(--gold);
    font-weight: 700;
  }

  .documents-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .documents-header h2 {
    color: var(--burgundy);
    font-size: 1.4rem;
    font-weight: 600;
  }

  .search-box {
    display: flex;
    align-items: center;
    background-color: #fff;
    border: 2px solid var(--gold);
    border-radius: 8px;
    padding: 0.4rem 0.8rem;
    width: 260px;
  }

  .search-box input {
    border: none;
    outline: none;
    font-size: 0.95rem;
    width: 100%;
  }

  .search-box svg {
    color: var(--burgundy);
    margin-right: 8px;
  }

  .documents-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .document-card {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 1.5rem;
    border-left: 5px solid var(--gold);
    transition: transform 0.3s ease;
  }

  .document-card:hover {
    transform: translateY(-3px);
  }

  .doc-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.6rem;
  }

  .doc-header svg {
    color: var(--gold);
    font-size: 1.2rem;
  }

  .doc-title {
    font-weight: 600;
    color: var(--burgundy);
    margin-bottom: 0.2rem;
  }

  .doc-issuer {
    color: #555;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
  }

  .doc-date {
    font-size: 0.85rem;
    color: #777;
  }

  .doc-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .view-btn {
    background-color: var(--burgundy);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 1.2rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .verify-btn {
    background-color: var(--gold);
    color: var(--burgundy);
    border: none;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
  }

  .verify-btn svg {
    margin-right: 5px;
  }

  .view-btn:hover {
    opacity: 0.9;
  }

  .verify-btn:hover {
    background-color: #f2c400;
  }

  @media (max-width: 768px) {
    .page-title {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .dashboard-header h1 {
      font-size: 1.2rem;
    }

    .dashboard-header p {
      font-size: 0.85rem;
    }

    .upload-btn {
      padding: 0.45rem 0.9rem;
      font-size: 0.85rem;
    }

    .stat-card h2 {
      font-size: 0.85rem;
    }

    .stat-card p {
      font-size: 1.2rem;
    }

    .documents-header h2 {
      font-size: 1.1rem;
    }

    .search-box {
      width: 100%;
      padding: 0.3rem 0.6rem;
    }

    .doc-title {
      font-size: 0.95rem;
    }

    .doc-issuer, .doc-date {
      font-size: 0.8rem;
    }

    .view-btn, .verify-btn {
      font-size: 0.8rem;
      padding: 0.4rem 0.8rem;
    }

    .documents-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
`}</style>


      <div className="dashboard-container">
 
        <Sidebar role="student" />

   
        <main className="dashboard-main">
          <h2 className="page-title">Student Dashboard</h2>

          <div className="dashboard-header">
            <div>
              <h1>Hello, Vamitha</h1>
              <p>Welcome back! Manage your academic documents and verification details securely.</p>
            </div>
            <button className="upload-btn">
              <FaPlus /> Upload
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h2>Documents Uploaded</h2>
              <p>5</p>
            </div>
            <div className="stat-card">
              <h2>Verified Credentials</h2>
              <p>3</p>
            </div>
            <div className="stat-card">
              <h2>Pending Requests</h2>
              <p>0</p>
            </div>
          </div>

          <div className="documents-header">
            <h2>My Documents</h2>
            <div className="search-box">
              <FaSearch />
              <input type="text" placeholder="Search documents..." />
            </div>
          </div>

          <div className="documents-grid">
            {documents.map((doc) => (
              <div className="document-card" key={doc.id}>
                <div className="doc-header">
                  <FaFileAlt />
                  <div>
                    <div className="doc-title">{doc.title}</div>
                    <div className="doc-issuer">{doc.issuer}</div>
                    <div className="doc-date">Issued: {doc.date}</div>
                  </div>
                </div>

                <div className="doc-actions">
                  <button className="view-btn">View</button>
                  <button className="verify-btn">
                    <FaQrcode /> Verify
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default StudentDashboard;
