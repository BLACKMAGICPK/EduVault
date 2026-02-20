const crypto = require("crypto");
const { ObjectId } = require("mongodb");

/* ================= HTML RENDER FUNCTION ================= */
function renderPage(status, message, document = null) {
  const isVerified = status === "VERIFIED";

  return `
<!DOCTYPE html>
<html>
<head>
  <title>EduVault Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f6f8;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .card {
      background: #fff;
      padding: 2rem 2.5rem;
      border-radius: 14px;
      box-shadow: 0 12px 30px rgba(0,0,0,0.15);
      max-width: 420px;
      text-align: center;
    }
    .status {
      font-size: 2rem;
      font-weight: bold;
      color: ${isVerified ? "#2e7d32" : "#c62828"};
    }
    .msg {
      margin-top: 0.6rem;
      color: #555;
    }
    .details {
      margin-top: 1.4rem;
      text-align: left;
      font-size: 0.9rem;
    }
    .details div {
      margin-bottom: 0.4rem;
    }
    .footer {
      margin-top: 1.6rem;
      font-size: 0.75rem;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="status">
      ${isVerified ? "✔ VERIFIED" : "✖ " + status}
    </div>
    <div class="msg">${message}</div>

    ${
      isVerified
        ? `
      <div class="details">
        <div><strong>Student:</strong> ${document.studentInfo.name}</div>
        <div><strong>Roll No:</strong> ${document.studentInfo.rollNumber}</div>
        <div><strong>Institution:</strong> ${document.studentInfo.institutionName}</div>
        <div><strong>Document:</strong> ${document.documentType}</div>
        <div><strong>Verified On:</strong> ${new Date(
          document.qrCode.generatedAt
        ).toDateString()}</div>
      </div>`
        : ""
    }

    <div class="footer">
      Verified using EduVault • Secure QR Verification
    </div>
  </div>
</body>
</html>
`;
}

/* ================= VERIFY ROUTE ================= */
module.exports = function (app, client) {

  app.get("/verify/:documentId", async (req, res) => {
    try {
      const { documentId } = req.params;
      const { sig } = req.query;

      if (!sig) {
        return res.send(
          renderPage("INVALID", "Missing verification signature")
        );
      }

      const db = client.db("user_data");
      const document = await db
        .collection("student_documents")
        .findOne({ _id: new ObjectId(documentId) });

      if (!document) {
        return res.send(
          renderPage("INVALID", "Document not found")
        );
      }

      if (document.status !== "Verified" || !document.qrCode) {
        return res.send(
          renderPage("REVOKED", "This document is no longer valid")
        );
      }

      // Recreate signature
      const payload = `${document._id}:${document.userId}`;
      const expectedSig = crypto
        .createHash("sha256")
        .update(payload)
        .digest("hex");

      if (sig !== expectedSig) {
        return res.send(
          renderPage("INVALID", "QR code signature mismatch")
        );
      }

      // ✅ VERIFIED
      return res.send(
        renderPage(
          "VERIFIED",
          "This document is authentic and verified",
          document
        )
      );

    } catch (err) {
      console.error("❌ Verify Error:", err);
      res.send(
        renderPage("ERROR", "Something went wrong during verification")
      );
    }
  });
};
