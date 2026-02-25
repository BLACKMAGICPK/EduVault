const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection URI
const uri =
  "mongodb+srv://eduvault:EduVault%4025@eduvault.v6oqcwb.mongodb.net/?appName=EduVault";

const client = new MongoClient(uri);

// Connect to DB and start server
async function startServer() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected");


    // IMPORT AUTH ROUTES HERE
    require("./routes/Auth")(app, client);
    require("./routes/ForgotPassword")(app, client);
    require("./routes/ResetPassword")(app, client);
    require("./profile/Profile")(app, client);

    require("./student/uploadDocument")(app, client);
    require("./student/getDocuments")(app, client);
    require("./student/getNotification")(app, client);

    require("./Admin/getAllDocuments")(app, client);
    require("./Admin/updateDocumentStatus")(app, client);
    require("./Admin/getLogs")(app, client);
    require("./Admin/getStudents")(app, client);

    require("./routes/verifyDocument")(app, client);
    require("./Verifier/ScanQr")(app, client);
    require("./Verifier/GetVerifierLogs")(app, client);
    require("./Verifier/FindDocument")(app, client);

// ============ Start Server ============ 

    // Root route
    app.get("/", (req, res) => {
      res.send("API is running...");
    });

    // Start server
    app.listen(5000, () => {
      console.log("🚀 Server running at http://localhost:5000");
    });

  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
  }
}

startServer();