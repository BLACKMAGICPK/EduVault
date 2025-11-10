import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../image/eduvault_logo_bg.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // toggle manually

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* ======= Google Font ======= */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        :root {
          --burgundy: #800020;
          --gold: #f4c542;
          --white: #ffffff;
          --gradient: linear-gradient(135deg, #f4c542, #ffb700);
        }

        .navbar {
          position: sticky;
          top: 0;
          background-color: var(--burgundy);
          color: var(--white);
          z-index: 1000;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
          font-family: 'Poppins', sans-serif;
        }

      .navbar-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 32px; /* You can reduce or remove horizontal padding if needed */
        box-sizing: border-box;
        }

        /* === Logo === */
        .logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .logo-img {
          height: 46px;
          width: 46px;
          margin-right: 8px;
          border-radius: 10px;
        }

        .logo-text {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 1px;
        }

        /* === Links === */
        .nav-links {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 26px;
          margin: 0;
        }

        .nav-links li a {
          text-decoration: none;
          color: var(--white);
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-links li a:hover {
          color: var(--gold);
        }

        /* === Login/Signup Button Group === */
        .auth-buttons {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-left: 40px;
        }

        .btn-login,
        .btn-signup {
          background: var(--gradient);
          color: var(--burgundy);
          padding: 8px 18px;
          border-radius: 25px;
          font-weight: 600;
         
          transition: all 0.3s ease;
          text-decoration: none;
          border: 2px solid var(--gold);
        }

        .btn-login:hover,
        .btn-signup:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 10px rgba(255, 215, 0, 0.4);
        }

        
        .btn-signup {
          border: 2px solid var(--gold);
          background: transparent;
          color: var(--gold);
        }

        .btn-signup:hover {
          background: var(--gradient);
          color: var(--burgundy);
        }

        /* === Dropdown === */
        .dropdown {
          position: relative;
        }

        .dropdown-btn {
          background: var(--gradient);
          color: var(--burgundy);
          border: none;
          border-radius: 20px;
          padding: 8px 16px;
          font-weight: bold;
          cursor: pointer;
        }

        .dropdown-content {
          display: none;
          position: absolute;
          top: 38px;
          right: 0;
          background-color: var(--white);
          color: var(--burgundy);
          border-radius: 8px;
          min-width: 150px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .dropdown-content a,
        .dropdown-content button {
          display: block;
          width: 100%;
          text-align: left;
          padding: 8px 12px;
          text-decoration: none;
          background: none;
          border: none;
          color: var(--burgundy);
          cursor: pointer;
        }

        .dropdown-content a:hover,
        .dropdown-content button:hover {
          background-color: rgba(255, 215, 0, 0.15);
        }

        .dropdown:hover .dropdown-content {
          display: block;
        }

        /* === Hamburger === */
        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
        }

        .bar {
          height: 3px;
          width: 25px;
          background-color: var(--gold);
          margin: 4px 0;
          transition: 0.3s;
        }

        /* === Responsive === */
        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }

          .nav-links {
            position: absolute;
            top: 64px;
            left: 0;
            width: 100%;
            background-color: var(--burgundy);
            flex-direction: column;
            text-align: center;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-in-out;
          }

          .nav-links.active {
            max-height: 300px;
            padding: 16px 0;
          }

          .nav-links li {
            margin: 12px 0;
          }

          .auth-buttons {
            flex-direction: column;
            margin-left: 0;
          }
        }
      `}</style>

      <header className="navbar">
        <nav className="navbar-container">
          {/* === Logo === */}
          <div className="navbar-logo">
            <Link to="/" className="logo-link">
              <img src={logo} alt="EduVault Logo" className="logo-img" />
              <span className="logo-text">EduVault</span>
            </Link>
          </div>

          {/* === Nav Links === */}
          <ul className={`nav-links ${isOpen ? "active" : ""}`}>
            <li>
              <Link to="/" onClick={toggleMenu}>Home</Link>
            </li>
            <li>
              <Link to="/about" onClick={toggleMenu}>About</Link>
            </li>
            <li>
              <Link to="/contact" onClick={toggleMenu}>Contact</Link>
            </li>

            {!isLoggedIn ? (
              <div className="auth-buttons">
                <Link to="/auth" className="btn-login" onClick={toggleMenu}>
                  Login
                </Link>
                <Link to="/auth" className="btn-signup" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </div>
            ) : (
              <li className="dropdown">
                <button className="dropdown-btn">Profile ▾</button>
                <div className="dropdown-content">
                  <Link to="/profile">Dashboard</Link>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      toggleMenu();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </li>
            )}
          </ul>

          {/* === Hamburger === */}
          <div className="hamburger" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
