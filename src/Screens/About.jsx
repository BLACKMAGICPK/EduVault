import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaLock, FaNetworkWired, FaQrcode, FaCloud } from "react-icons/fa";

function About() {
  return (
    <>
      <Navbar />

      <style>{`
        :root {
          --burgundy: #800020;
          --gold: #FFD700;
          --offwhite: #fff9f3;
          --card-bg: #fff5f5;
        }

        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background-color: var(--offwhite);
          
        }

        .about-container {
          color: #333;
        }

        /* About header scrolls normally */
        .about-header {
          background-color: var(--burgundy);
          color: white;
          text-align: center;
          padding: 2.5rem 1rem;
          width: auto;
        }

        .about-header h1 {
          font-size: 2.5rem;
          margin: 0.5rem 0 0 0;
        }

        .about-header p {
          font-size: 1.2rem;
          color: var(--gold);
          margin: 0;
        }

        .content-wrapper {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1rem 3rem 1rem;
        }

        .about-section {
          margin-bottom: 3rem;
          text-align: center; 

        .about-section h2 {
          color: var(--burgundy);
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        .about-section p {
          font-size: 1rem;
          margin-bottom: 1rem;
          line-height: 1.6;
          text-align: center;
          display: inline-block; 
          max-width: 800px;
        }


        .cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
}

        .card {
          background-color: var(--card-bg);
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-left: 5px solid var(--gold);
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
        }

        .card-icon {
          font-size: 2.5rem;
          color: var(--burgundy);
          margin-bottom: 1rem;
        }

        .card-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
          color: var(--burgundy);
        }

        .card-text {
          font-size: 0.95rem;
          color: #555;
        }

        @media (max-width: 768px) {
          .about-header h1 {
            font-size: 2rem;
          }
          .about-header p {
            font-size: 1rem;
          }
          .about-section h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="about-container">
       
        <header className="about-header">
          <h1>About EduVault</h1>
          <p>Secure, Verify, and Simplify Academic Credentials</p>
        </header>

        
        <div className="content-wrapper">
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              EduVault is dedicated to creating a secure and trustworthy platform for storing, sharing, and verifying academic credentials.
            </p>
            <p>
              By combining blockchain technology and cloud storage, we aim to eliminate the risk of document forgery and streamline verification processes.
            </p>
            <p>
              Our role-based access control ensures that students, institutions, recruiters, and admins can perform their tasks safely and securely.
            </p>
            <p>
              Ultimately, our mission is to make academic document management faster, reliable, and fraud-resistant.
            </p>
          </section>

          <section className="about-section">
            <h2>How EduVault Works</h2>
            <div className="cards-container">
              <div className="card">
                <FaLock className="card-icon" />
                <div className="card-title">Upload & Encrypt</div>
                <div className="card-text">
                  Students or institutions upload documents securely with AES-256 encryption, ensuring privacy and protection.
                </div>
              </div>

              <div className="card">
                <FaNetworkWired className="card-icon" />
                <div className="card-title">Hash & Store</div>
                <div className="card-text">
                  Each document is hashed using SHA-256 and stored immutably on the blockchain, preventing tampering.
                </div>
              </div>

              <div className="card">
                <FaQrcode className="card-icon" />
                <div className="card-title">QR Verification</div>
                <div className="card-text">
                  Documents are linked to a QR code, allowing instant authenticity checks by recruiters or institutions.
                </div>
              </div>

              <div className="card">
                <FaCloud className="card-icon" />
                <div className="card-title">Decentralized Access</div>
                <div className="card-text">
                  Encrypted documents remain securely accessible anytime, while maintaining audit logs and revocation records.
                </div>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Why EduVault?</h2>
            <p>
              EduVault speeds up verification, reduces fraud, and provides a trusted ecosystem for academic credentials.
            </p>
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default About;
