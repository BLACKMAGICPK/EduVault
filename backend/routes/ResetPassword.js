// routes/resetPassword.js
const bcrypt = require("bcryptjs");

module.exports = function (app, client) {
  /* =========================================================
     🔐 RESET PASSWORD
     Endpoint: POST /auth/reset-password
  ========================================================= */
  app.post("/auth/reset-password", async (req, res) => {
    try {
      const { userId, email, newPassword } = req.body;

      if (!userId || !email || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      const db = client.db("user_data");

      /* ================= FIND STUDENT ================= */
      const student = await db.collection("student_data").findOne({
        userId,
        email,
      });

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Account not found",
        });
      }

      /* ================= HASH PASSWORD ================= */
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      /* ================= UPDATE PASSWORD ================= */
      await db.collection("student_data").updateOne(
        { userId, email },
        {
          $set: {
            password: hashedPassword,
            updatedAt: new Date(),
          },
        }
      );

      res.json({
        success: true,
        message: "Password updated successfully",
      });

    } catch (err) {
      console.error("Reset Password Error:", err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  });
};
