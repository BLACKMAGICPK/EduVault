import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarOut";
import Sidebar from "../../components/Admin_Sidebar";
import { FaHistory, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import BASE_URL from "../../Configure";
import { useLocation, useNavigate } from "react-router-dom";

function AdminActivityLogs() {
 const location = useLocation();

const USER_ID =
  location.state?.userId || sessionStorage.getItem("userId");

console.log("🧩 Page received userId:", USER_ID);

  const [logs, setLogs] = useState([]);

  /* ================= FETCH ADMIN LOGS ================= */
  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await fetch(
          `${BASE_URL}/admin/logs/${USER_ID}`
        );
        const result = await res.json();

        if (res.ok) {
          const sorted = [...(result.data || [])].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setLogs(sorted);
        } else {
          console.error(result.message);
        }
      } catch (err) {
        console.error("Admin Log Fetch Error:", err);
      }
    }

    fetchLogs();
  }, []);

  return (
    <>
      {/* ================= FIXED NAVBAR ================= */}
      <div className="navbar-fixed">
        <Navbar />
      </div>

      {/* ================= PAGE LAYOUT ================= */}
      <div className="page-container">
        <Sidebar role="admin" isProfileComplete={true} />

        <main className="page-main">
          {/* ================= PAGE TITLE ================= */}
          <h2 className="page-title">Admin Activity Logs</h2>

          {/* ================= LOG LIST ================= */}
          <div className="section">
            <div className="section-header">
              <h3>
                <FaHistory style={{ marginRight: "6px" }} />
                Your Actions
              </h3>
            </div>

            {logs.length === 0 ? (
              <p className="empty-text">
                No activity logs available
              </p>
            ) : (
              <div className="history-list">
                {logs.map((item, index) => (
                  <div className="history-card" key={index}>
                    {/* STATUS BADGE */}
                    <span
                      className={`status-badge ${item.status?.toLowerCase()}`}
                    >
                      {item.status}
                    </span>

                    {/* ICON */}
                    <div className="history-icon">
                      {item.status === "Verified" ? (
                        <FaCheckCircle />
                      ) : (
                        <FaTimesCircle />
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="history-content">
                      <h4>{item.action.replace(/_/g, " ")}</h4>

                      <p className="history-message">
                        {item.message}
                      </p>

                      <p className="history-student">
                        Student ID: <strong>{item.studentUserId}</strong>
                      </p>

                      <span className="history-date">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ================= STYLES ================= */}
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
          height: 65px;
          z-index: 1000;
        }

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

        .page-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--burgundy);
          border-bottom: 3px solid var(--gold);
          display: inline-block;
          margin-bottom: 2rem;
        }

        .section {
          background: #fff;
          border-radius: 14px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .section-header h3 {
          margin: 0;
          font-weight: 700;
          color: var(--burgundy);
        }

        .empty-text {
          font-size: 0.85rem;
          color: #777;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
          margin-top: 1.5rem;
        }

        .history-card {
          background: #fff;
          border-radius: 14px;
          padding: 1.2rem 1.4rem;
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
          border-left: 6px solid var(--gold);
          position: relative;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .status-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 0.3rem 0.7rem;
          border-radius: 999px;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .status-badge.verified {
          background: rgba(46,125,50,0.15);
          color: #2e7d32;
        }

        .status-badge.revoked {
          background: rgba(198,40,40,0.15);
          color: #c62828;
        }

        .history-icon {
          font-size: 1.8rem;
          color: var(--burgundy);
          margin-top: 0.2rem;
        }

        .history-content h4 {
          margin: 0;
          font-size: 0.9rem;
          font-weight: 700;
          color: #333;
        }

        .history-message {
          font-size: 0.78rem;
          color: #555;
          margin: 0.3rem 0;
        }

        .history-student {
          font-size: 0.75rem;
          color: #444;
        }

        .history-date {
          font-size: 0.7rem;
          color: #888;
        }
      `}</style>
    </>
  );
}

export default AdminActivityLogs;
