import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BASE_URL from "../Configure";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();



  /* ================= SEND OTP ================= */
const sendOtp = async () => {
  if (!email.includes("@")) {
    toast.error("Enter a valid email");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch(`${BASE_URL}/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      toast.success("OTP sent successfully");

      // ✅ SAVE USER ID
      setUserId(data.userId);

      setOtpSent(true);
    } else {
      toast.error(data.message || "Failed to send OTP");
    }
  } catch (err) {
    console.error(err);
    toast.error("Server error");
  } finally {
    setLoading(false);
  }
};


  /* ================= VERIFY OTP ================= */
const verifyOtp = async () => {
  const enteredOtp = otp.join("");

  if (enteredOtp.length !== 6) {
    toast.error("Enter complete OTP");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp: enteredOtp }),
    });

    const data = await res.json();

    if (res.ok && data.success) {

      navigate("/reset-password", {
        state: {
          email,
          userId: data.userId,
        },
      });

    } else {
      toast.error( "Invalid OTP");
    }
  } catch (err) {
    console.error(err);
    toast.error("Verification failed");
  } finally {
    setLoading(false);
  }
};


  /* ================= OTP INPUT HANDLER ================= */
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-container">
        <div className="auth-card">
          <h2 style={{ marginBottom: "20px" }}>Forgot Password</h2>

          {/* EMAIL FIELD */}
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="user@example.com"
              value={email}
              disabled={otpSent}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {!otpSent && (
            <button
              className="submit-btn loading-btn"
              onClick={sendOtp}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="btn-spinner"></span>
                  Sending OTP
                </>
              ) : (
                "Send OTP"
              )}
            </button>
          )}


          {/* OTP SECTION */}
          {otpSent && (
            <>
              <label style={{ marginTop: "20px", display: "block" }}>
                Enter OTP
              </label>

              <div className="otp-boxes">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) =>
                      handleOtpChange(e.target.value, i)
                    }
                  />
                ))}
              </div>

              <button
                className="submit-btn loading-btn"
                onClick={verifyOtp}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="btn-spinner"></span>
                    Verifying OTP
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>

            </>
          )}
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />

      <Footer />

      {/* ===== OTP STYLES ONLY ===== */}
      <style>{`
        .otp-boxes {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin: 14px 0 20px;
        }

        .otp-boxes input {
          width: 44px;
          height: 48px;
          text-align: center;
          font-size: 1.2rem;
          border-radius: 8px;
          border: none;
          outline: none;
          background: #f9f9f9;
        }

        .otp-boxes input:focus {
          box-shadow: 0 0 6px rgba(244,197,66,0.9);
          background: #fff;
        }
                    input[type="password"]::-ms-reveal,
          input[type="password"]::-ms-clear,
          input[type="password"]::-webkit-clear-button,
          input[type="password"]::-webkit-inner-spin-button,
          input[type="password"]::-webkit-outer-spin-button {
            display: none !important;
          }

          :root {
            --burgundy: #800020;
            --gold: #f4c542;
            --white: #ffffff;
            --offwhite: #f9f9f9;
            --charcoal: #2e2e2e;
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

          .auth-container::after {
            content: "";
            position: absolute;
            inset: 0;
            border: 1.5px solid rgba(212, 175, 55, 0.3);
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.1),
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

          .tabs, .role-tabs {
            display: flex;
            justify-content: center;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            overflow: hidden;
            margin-bottom: 20px;
          }

          .tab-btn, .role-btn {
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

          .tab-btn.active, .role-btn.active {
            background: var(--gold);
            color: var(--burgundy);
          }

          .role-tabs {
            margin-bottom: 30px;
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
          .password-wrapper {
            position: relative;
            display: flex;
            align-items: center;
          }

          .password-wrapper input {
            width: 100%;
            padding-right: 40px; /* space for eye icon */
          }

          .toggle-password {
            position: absolute;
            right: 12px;
            top: 50%;
            cursor: pointer;
            color: var(--burgundy);
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* ========== TOASTIFY CUSTOM STYLES (EduVault Theme) ========== */

          .toast-success {
            background: #043f2e !important; /* Dark green success tone */
            color: #d4f4d2 !important; /* Light mint text */
            border-left: 6px solid #4caf50 !important;
            border-radius: 12px !important;
            padding: 12px !important;
            font-weight: 600 !important;
            font-family: "Poppins" !important;
          }

          .toast-error {
            background: #5a0000 !important; /* Deep burgundy error tone */
            color: #ffe6e6 !important; /* Soft red text */
            border-left: 6px solid #ff4d4d !important;
            border-radius: 12px !important;
            padding: 12px !important;
            font-weight: 600 !important;
            font-family: "Poppins" !important;
          }

          .toast-info {
            background: #800020 !important; /* Burgundy */
            color: #f4c542 !important; /* Gold text */
            border-left: 6px solid #d4af37 !important;
            border-radius: 12px !important;
            padding: 12px !important;
            font-weight: 600 !important;
            font-family: "Poppins" !important;
          }

          .toast-default {
            background: #2e2e2e !important; /* Charcoal fallback */
            color: white !important;
            border-left: 6px solid #f4c542 !important;
            border-radius: 12px !important;
            padding: 12px !important;
            font-family: "Poppins" !important;
          }

          /* Smooth Fade-in Animation */
          .Toastify__toast {
            animation: fadeInUp 0.4s ease forwards;
          }

          @keyframes fadeInUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0px);
              opacity: 1;
            }
          }

          /* ===== BUTTON SPINNER (OTP FLOW) ===== */
            .loading-btn {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
            }

            .loading-btn:disabled {
              cursor: not-allowed;
              opacity: 0.9;
            }

            /* Spinner */
            .btn-spinner {
              width: 18px;
              height: 18px;
              border: 3px solid rgba(128, 0, 32, 0.25);
              border-top: 3px solid #800020; /* burgundy */
              border-radius: 50%;
              animation: btn-spin 0.8s linear infinite;
            }

            /* Spin animation */
            @keyframes btn-spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }

        


          @media (max-width: 768px) {
            .auth-card {
              padding: 30px 24px;
            }
          }
          
      `}</style>
    </>
  );
}

export default ForgotPassword;
