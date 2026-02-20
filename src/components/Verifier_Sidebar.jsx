import React, { useState , useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaQrcode,
  FaCheckCircle,
  FaHistory,
  FaChevronRight,
  FaChevronLeft,
  FaUser,
  faSearch, 
  FaSearch,
} from "react-icons/fa";

function Sidebar({ role, userId, isProfileComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLockPopup, setShowLockPopup] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userId) {
      sessionStorage.setItem("userId", userId);
    }
  }, [userId]);
  
  const effectiveUserId = userId || sessionStorage.getItem("userId");
  
  console.log("📦 Sidebar effective userId:", effectiveUserId);

  // 🔹 VERIFIER MENU
  const menuItems = [
    { name: "Scan QR", path: "/verifier-dashboard/scan", icon: <FaQrcode /> },
    { name: "Find document", path: "/verifier-dashboard/find-document", icon: <FaSearch /> },
    { name: "Activity Logs", path: "/verifier-dashboard/logs", icon: <FaHistory /> },
    { name: "Profile", path: "/verifier-dashboard/profile", icon: <FaUser /> },
  ];

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
          font-weight: 500;
          cursor: pointer;
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
          display: flex;
          align-items: center;
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

          .sidebar:not(.expanded) .sidebar-link {
            justify-content: center;
            padding: 1rem 0;
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
          {menuItems.map((item) => (
            <div
              key={item.path}
              className={`sidebar-link ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => {
                if (
                  !isProfileComplete &&
                  item.path !== "/verifier-dashboard/profile"
                ) {
                  setShowLockPopup(true);
                } else {
                  navigate(item.path);
                  setIsOpen(false);
                }
              }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* 🔒 LOCK POPUP */}
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
            <p>Please complete your profile to continue.</p>
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
