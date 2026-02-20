// routes/verifier/getVerifierLogs.js

module.exports = function (app, client) {

  /* =========================================================
     📜 GET VERIFIER ACTIVITY LOGS
     Endpoint: GET /verifier/logs/:verifierId
  ========================================================= */
  app.get("/verifier/logs/:verifierId", async (req, res) => {
    try {
      const { verifierId } = req.params;
      const db = client.db("user_data");

      const logs = await db
        .collection("verifier_logs")
        .find({ verifierId })
        .sort({ createdAt: -1 })
        .toArray();

      res.json({
        success: true,
        data: logs,
      });

    } catch (err) {
      console.error("❌ Verifier Logs Fetch Error:", err);
      res.status(500).json({
        success: false,
        message: "Failed to fetch verifier logs",
      });
    }
  });
};
