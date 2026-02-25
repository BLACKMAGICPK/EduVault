const QRCode = require("qrcode");
const crypto = require("crypto");
const { ObjectId } = require("mongodb");

module.exports = function (app, client) {

  /* ================= QR GENERATOR ================= */
  async function generateDocumentQR(documentId, userId) {
    const payload = `${documentId}:${userId}`;

    const signature = crypto
      .createHash("sha256")
      .update(payload)
      .digest("hex");

    const verificationUrl =
      `https://eduvault-gold.vercel.app/verify/${documentId}?sig=${signature}`;

    const qrImage = await QRCode.toDataURL(verificationUrl, {
      errorCorrectionLevel: "H",
      width: 300,
      margin: 2,
    });

    return {
      dataUrl: qrImage,
      verificationUrl,
      signature,
      generatedAt: new Date(),
    };
  }

  /* =================================================
     APPROVE / REVOKE DOCUMENT
     POST /admin/document/status
  ================================================= */
  app.post("/admin/document/status", async (req, res) => {
    try {
      const { documentId, status, adminId } = req.body;

      if (!documentId || !adminId || !["Verified", "Revoked"].includes(status)) {
        return res.status(400).json({ message: "Invalid request" });
      }

      const db = client.db("user_data");

      const documentsCol = db.collection("student_documents");
      const studentHistoryCol = db.collection("student_history");
      const adminLogsCol = db.collection("admin_logs");

      const document = await documentsCol.findOne({
        _id: new ObjectId(documentId),
      });

      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      const { userId, documentType } = document;

      /* ================= QR ONLY FOR VERIFIED ================= */
      let qrCode = null;

      if (status === "Verified") {
        qrCode = document.qrCode
          ? document.qrCode
          : await generateDocumentQR(
              document._id.toString(),
              userId
            );
      }

      /* ================= UPDATE DOCUMENT ================= */
      await documentsCol.updateOne(
        { _id: document._id },
        {
          $set: {
            status,
            qrCode, // null if revoked
            updatedAt: new Date(),
          },
        }
      );

      /* ================= STUDENT HISTORY LOG ================= */
      await studentHistoryCol.insertOne({
        userId,
        action:
          status === "Verified"
            ? "DOCUMENT_VERIFIED"
            : "DOCUMENT_REVOKED",
        message:
          status === "Verified"
            ? `${documentType} document has been verified`
            : `${documentType} document has been revoked`,
        documentType,
        status,
        createdAt: new Date(),
      });

      /* ================= ADMIN ACTIVITY LOG ================= */
      await adminLogsCol.insertOne({
        adminId,
        studentUserId: userId,
        studentName: document.studentInfo.name,
        action:
          status === "Verified"
            ? "DOCUMENT_VERIFIED"
            : "DOCUMENT_REVOKED",
        documentId: document._id.toString(),
        documentType,
        message:
          status === "Verified"
            ? `Verified ${documentType} document for student ${document.studentInfo.name}`
            : `Revoked ${documentType} document for student ${document.studentInfo.name}`,
        createdAt: new Date(),
      });

      res.json({
        message: `Document ${status.toLowerCase()} successfully`,
        qrCode,
      });

    } catch (error) {
      console.error("❌ Update Status Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};
