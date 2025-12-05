import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <>
      <Navbar />

      <style>{`
        :root {
          --burgundy: #800020;
          --gold: #FFD700;
          --offwhite: #fff9f3;
          --form-bg: #fff0f0;
        }

        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background-color: var(--offwhite);
        }

        .contact-container {
          color: #333;
        }

        .contact-header {
          background-color: var(--burgundy);
          color: white;
          text-align: center;
          padding: 2.5rem 1rem;
        }

        .contact-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .contact-header p {
          font-size: 1.2rem;
          color: var(--gold);
          margin: 0;
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem 4rem;
          display: flex;
          justify-content: center;
        }

        .contact-section {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 3rem;
          width: 100%;
        }

    
        .contact-form {
          flex: 1;
          min-width: 350px;
          max-width: 500px;
          background-color: var(--form-bg);
          padding: 3rem;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          border: 2px solid var(--burgundy);
        }

        .contact-form label {
          display: block;
          font-weight: 700;
          color: var(--burgundy);
          margin-bottom: 0.5rem;
        }

        .contact-form input,
        .contact-form textarea {
          width: 90%;
          padding: 0.75rem 1rem;
          margin-bottom: 1.5rem;
          border: 2px solid var(--burgundy);
          border-radius: 8px;
          font-size: 0.95rem;
          outline: none;
          transition: border 0.3s ease, box-shadow 0.3s ease;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: var(--gold);
          box-shadow: 0 0 8px rgba(255, 215, 0, 0.3);
        }

        .contact-form button {
          display: block;
          margin: 1rem auto 0;
          background-color: var(--gold);
          color: var(--burgundy);
          border: none;
          border-radius: 8px;
          padding: 0.8rem 2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .contact-form button:hover {
          background-color: #f2c400;
          transform: scale(1.05);
        }

       
        .contact-details {
          flex: 1;
          min-width: 300px;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          justify-content: center;
          align-items: stretch;
        }

        .contact-card {
          background-color: var(--burgundy);
          padding: 2rem;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          transition: transform 0.3s ease;
          width: 100%;
        }

        .contact-card:hover {
          transform: translateY(-5px);
        }

        .contact-card svg {
          color: var(--gold);
          font-size: 2rem;
          min-width: 40px;
        }

        .contact-card p {
          margin: 0;
          font-weight: 600;
          font-size: 1rem;
          color: white;
        }

       
        @media (max-width: 768px) {
          .contact-header h1 {
            font-size: 2rem;
          }

          .contact-header p {
            font-size: 1rem;
          }

          .content-wrapper {
            padding: 2rem 1rem;
          }

          .contact-section {
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }

          .contact-form {
            order: 1;
            width: 80%;
            padding: 2rem 1.5rem;
            min-width: unset;
          }

          .contact-details {
            order: 2;
            width: 90%;
            align-items: center;
          }

          .contact-card {
            width: 90%;
            padding: 1.5rem;
          }

          .contact-form input,
          .contact-form textarea {
            font-size: 0.9rem;
          }

          .contact-form button {
            padding: 0.7rem 1.5rem;
            font-size: 0.95rem;
          }
        }
      `}</style>

      <div className="contact-container">
        <header className="contact-header">
          <h1>Contact EduVault</h1>
          <p>We’re here to assist with all your questions and support</p>
        </header>

        <div className="content-wrapper">
          <section className="contact-section">
      
            <form className="contact-form">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Enter your name" />

              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Enter your email" />

              <label htmlFor="message">Message</label>
              <textarea id="message" rows="6" placeholder="Write your message here..." />

              <button type="submit">Send Message</button>
            </form>

     
            <div className="contact-details">
              <div className="contact-card">
                <FaEnvelope />
                <p>support@eduvault.com</p>
              </div>
              <div className="contact-card">
                <FaPhone />
                <p>+91 98765 43210</p>
              </div>
              <div className="contact-card">
                <FaMapMarkerAlt />
                <p>123 EduVault Street, Chennai, India</p>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Contact;
