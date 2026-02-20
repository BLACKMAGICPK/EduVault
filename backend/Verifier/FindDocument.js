const axios = require("axios");
const crypto = require("crypto");

module.exports = function (app, client) {

  /* =========================================================
     🔐 HELPER: AES-256-CBC DECRYPT BUFFER
  ========================================================= */
  function decryptBuffer(encryptedBuffer, keyHex, ivHex) {
    const algorithm = "aes-256-cbc";
    const key = Buffer.from(keyHex, "hex");
    const iv = Buffer.from(ivHex, "hex");

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    return Buffer.concat([
      decipher.update(encryptedBuffer),
      decipher.final(),
    ]);
  }

  /* =========================================================
     🔑 HELPER: SHA-256 HASH VERIFY
  ========================================================= */
  function verifyHash(buffer, storedHash) {
    const hash = crypto
      .createHash("sha256")
      .update(buffer)
      .digest("hex");

    return hash === storedHash;
  }

  /* =========================================================
     🔍 FIND + DECRYPT DOCUMENT (VERIFIER)
     Endpoint: POST /verifier/find-document
  ========================================================= */
  app.post("/verifier/find-document", async (req, res) => {
    try {
      const {
        studentName,
        rollNumber,
        userId,
        documentType,
        metadata,
        verifierId, // ✅ RECEIVED FROM FRONTEND
      } = req.body;

      const db = client.db("user_data");
      const verifierLogsCol = db.collection("verifier_logs");

      /* ================= BUILD QUERY ================= */
      const query = { status: "Verified" };

      if (studentName) {
        query["studentInfo.name"] = new RegExp(`^${studentName}$`, "i");
      }

      if (rollNumber) {
        query["studentInfo.rollNumber"] = rollNumber;
      }

      if (userId) {
        query.userId = userId;
      }

      if (documentType) {
        query.documentType = documentType;
      }

      if (metadata && typeof metadata === "object") {
        Object.entries(metadata).forEach(([key, value]) => {
          if (value && String(value).trim() !== "") {
            query[`metadata.${key}`] = new RegExp(`^${value}$`, "i");
          }
        });
      }

      /* ================= FETCH DOCUMENT ================= */
      const doc = await db
        .collection("student_documents")
        .findOne(query);

      if (!doc) {
        return res.status(404).json({
          success: false,
          message: "No matching document found",
        });
      }

      /* ================= DOWNLOAD ENCRYPTED FILE ================= */
      const encryptedResponse = await axios.get(
        doc.file.cloudinaryUrl,
        { responseType: "arraybuffer" }
      );

      const encryptedBuffer = Buffer.from(encryptedResponse.data);

      /* ================= DECRYPT FILE ================= */
      const decryptedBuffer = decryptBuffer(
        encryptedBuffer,
        doc.file.encryption.key,
        doc.file.encryption.iv
      );

      /* ================= VERIFY HASH ================= */
      const isValid = verifyHash(
        decryptedBuffer,
        doc.file.sha256Hash
      );

      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: "File integrity check failed",
        });
      }

      /* ================= LOG VERIFIER ACTIVITY ================= */
      if (verifierId) {
        await verifierLogsCol.insertOne({
          verifierId,
          studentUserId: doc.userId,
          studentName: doc.studentInfo.name,

          action: "DOCUMENT_VIEWED",
          source: "MANUAL_VERIFICATION",

          documentId: doc._id.toString(),
          documentType: doc.documentType,

          message: `Verifier viewed ${doc.documentType} document of student ${doc.studentInfo.name}`,

          createdAt: new Date(),
        });
      }

      /* ================= BASE64 CONVERSION ================= */
      const base64File = decryptedBuffer.toString("base64");

      /* ================= SEND RESPONSE ================= */
      res.json({
        success: true,
        data: {
          documentId: doc._id,
          userId: doc.userId,

          studentInfo: doc.studentInfo,
          documentType: doc.documentType,
          metadata: doc.metadata,

          file: {
            base64: base64File,
            mimeType: "application/pdf",
          },

          status: doc.status,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
          qrCode: doc.qrCode,
        },
      });

    } catch (err) {
      console.error("❌ Find document error:", err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  });
};
