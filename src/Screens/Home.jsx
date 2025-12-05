import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImage from "../image/Herosectionbg.jpg";

// React Icons
import { FaUpload, FaBolt, FaLink, FaUserGraduate, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

function Home() {
  return (
    <>
      <Navbar />

      <style>{`
        :root {
          --burgundy: #800020;
          --gold: #f4c542;
          --white: #ffffff;
          --offwhite: #f9f9f9;
          --charcoal: #2e2e2e;
        }

        .home-container {
          font-family: 'Poppins', sans-serif;
          color: var(--charcoal);
        }

    .hero {
            position: relative;
            height: 85vh;
            background: linear-gradient(rgba(123, 17, 19, 0.30), rgba(123, 17, 19, 0.30)), 
                        url(${heroImage}) center/cover no-repeat;
            display: flex;
            flex-direction: column;
            align-items: flex-start;     
            justify-content: center;
            text-align: left;           
            color: var(--white);
            padding: 20px 10% 20px 10%; 
            }

            .hero h1, .hero p, .cta-button {
            max-width: 600px;          
            }

        .hero h1 {
          font-size: 3rem;
          font-weight: 700;
          color: var(--gold);
          margin-bottom: 16px;
          letter-spacing: 1px;
        }

        .hero p {
          font-size: 1.2rem;
          max-width: 600px;
          line-height: 1.6;
          margin-bottom: 32px;
          color: var(--white);
        }

        .cta-button {
          background: var(--gold);
          color: var(--burgundy);
          border: 2px solid var(--gold);
          padding: 14px 32px;
          border-radius: 40px;
          font-weight: 600;
          font-size: 1.1rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          background: transparent;
          color: var(--gold);
          transform: scale(1.05);
        }

        .features {
          background-color: var(--offwhite);
          padding: 70px 20px;
          text-align: center;
        }

        .features h2 {
          color: var(--burgundy);
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 40px;
        }

        .feature-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 28px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .feature-card {
          background: var(--white);
          border-radius: 18px;
          padding: 30px 20px;
          box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
        }

        .feature-icon {
          font-size: 2.8rem;
          color: var(--gold);
          margin-bottom: 16px;
        }

        .feature-card:nth-child(even) {
          background: var(--burgundy);
          color: var(--white);
        }

        .feature-card:nth-child(even) .feature-icon {
          color: var(--gold);
        }

        .feature-card h3 {
          color: var(--gold);
          margin-bottom: 10px;
          font-size: 1.3rem;
        }

        .how-it-works {
          background-color: var(--burgundy);
          color: var(--white);
          padding: 80px 20px;
          text-align: center;
          position: relative;
        }

        .how-it-works h2 {
          color: var(--gold);
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 50px;
        }

        .steps {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 30px;
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
        }

        .step {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 14px;
          padding: 24px;
          width: 200px;
          transition: transform 0.3s ease;
          position: relative;
        }

        .step:hover {
          transform: translateY(-5px);
        }

        .step-number {
          background-color: var(--gold);
          color: var(--burgundy);
          font-weight: 700;
          font-size: 1.2rem;
          width: 38px;
          height: 38px;
          line-height: 38px;
          border-radius: 50%;
          display: inline-block;
          margin-bottom: 12px;
        }

        .arrow-line {
          font-size: 2rem;
          color: var(--gold);
          animation: pulseArrow 1.5s infinite ease-in-out;
        }

        @keyframes pulseArrow {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(10px); opacity: 0.7; }
        }

        .about-partners {
          background-color: var(--offwhite);
          padding: 70px 20px;
          text-align: center;
        }

        .about-partners h2 {
          color: var(--burgundy);
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .partners-logos {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px;
          margin-top: 20px;
        }

        .partner-logo {
          background: var(--white);
          border-radius: 12px;
          padding: 12px 20px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
          font-weight: 600;
          color: var(--burgundy);
          border: 1px solid var(--gold);
          transition: transform 0.3s ease;
        }

        .partner-logo:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.1rem;
          }
          .feature-cards {
            grid-template-columns: 1fr;
          }
          .steps {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="home-container">
        
        <section className="hero">
          <h1>Secure Blockchain Degree Verification</h1>
          <p>
            Empowering institutions and graduates with transparent, tamper-proof
            academic verification powered by blockchain technology.
          </p>
          <a href="/auth" className="cta-button">
            Get Started <FaArrowRight />
          </a>
        </section>

        <section className="features">
          <h2>Why Choose EduVault?</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon"><FaUpload /></div>
              <h3>Upload Credentials</h3>
              <p>Safely upload your academic documents to a secure digital vault with complete data protection.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaBolt /></div>
              <h3>Instant Verification</h3>
              <p>Institutions and recruiters can verify documents instantly with blockchain-backed trust.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaLink /></div>
              <h3>Immutable Records</h3>
              <p>Every credential is permanently stored on blockchain — ensuring authenticity for a lifetime.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaUserGraduate /></div>
              <h3>Universal Access</h3>
              <p>Access your verified documents anytime, anywhere, from your EduVault dashboard.</p>
            </div>
          </div>
        </section>


        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps">
            <motion.div 
              className="step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="step-number">1</div>
              <h4>Upload</h4>
              <p>Students or institutions upload academic credentials securely.</p>
            </motion.div>

            <motion.div
              className="arrow-line"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              ➜
            </motion.div>

            <motion.div 
              className="step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="step-number">2</div>
              <h4>Verify</h4>
              <p>Verification is done instantly via blockchain technology.</p>
            </motion.div>

            <motion.div
              className="arrow-line"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              ➜
            </motion.div>

            <motion.div 
              className="step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="step-number">3</div>
              <h4>Trust</h4>
              <p>Trusted and shareable records for employers and organizations.</p>
            </motion.div>
          </div>
        </section>

        <section className="about-partners">
          <h2>Our Partners</h2>
          <p>
            We collaborate with leading universities and verification networks to
            deliver trusted and transparent digital credentials.
          </p>
          <div className="partners-logos">
            <div className="partner-logo">IIT Madras</div>
            <div className="partner-logo">NIT Trichy</div>
            <div className="partner-logo">AICTE</div>
            <div className="partner-logo">UGC</div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Home;
