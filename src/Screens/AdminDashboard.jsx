import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Admin_Sidebar";
import { FaEye, FaUndo, FaFileUpload, FaBan, FaCog, FaClipboardList , FaCheck} from "react-icons/fa";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");

  const data = [
    { id: "001", name: "John Doe", status: "Active" },
    { id: "002", name: "Jane Smith", status: "Revoked" },
    { id: "003", name: "Michael Brown", status: "Pending" },
    { id: "004", name: "Alice Johnson", status: "Active" },
  ];

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="navbar-fixed">
        <Navbar />
      </div>

      <style>{`
  :root {
    --burgundy: #800020;
    --gold: #FFD700;
    --offwhite: #fffaf4;
    --light-burgundy: #9b1d30;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background: var(--offwhite);
    margin: 0;
  }

  .navbar-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: var(--burgundy);
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }

  .dashboard-container {
    display: flex;
    min-height: 100vh;
    padding-top: 65px;
    background: linear-gradient(145deg, #fff9f3, #f8f5f2);
  }

  .dashboard-main {
    flex: 1;
    margin-left: 16rem;
    padding: 2rem 2.5rem;
    transition: margin-left 0.3s ease;
  }

  @media (max-width: 992px) {
    .dashboard-main {
      margin-left: 4rem;
      padding: 1rem;
    }
  }

  .page-title {
    font-size: 2rem;
    font-weight: 800;
    color: var(--burgundy);
    margin-bottom: 0.8rem;
    border-bottom: 3px solid var(--gold);
    display: inline-block;
    padding-bottom: 0.3rem;
  }


  .tab-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--light-burgundy);
    margin: 1rem 0 1.5rem;
    border-left: 4px solid var(--gold);
    padding-left: 0.6rem;
  }

  .stat-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background-color: #fff;
    border-left: 6px solid var(--gold);
    border-radius: 14px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(128, 0, 32, 0.08);
    transition: all 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-4px);
  }

  .stat-title {
    color: var(--burgundy);
    font-weight: 600;
    margin-bottom: 0.4rem;
  }

  .stat-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: #333;
  }

  .search-bar {
    margin-bottom: 1.2rem;
    display: flex;
    justify-content: flex-end;
    
  }

  .search-bar input {
    padding: 0.6rem 1rem;
    border: 2px solid var(--gold);
    border-radius: 10px;
    outline: none;
    width: 260px;
    transition: 0.3s;
  }

  .search-bar input:focus {
    border-color: var(--burgundy);
    box-shadow: 0 0 6px rgba(128, 0, 32, 0.15);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }

  th, td {
    padding: 1rem;
    text-align: left;
  }

  thead {
    background-color: var(--burgundy);
    color: var(--gold);
  }

  tbody tr:nth-child(even) {
    background-color: #fdf8f3;
  }

  tbody tr:hover {
    background-color: #fff4e3;
  }

  .action-btn {
    background-color: var(--burgundy);
    color: white;
    border: none;
    padding: 0.45rem 0.8rem;
    border-radius: 8px;
    font-size: 0.85rem;
    margin-right: 6px;
    cursor: pointer;
    transition: 0.3s;
  }

  .action-btn:hover {
    background-color: var(--light-burgundy);
  }


  .document-card {
    background: white;
    border-left: 5px solid var(--gold);
    padding: 1rem 1.5rem;
    border-radius: 12px;
    margin-bottom: 1rem;
    box-shadow: 0 3px 8px rgba(128, 0, 32, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .document-card h4 {
    color: var(--burgundy);
    margin: 0;
  }

  .doc-status {
    background: var(--gold);
    color: var(--burgundy);
    font-weight: 600;
    padding: 0.4rem 1rem;
    border-radius: 10px;
  }

 
  .revocation-card {
    background: #fff6e9;
    border-left: 6px solid var(--burgundy);
    padding: 1rem 1.5rem;
    border-radius: 12px;
    margin-bottom: 1rem;
    box-shadow: 0 3px 8px rgba(128, 0, 32, 0.08);
  }

  .revocation-card h4 {
    color: var(--burgundy);
    margin-bottom: 0.5rem;
  }

  .revocation-btns button {
    margin-right: 10px;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    cursor: pointer;
    transition: 0.3s;
  }

  .approve {
    background: var(--gold);
    color: var(--burgundy);
  }

  .reject {
    background: var(--burgundy);
    color: white;
  }

  .settings-card {
    background: #fff;
    border: 2px solid var(--gold);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 10px rgba(128, 0, 32, 0.1);
    margin-bottom: 1rem;
  }

  .settings-card label {
    color: var(--burgundy);
    font-weight: 600;
    display: block;
    margin-bottom: 0.5rem;
  }

  .settings-card input {
    width: 95%;
    padding: 0.6rem;
    border-radius: 8px;
    border: 2px solid var(--gold);
    outline: none;
  }


  .log-entry {
    background: #fff;
    border-left: 4px solid var(--gold);
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 0.8rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .log-entry p {
    margin: 0.3rem 0;
  }

.sub-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--burgundy);
  margin: 1.5rem 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  letter-spacing: 0.5px;
  text-transform: capitalize;
  position: relative;
}

.sub-title::after {
  content: "";
  flex-grow: 1;
  height: 2px;
  background: linear-gradient(to right, var(--gold), transparent);
  margin-left: 10px;
  opacity: 0.8;
}


.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}


@media (max-width: 768px) {
 
  .page-title {
    font-size: 1.3rem;
    margin-bottom: 0.6rem;
  }

  .tab-title,
  .sub-title {
    font-size: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0.8rem;
    padding-left: 0.4rem;
  }

 
  .stat-cards {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stat-card {
    padding: 1rem;
    border-left-width: 4px;
    text-align: center;
  }

  .stat-title {
    font-size: 0.85rem;
  }

  .stat-value {
    font-size: 1.3rem;
  }


  .user-header {
    flex-direction: column;
    align-items: stretch;
    gap: 0.6rem;
    margin-bottom: 1rem;
  }

  .search-bar {
    width: 100%;
  }

  .search-bar input {
    width: 100%;
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
    border: 2px solid var(--gold);
    border-radius: 10px;
  }

  .search-bar input:focus {
    border-color: var(--burgundy);
    box-shadow: 0 0 8px rgba(128, 0, 32, 0.15);
  }


  .settings-card input {
    width: 90%;
    font-size: 0.9rem;
    padding: 0.8rem;
    border-radius: 10px;
    border: 2px solid var(--gold);
    margin-bottom: 0.8rem;
  }


  .action-btn,
  .revocation-btns button {
    width: 100%;
    margin-bottom: 0.6rem;
    padding: 0.7rem;
    font-size: 0.9rem;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
  }

  .revocation-btns {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    width: 100%;
  }

  table {
    font-size: 0.85rem;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  th, td {
    padding: 0.6rem;
  }

  .document-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 1rem;
  }

  .document-card h4 {
    font-size: 0.95rem;
  }

  .doc-status {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
  }

  .revocation-card {
    padding: 1rem;
  }

  .revocation-card h4 {
    font-size: 1rem;
    margin-bottom: 0.8rem;
  }


  .log-entry {
    padding: 0.8rem 1rem;
  }

  .log-entry p {
    font-size: 0.85rem;
  }


  .dashboard-main {
    margin-left: 4rem;
    padding: 1rem;
  }

  .dashboard-container {
    padding-top: 60px;
  }
}

`}</style>

      <div className="dashboard-container">
        <Sidebar role="admin" activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="dashboard-main">
          <h2 className="page-title">Admin Dashboard</h2>

          {activeTab === "users" && (
            <>
              <div className="stat-cards">
                <div className="stat-card">
                  <div className="stat-title">Total Users</div>
                  <div className="stat-value">120</div>
                </div>
                <div className="stat-card">
                  <div className="stat-title">Active Users</div>
                  <div className="stat-value">104</div>
                </div>
                <div className="stat-card">
                  <div className="stat-title">Revoked</div>
                  <div className="stat-value">16</div>
                </div>
              </div>
            <div className="user-header">
            <h3 className="sub-title">User Management</h3>
            <div className="search-bar">

                <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            </div>


              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.status}</td>
                      <td>
                        <button className="action-btn"><FaEye /> View</button>
                        <button className="action-btn" style={{ backgroundColor: "#b0303b" }}>
                          <FaUndo /> Revoke
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {activeTab === "documents" && (
            <>
              <h3 className="sub-title">Manage Documents</h3>
              <div className="document-card">
                <h4>Employee Contract - John Doe</h4>
                <span className="doc-status">Verified</span>
              </div>
              <div className="document-card">
                <h4>Project NDA - Alice Johnson</h4>
                <span className="doc-status">Pending</span>
              </div>
              <div className="document-card">
                <h4>Certificate - Jane Smith</h4>
                <span className="doc-status">Revoked</span>
              </div>
            </>
          )}

          {activeTab === "revocations" && (
            <>
              <h3 className="sub-title">Revocation Requests</h3>
              <div className="revocation-card">
                <h4>John Doe requested document revocation</h4>
                <div className="revocation-btns">
                  <button className="approve"><FaCheck /> Approve</button>
                  <button className="reject"><FaBan /> Reject</button>
                </div>
              </div>
              <div className="revocation-card">
                <h4>Michael Brown requested credential revocation</h4>
                <div className="revocation-btns">
                  <button className="approve"><FaCheck /> Approve</button>
                  <button className="reject"><FaBan /> Reject</button>
                </div>
              </div>
            </>
          )}

   
          {activeTab === "settings" && (
            <>
              <h3 className="sub-title">System Settings</h3>
              <div className="settings-card">
                <label>Admin Email</label>
                <input type="email" value="admin@system.com" readOnly />
              </div>
              <div className="settings-card">
                <label>Access Control</label>
                <input type="text" placeholder="Edit permission roles..." />
              </div>
            </>
          )}


          {activeTab === "logs" && (
            <>
              <h3 className="sub-title">Activity Logs</h3>
              <div className="log-entry">
                <p><strong>10:45 AM:</strong> User <b>John Doe</b> verified a document.</p>
              </div>
              <div className="log-entry">
                <p><strong>09:15 AM:</strong> Admin <b>Jane Smith</b> updated settings.</p>
              </div>
              <div className="log-entry">
                <p><strong>Yesterday:</strong> New user <b>Michael Brown</b> added.</p>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default AdminDashboard;
