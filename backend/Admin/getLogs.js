const { ObjectId } = require("mongodb");

module.exports = function (app, client) {

  /* =================================================
     GET ADMIN ACTIVITY LOGS
     GET /admin/logs/:adminId
  ================================================= */
  app.get("/admin/logs/:adminId", async (req, res) => {
    try {
      const { adminId } = req.params;

      if (!adminId) {
        return res.status(400).json({
          message: "Admin ID is required",
        });
      }

      const db = client.db("user_data");
      const logsCollection = db.collection("admin_logs");

      const logs = await logsCollection
        .find({ adminId })
        .sort({ createdAt: -1 }) // latest first
        .toArray();

      res.json({
        data: logs,
      });

    } catch (error) {
      console.error("❌ Fetch Admin Logs Error:", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });
};
