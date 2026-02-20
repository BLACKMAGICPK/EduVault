// documents/getNotification.js

module.exports = function (app, client) {

  /* =========================================================
     📥 GET STUDENT NOTIFICATION / HISTORY LOGS
     Endpoint: GET /student/history/:userId
     Collection: student_history
  ========================================================= */

  app.get("/student/history/:userId", async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          message: "User ID is required",
        });
      }

      const db = client.db("user_data");

      const historyLogs = await db
        .collection("student_history")
        .find({ userId })
        .sort({ createdAt: -1 }) // Latest first
        .toArray();

      res.json({
        message: "Student notification history fetched successfully",
        data: historyLogs,
      });

    } catch (error) {
      console.error("❌ Fetch Student History Error:", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });

};
