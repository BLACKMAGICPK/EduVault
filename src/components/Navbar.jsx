import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../image/eduvault_logo_bg.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
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
          padding: 14px 32px;
          box-sizing: border-box;
        }

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
          background: transparent;
          color: var(--gold);
        }

        .btn-signup:hover {
          background: var(--gradient);
          color: var(--burgundy);
        }


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

        .dropdown:hover .dropdown-content {
          display: block;
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

     
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          width: 32px;
          height: 32px;
          position: relative;
          z-index: 1200;
        }

        .bar {
          height: 3px;
          width: 28px;
          background-color: var(--gold);
          margin: 2.25px 0;
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .hamburger.open .bar:nth-child(1) {
          transform: rotate(45deg) translateY(10px);
        }

        .hamburger.open .bar:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open .bar:nth-child(3) {
          transform: rotate(-45deg) translateY(-10px);
        }

        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }

          .nav-links {
            display: none;
          }

          .mobile-menu {
            position: absolute;
            top: 75px;
            right: 20px;
            background: rgba(128, 0, 32, 0.95);
            backdrop-filter: blur(8px);
            border: 2px solid rgba(244, 197, 66, 0.4);
            border-radius: 14px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.25);
            padding: 16px 24px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
            animation: fadeIn 0.3s ease forwards;
            z-index: 1100;
            align-items: center;
          }

          .mobile-menu a {
            text-decoration: none;
            color: var(--white);
            font-weight: 500;
            transition: color 0.3s ease;
            align-items: center;
            
          }

          .mobile-menu a:hover {
            color: var(--gold);
          }

          .mobile-menu .auth-buttons {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
            margin-left: 0;
            gap: 10px;
            text-align: center;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      `}</style>

      <header className="navbar">
        <nav className="navbar-container">
          <div className="navbar-logo">
            <Link to="/" className="logo-link">
              <img src={logo} alt="EduVault Logo" className="logo-img" />
              <span className="logo-text">EduVault</span>
            </Link>
          </div>


          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {!isLoggedIn ? (
              <div className="auth-buttons">
                <Link to="/auth" className="btn-login">Login</Link>
                <Link to="/auth" className="btn-signup">Sign Up</Link>
              </div>
            ) : (
              <li className="dropdown">
                <button className="dropdown-btn">Profile ▾</button>
                <div className="dropdown-content">
                  <Link to="/profile">Dashboard</Link>
                  <button onClick={() => setIsLoggedIn(false)}>Logout</button>
                </div>
              </li>
            )}
          </ul>

       
          <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          {isOpen && (
            <div className="mobile-menu">
              <Link to="/" onClick={toggleMenu}>Home</Link>
              <Link to="/about" onClick={toggleMenu}>About</Link>
              <Link to="/contact" onClick={toggleMenu}>Contact</Link>
              {!isLoggedIn ? (
                <div className="auth-buttons">
                  <Link to="/auth" className="btn-login" onClick={toggleMenu}>Login</Link>
                  <Link to="/auth" className="btn-signup" onClick={toggleMenu}>Sign Up</Link>
                </div>
              ) : (
                <>
                  <Link to="/profile" onClick={toggleMenu}>Dashboard</Link>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      toggleMenu();
                    }}
                    className="btn-signup"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </nav>
      </header>
    </>
  );
}

export default Navbar;
