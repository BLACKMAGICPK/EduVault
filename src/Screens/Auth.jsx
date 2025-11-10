import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.email.includes("@")) newErrors.email = "Invalid email address";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!isLogin && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(`${isLogin ? "Login" : "Signup"} successful! Redirecting...`);
    }
  };

  return (
    <>
      <Navbar />

      <style>{`

      /* Hide browser's default eye icon in password fields */
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear {
        display: none;
        }

        input[type="password"]::-webkit-credentials-auto-fill-button,
        input[type="password"]::-webkit-textfield-decoration-container,
        input[type="password"]::-webkit-clear-button,
        input[type="password"]::-webkit-inner-spin-button,
        input[type="password"]::-webkit-outer-spin-button {
        display: none !important;
        -webkit-appearance: none;
        }

        input[type="password"]::-webkit-textfield-decoration-container {
        display: none !important;
        }


        :root {
          --burgundy: #800020;
          --gold: #f4c542;
          --white: #ffffff;
          --offwhite: #f9f9f9;
          --charcoal: #2e2e2e;
        }

        body {
          background-color: var(--white);
        }
.auth-container {
  font-family: 'Poppins', sans-serif;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: linear-gradient(145deg, #660019 0%, #800020 25%, #a52a2a 50%, #d4af37 90%);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
  overflow: hidden;
}

/* ✨ Elegant patterned overlay (finer, soft premium lines) */
.auth-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(120deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(-120deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.5;
  pointer-events: none;
}

/* ✨ Soft premium border with slight gold highlight */
.auth-container::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 1.5px solid rgba(212, 175, 55, 0.3);

  box-shadow:
    0 0 20px rgba(212, 175, 55, 0.1),
    inset 0 0 40px rgba(128, 0, 32, 0.25);
  pointer-events: none;
}


        .auth-card {
          background: var(--burgundy);
          color: var(--white);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          max-width: 420px;
          width: 100%;
          padding: 40px 36px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .auth-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.25);
        }

        .tabs {
          display: flex;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          margin-bottom: 30px;
          overflow: hidden;
        }

        .tab-btn {
          flex: 1;
          padding: 12px 0;
          border: none;
          background: transparent;
          font-weight: 600;
          font-size: 1.05rem;
          color: var(--white);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab-btn.active {
          background: var(--gold);
          color: var(--burgundy);
        }

        .form-group {
          text-align: left;
          margin-bottom: 20px;
          position: relative;
        }

        .form-group label {
          font-weight: 600;
          display: block;
          margin-bottom: 6px;
          color: var(--gold);
        }

        .form-group input {
          width: 86%;
          padding: 12px 42px 12px 14px;
          border: none;
          border-radius: 10px;
          background: var(--offwhite);
          font-size: 0.95rem;
          outline: none;
          color: var(--charcoal);
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          background: #fff8e1;
          box-shadow: 0 0 6px rgba(244,197,66,0.8);
        }

        .password-field {
          position: relative;
        }

        .toggle-password {
          position: absolute;
          top: 75%;
          right: 14px;
          transform: translateY(-50%);
          cursor: pointer;
          color: var(--burgundy);
          
          padding: 5px;
          
          transition: all 0.3s ease;
        }

        .toggle-password:hover {
          background: #ffe871;
        }

        .error {
          color: #ffb3b3;
          font-size: 0.85rem;
          margin-top: 4px;
        }

        .forgot-link {
          display: block;
          text-align: right;
          margin-bottom: 12px;
          font-size: 0.9rem;
          text-decoration: none;
          color: var(--gold);
          transition: color 0.3s ease;
        }

        .forgot-link:hover {
          color: #fff8b0;
        }

        .submit-btn {
          width: 100%;
          background: var(--gold);
          color: var(--burgundy);
          border: none;
          border-radius: 10px;
          padding: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 8px;
        }

        .submit-btn:hover {
          background: transparent;
          border: 2px solid var(--gold);
          color: var(--gold);
          transform: scale(1.03);
        }

        @media (max-width: 768px) {
          .auth-card {
            padding: 30px 24px;
          }
        }
      `}</style>

      <div className="auth-container">
        <div className="auth-card">
          {/* ===== Tabs ===== */}
          <div className="tabs">
            <button
              className={`tab-btn ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Log In
            </button>
            <button
              className={`tab-btn ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {/* ===== Form ===== */}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div className="form-group password-field">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            {formData.password && (
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    )}

              {errors.password && <div className="error">{errors.password}</div>}
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <div className="error">{errors.confirmPassword}</div>
                )}
              </div>
            )}

            {isLogin && (
              <a href="#" className="forgot-link">
                Forgot Password?
              </a>
            )}

            <button type="submit" className="submit-btn">
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AuthPage;
