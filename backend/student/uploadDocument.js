// documents/uploadDocument.js

const multer = require("multer");
const crypto = require("crypto");
const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;

/* ================= CLOUDINARY CONFIG ================= */

cloudinary.config({
  cloud_name: "dffwyk3ik",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



/* ================= MULTER (MEMORY) ================= */

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = function (app, client) {

  /* =========================================================
     🔐 HELPER: AES-256 FILE ENCRYPTION
  ========================================================= */

  function encryptBuffer(buffer) {
    const algorithm = "aes-256-cbc";
    const key = crypto.randomBytes(32); // 256-bit key
    const iv = crypto.randomBytes(16);  // Initialization Vector

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([
      cipher.update(buffer),
      cipher.final(),
    ]);

    return {
      encryptedData: encrypted,
      key: key.toString("hex"),
      iv: iv.toString("hex"),
    };
  }

  /* =========================================================
     🔑 HELPER: SHA-256 HASH
  ========================================================= */

  function generateHash(buffer) {
    return crypto
      .createHash("sha256")
      .update(buffer)
      .digest("hex");
  }

  /* =========================================================
     📤 UPLOAD DOCUMENT API
     Endpoint: POST /student/upload-document
  ========================================================= */

  app.post(
    "/student/upload-document",
    upload.single("document"),
    async (req, res) => {
      try {
        const db = client.db("user_data");

        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
        }

        /* ================= BASIC FIELDS ================= */

        const {
          userId,
          name,
          rollNumber,
          institutionName,
          degree,
          department,
          documentType,
          metadata,
        } = req.body;

        if (!userId || !documentType || !metadata) {
          return res.status(400).json({ message: "Missing required fields" });
        }

        const parsedMetadata = JSON.parse(metadata);

        /* ================= ENCRYPT FILE ================= */

        const originalBuffer = req.file.buffer;

        const fileHash = generateHash(originalBuffer);

        const {
          encryptedData,
          key: encryptionKey,
          iv,
        } = encryptBuffer(originalBuffer);

        /* ================= UPLOAD TO CLOUDINARY ================= */

        const cloudinaryUpload = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              resource_type: "raw",
              folder: "EduVault/Documents",
              upload_preset: "Student_Documents",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          streamifier.createReadStream(encryptedData).pipe(stream);
        });

        /* ================= SAVE TO MONGODB ================= */

        const documentRecord = {
          userId,
          studentInfo: {
            name,
            rollNumber,
            institutionName,
            degree,
            department,
          },

          documentType,
          metadata: parsedMetadata,

          file: {
            cloudinaryUrl: cloudinaryUpload.secure_url,
            publicId: cloudinaryUpload.public_id,
            sha256Hash: fileHash,
            encryption: {
              algorithm: "AES-256-CBC",
              key: encryptionKey,
              iv,
            },
          },

          status: "Pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await db
          .collection("student_documents")
          .insertOne(documentRecord);

          // 2️⃣ Increment document count (ONLY if insert succeeded)
            await db.collection("student_data").updateOne(
            { userId },
            { $inc: { documentCount: 1 } }
            );

            /* ================= SAVE HISTORY LOG ================= */

            await db.collection("student_history").insertOne({
            userId,
            action: "DOCUMENT_UPLOAD",
            message: `${documentType} document uploaded successfully`,
            documentType,
            status: "Pending",
            createdAt: new Date(),
            });

        /* ================= RESPONSE ================= */

        res.status(201).json({
          message: "Document uploaded & secured successfully",
          documentHash: fileHash,
          documentUrl: cloudinaryUpload.secure_url,
        });

      } catch (error) {
        console.error("❌ Upload Document Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  );
};
