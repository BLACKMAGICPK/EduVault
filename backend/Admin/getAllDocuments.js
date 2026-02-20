// documents/getAllDocuments.js

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
     📥 GET + DECRYPT ALL DOCUMENTS (ADMIN / VERIFIER)
     Endpoint: GET /documents/all
  ========================================================= */
  app.get("/documents/all", async (req, res) => {
    try {
      const db = client.db("user_data");

      /* ================= FETCH ALL DOCUMENTS ================= */
      const documents = await db
        .collection("student_documents")
        .find({})
        .sort({ createdAt: -1 }) // latest first
        .toArray();

      if (!documents.length) {
        return res.json({
          message: "No documents found",
          data: [],
        });
      }

      /* ================= PROCESS DOCUMENTS ================= */
      const result = [];

      for (const doc of documents) {
        try {
          /* ===== DOWNLOAD ENCRYPTED FILE FROM CLOUDINARY ===== */
          const encryptedResponse = await axios.get(
            doc.file.cloudinaryUrl,
            { responseType: "arraybuffer" }
          );

          const encryptedBuffer = Buffer.from(encryptedResponse.data);

          /* ===== DECRYPT FILE ===== */
          const decryptedBuffer = decryptBuffer(
            encryptedBuffer,
            doc.file.encryption.key,
            doc.file.encryption.iv
          );

          /* ===== VERIFY FILE INTEGRITY ===== */
          const isValid = verifyHash(
            decryptedBuffer,
            doc.file.sha256Hash
          );

          if (!isValid) {
            console.warn(
              `⚠️ Hash mismatch for document ${doc._id}`
            );
            continue;
          }

          /* ===== CONVERT FILE TO BASE64 ===== */
          const base64File = decryptedBuffer.toString("base64");

          /* ===== PUSH CLEAN OBJECT ===== */
          result.push({
            documentId: doc._id,
            userId: doc.userId,

            studentInfo: doc.studentInfo,
            documentType: doc.documentType,
            metadata: doc.metadata,

            file: {
              base64: base64File,
              mimeType: "application/pdf", // can be dynamic later
            },

            status: doc.status,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            qrCode: doc.qrCode || null,

          });

        } catch (fileErr) {
          console.error(
            "❌ File processing error:",
            fileErr
          );
        }
      }

      /* ================= RESPONSE ================= */
      res.json({
        message: "All documents fetched & decrypted successfully",
        data: result,
      });

    } catch (error) {
      console.error("❌ Get All Documents Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};
