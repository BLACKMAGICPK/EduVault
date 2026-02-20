// routes/verifyDocument.js

module.exports = function (app, client) {

  /* =========================================================
     🔐 VERIFY DOCUMENT USING QR VERIFICATION URL
  ========================================================= */
  app.post("/verify-document", async (req, res) => {
    try {
      const { verificationUrl, verifierId } = req.body; 
      // verifierId can be optional or fetched from auth middleware later

      if (!verificationUrl) {
        return res.status(400).json({ valid: false });
      }

      const db = client.db("user_data");

      /* ================= FIND DOCUMENT ================= */
      const document = await db.collection("student_documents").findOne({
        "qrCode.verificationUrl": verificationUrl,
        status: "Verified",
      });

      if (!document) {
        return res.status(404).json({ valid: false });
      }

      /* ================= VERIFIER LOG ================= */
      const verifierLogsCol = db.collection("verifier_logs");

      await verifierLogsCol.insertOne({
        verifierId: verifierId || "UNKNOWN_VERIFIER",
        studentUserId: document.userId,
        studentName: document.studentInfo.name,
        documentId: document._id.toString(),
        documentType: document.documentType,
        action: "DOCUMENT_VERIFIED",
        message: `Verified ${document.documentType} document for student ${document.studentInfo.name}`,
        verificationUrl,
        createdAt: new Date(),
      });

      /* ================= RESPONSE ================= */
      res.json({
        valid: true,
        documentType: document.documentType,
        studentInfo: document.studentInfo,
      });

    } catch (err) {
      console.error("❌ QR Verify Error:", err);
      res.status(500).json({ valid: false });
    }
  });
};
