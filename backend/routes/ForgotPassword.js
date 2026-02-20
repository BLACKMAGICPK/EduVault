const nodemailer = require("nodemailer");

/**
 * OTP STORE (IN-MEMORY)
 * {
 *   email: {
 *     otp: "123456",
 *     userId: "us_st_25001",
 *     expiresAt: timestamp
 *   }
 * }
 */
const otpStore = {};

module.exports = function (app, client) {

  /* =========================================================
     📧 SEND OTP (ONLY IF EMAIL EXISTS)
     Endpoint: POST /auth/send-otp
  ========================================================= */
  app.post("/auth/send-otp", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      const db = client.db("user_data");

      /* ================= CHECK EMAIL EXISTS ================= */
      const user = await db
        .collection("student_data")
        .findOne({ email });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "No account found with this email",
        });
      }

      const userId = user.userId;

      /* ================= GENERATE OTP ================= */
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      otpStore[email] = {
        otp,
        userId,
        expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
      };

      /* ================= SEND EMAIL ================= */
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"EduVault" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "EduVault Password Reset OTP",
        html: `
          <div style="font-family:Poppins,Arial">
            <h2>EduVault Password Reset</h2>
            <p>Your OTP is:</p>
            <h1 style="letter-spacing:4px">${otp}</h1>
            <p>This OTP is valid for <b>5 minutes</b>.</p>
            <p>If you didn’t request this, please ignore.</p>
          </div>
        `,
      });

      /* ================= RESPONSE ================= */
      res.json({
        success: true,
        userId,
        message: "OTP sent successfully",
      });

    } catch (err) {
      console.error("❌ Send OTP Error:", err);
      res.status(500).json({
        success: false,
        message: "Failed to send OTP",
      });
    }
  });

  /* =========================================================
     🔐 VERIFY OTP
     Endpoint: POST /auth/verify-otp
  ========================================================= */
  app.post("/auth/verify-otp", (req, res) => {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(400).json({
          success: false,
          message: "Email and OTP are required",
        });
      }

      const record = otpStore[email];

      if (!record) {
        return res.status(400).json({
          success: false,
          message: "OTP not found or expired",
        });
      }

      /* ================= CHECK EXPIRY ================= */
      if (Date.now() > record.expiresAt) {
        delete otpStore[email];
        return res.status(400).json({
          success: false,
          message: "OTP expired",
        });
      }

      /* ================= CHECK OTP ================= */
      if (record.otp !== otp) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }

      /* ================= SUCCESS ================= */
      const userId = record.userId;
      delete otpStore[email]; // clear OTP after success

      res.json({
        success: true,
        email,
        userId,
        message: "OTP verified successfully",
      });

    } catch (err) {
      console.error("❌ Verify OTP Error:", err);
      res.status(500).json({
        success: false,
        message: "OTP verification failed",
      });
    }
  });
};
