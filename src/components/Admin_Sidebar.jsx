import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChevronRight,
  FaChevronLeft,
  FaListAlt,
  FaCog,
  FaBan,
  FaFileAlt,
  FaUsers,
  FaUser,
} from "react-icons/fa";

function Sidebar({ role = "admin" , isProfileComplete}) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [showLockPopup, setShowLockPopup] = useState(false);


  const menuItems = {
    admin: [
      { name: "Manage Users", path: "/admin-dashboard/users", icon: <FaUsers /> },
      { name: "Manage Documents", path: "/admin-dashboard/documents", icon: <FaFileAlt /> },
      { name: "Revocation Requests", path: "/admin-dashboard/revocation-requests", icon: <FaBan /> },
      { name: "Activity Logs", path: "/admin-dashboard/logs", icon: <FaListAlt /> },
      { name: "Profile", path: "/admin-dashboard/profile", icon: <FaUser /> },
    ],
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        :root {
          --burgundy: #800020;
          --gold: #FFD700;
          --gold-light: rgba(255, 215, 0, 0.15);
        }

       .sidebar {
          width: 16rem;
          height: calc(100vh - 65px);
          background-color: var(--burgundy);
          color: var(--gold);
          position: fixed;
          top: 70px;
          left: 0;
          display: flex;
          flex-direction: column;
          box-shadow: 4px 0 15px rgba(0, 0, 0, 0.15);
          border-right: 2px solid rgba(255, 215, 0, 0.4);
          transition: all 0.3s ease-in-out;
          z-index: 90;
        }

        .sidebar-nav {
          padding: 1rem;
          margin-top: 1rem;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.9rem 1rem;
          color: var(--gold);
          border-radius: 12px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          margin-bottom: 0.75rem;
        }

        .sidebar-link:hover {
          background-color: var(--gold-light);
          border-left: 3px solid var(--gold);
          padding-left: 1.3rem;
        }

        .sidebar-link.active {
          background-color: var(--gold);
          color: var(--burgundy);
          font-weight: 600;
          border-left: 3px solid var(--gold);
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
        }

        .sidebar-icon {
          font-size: 1.2rem;
        }

        @media (max-width: 992px) {
          .sidebar {
            width: 4rem;
            overflow: hidden;
          }

          .sidebar.expanded {
            width: 16rem;
          }

          .sidebar:not(.expanded) .sidebar-link span:last-child {
            display: none;
          }

          .sidebar-toggle {
            background-color: var(--burgundy);
            color: var(--gold);
            border: 2px solid var(--gold);
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin: 1rem;
          }
        }

        @media (min-width: 993px) {
          .sidebar-toggle {
            display: none;
          }
        }
      `}</style>

      <aside className={`sidebar ${isOpen ? "expanded" : ""}`}>
        <div className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </div>

        <nav className="sidebar-nav">
        {(menuItems[role] || []).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${isActive(item.path) ? "active" : ""}`}
            onClick={(e) => {
              if (!isProfileComplete && item.path !== "/admin-dashboard/profile") {
                e.preventDefault();
                setShowLockPopup(true);
              } else {
                setIsOpen(false);
              }
            }}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      </aside>
      {showLockPopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "1.8rem 2rem",
              borderRadius: "14px",
              textAlign: "center",
              maxWidth: "320px",
            }}
          >
            <div style={{ fontSize: "2.5rem" }}>🔒</div>
            <h3 style={{ color: "#800020" }}>Profile Incomplete</h3>
            <p>Please complete your admin profile to continue.</p>
            <button
              style={{
                background: "#FFD700",
                border: "none",
                padding: "0.4rem 1.2rem",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              onClick={() => setShowLockPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

    </>
  );
}

export default Sidebar;
