import React from "react";

function Footer() {
  return (
    <>
      {/* ======= Inline CSS ======= */}
      <style>{`
        :root {
          --burgundy: #800020;
          --gold: #f4c542;
          --white: #ffffff;
          --charcoal: #2e2e2e;
        }

        footer {
          background-color: var(--burgundy);
          color: var(--white);
          font-family: 'Poppins', sans-serif;
          padding: 40px 20px 10px 20px;
          box-sizing: border-box;
        }

        .footer-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-column h3 {
          color: var(--gold);
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .footer-column p {
          color: var(--white);
          line-height: 1.6;
          font-size: 0.95rem;
          margin: 0;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 8px;
        }

        .footer-links a {
          text-decoration: none;
          color: var(--white);
          transition: color 0.3s ease;
          font-size: 0.95rem;
        }

        .footer-links a:hover {
          color: var(--gold);
        }

        .social-icons {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 8px;
        }

        .social-icons a {
          color: var(--white);
          font-size: 1.3rem;
          transition: color 0.3s ease, transform 0.2s ease;
          text-decoration: none;
        }

        .social-icons a:hover {
          color: var(--gold);
          transform: scale(1.1);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          text-align: center;
          margin-top: 30px;
          padding-top: 16px;
          font-size: 0.9rem;
          color: #e6e6e6;
        }

        @media (max-width: 600px) {
          .footer-container {
            text-align: center;
          }
          .social-icons {
            justify-content: center;
          }
        }
      `}</style>

      {/* ======= Footer Component ======= */}
      <footer>
        <div className="footer-container">
          {/* === About EduVault === */}
          <div className="footer-column">
            <h3>About EduVault</h3>
            <p>
              EduVault is a secure academic record management platform designed
              to store, verify, and share your documents with complete trust.
              Empowering education with digital authenticity.
            </p>
          </div>

          {/* === Quick Links === */}
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="/faqs">FAQs</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* === Socials === */}
          <div className="footer-column">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        {/* === Bottom Line === */}
        <div className="footer-bottom">
          © {new Date().getFullYear()} EduVault. Built on trust, powered by technology.
        </div>
      </footer>

      {/* === FontAwesome for Icons === */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
    </>
  );
}

export default Footer;
