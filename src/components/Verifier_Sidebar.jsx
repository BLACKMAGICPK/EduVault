// Sidebar.jsx
import React, { useState } from "react";
import {
  FaQrcode,
  FaCheckCircle,
  FaHistory,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";

function Sidebar({ role = "verifier", activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = {
    verifier: [
      { name: "Scan QR", key: "scan", icon: <FaQrcode /> },
      { name: "Manual Verify", key: "manual", icon: <FaCheckCircle /> },
      { name: "Request History", key: "history", icon: <FaHistory /> },
    ],
  };

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
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          position: fixed;
          top: 70px;
          left: 0;
          box-shadow: 4px 0 15px rgba(0, 0, 0, 0.15);
          border-right: 2px solid rgba(255, 215, 0, 0.4);
          transition: all 0.3s ease-in-out;
          overflow-y: auto;
          z-index: 90;
        }

        .sidebar-nav {
          padding: 1rem 1rem;
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
          cursor: pointer;
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

          .sidebar.expanded .sidebar-link span:last-child {
            display: inline;
          }

          .sidebar:not(.expanded) .sidebar-link {
            justify-content: center;
            padding: 1rem 0;
            border-radius: 10%;
            width: 40px;
            height: 14px;
            margin: 0.6rem 0rem;
            
          }

          .sidebar:not(.expanded) .sidebar-link:hover {
            background-color: var(--gold-light);
            transform: scale(1.05);
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
            margin-top: 1rem;
            margin-left: 1rem;
            transition: all 0.3s ease;
          }

          .sidebar-toggle:hover {
            background-color: #9b1d30;
            transform: scale(1.05);
          }
        }

        @media (min-width: 993px) {
          .sidebar-toggle {
            display: none !important;
          }
        }
      `}</style>

      <aside className={`sidebar ${isOpen ? "expanded" : ""}`}>
        <div className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </div>

        <nav className="sidebar-nav">
          {menuItems[role].map((item) => (
            <div
              key={item.key}
              className={`sidebar-link ${activeTab === item.key ? "active" : ""}`}
              onClick={() => {
                setActiveTab(item.key);
                setIsOpen(false);
              }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
