// routes/Auth.js
const bcrypt = require("bcryptjs");

module.exports = function (app, client) {

  // ------------------------------
  // UNIQUE USER ID GENERATOR
  // ------------------------------
  async function generateUserId(roleKey, collectionName) {
    const db = client.db("user_data");
    const collection = db.collection(collectionName);

    const prefixMap = {
      student: "us_st_25",
      admin: "us_an_25",
      verifier: "us_vr_25",
    };

    const prefix = prefixMap[roleKey];

    const lastUser = await collection
      .find({ userId: { $regex: `^${prefix}` } })
      .sort({ userId: -1 })
      .limit(1)
      .toArray();

    let nextNumber = 1;

    if (lastUser.length > 0) {
      const lastId = lastUser[0].userId;
      const numPart = parseInt(lastId.substring(prefix.length), 10);
      nextNumber = numPart + 1;
    }

    return prefix + String(nextNumber).padStart(3, "0");
  }

  // =========================================================
  // 🔐 SIGNUP APIS (With bcrypt hashing)
  // =========================================================

  // ----------------------------------------------
  // STUDENT SIGNUP
  // ----------------------------------------------
  app.post("/signup-student", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await generateUserId("student", "student_data");

    const db = client.db("user_data");

    await db.collection("student_data").insertOne({
      userId,
      name,
      email,
      password: hashedPassword,
      role: "Student",
      accountStatus: "Active",

      // 🔹 Personal Info
      dateOfBirth: null,
      gender: null,
      nationality: null,

      // 🔹 Academic Info
      rollNumber: null,
      institutionName: null,
      degree: null,
      department: null,
      yearOfAdmission: null,
      yearOfGraduation: null,

      // 🔹 Contact Info
      mobileNumber: null,
      address: null,

      // 🔹 Profile Image
      profileImage: null,

      // 🔹 Timestamps
      createdAt: new Date(),
      updatedAt: null,
    });

    res.json({
      message: "Student signup successful",
      userId,
    });

  } catch (err) {
    console.error("Student Signup Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// ----------------------------------------------
// ADMIN SIGNUP
// ----------------------------------------------
app.post("/signup-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await generateUserId("admin", "admin_data");

    const db = client.db("user_data");

    await db.collection("admin_data").insertOne({
      // 🔹 Core Identity
      userId,
      name,
      email,
      password: hashedPassword,
      role: "Admin",
      accountStatus: "Active",

      // 🔹 Personal Information
      dateOfBirth: null,
      gender: null,
      nationality: null,

      // 🔹 Institution Information
      institutionName: null,
      institutionType: null,          // College / University / Board
      affiliationAuthority: null,     // AICTE / UGC / Govt
      institutionCode: null,
      departmentOffice: null,         // COE / Exam Cell / Registrar
      institutionLogo: null,          // Used in QR & certificates

      // 🔹 Contact Information
      officialEmail: email,            // default to login email
      mobileNumber: null,
      officeAddress: null,

      // 🔹 Profile Image (same as logo initially)
      profileImage: null,

      // 🔹 Timestamps
      createdAt: new Date(),
      updatedAt: null,
    });

    res.json({
      message: "Admin signup successful",
      userId,
    });

  } catch (err) {
    console.error("Admin Signup Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// ----------------------------------------------
// VERIFIER SIGNUP
// ----------------------------------------------
app.post("/signup-verifier", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await generateUserId("verifier", "verifier_data");

    const db = client.db("user_data");

    await db.collection("verifier_data").insertOne({
      // 🔹 Core Identity
      userId,
      name,
      email,
      password: hashedPassword,
      role: "Verifier",
      accountStatus: "Active",

       // 🔹 Personal Info
      dateOfBirth: null,
      gender: null,
      nationality: null,

      // 🔹 Professional Information
      designation: null,
      organizationName: null,
      organizationType: null,   // Recruiter / Company / University
      industryDomain: null,

      // 🔹 Contact Information
      officialEmail: email,      // can reuse login email
      mobileNumber: null,
      officeAddress: null,

      // 🔹 Profile Image
      profileImage: null,

      // 🔹 Timestamps
      createdAt: new Date(),
      updatedAt: null,
    });

    res.json({
      message: "Verifier signup successful",
      userId,
    });

  } catch (err) {
    console.error("Verifier Signup Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


  // =========================================================
  // 🔑 LOGIN APIS (bcrypt password comparison)
  // =========================================================

  // ------------------------------
  // STUDENT LOGIN
  // ------------------------------
  app.post("/login-student", async (req, res) => {
    try {
      const { email, password } = req.body;

      const db = client.db("user_data");
      const user = await db.collection("student_data").findOne({ email });

      if (!user)
        return res.status(401).json({ message: "Invalid email or password" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(401).json({ message: "Invalid email or password" });

      res.json({
        message: "Student login successful",
        userId: user.userId,
        name: user.name,
      });

    } catch (err) {
      console.error("Student Login Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // ------------------------------
  // ADMIN LOGIN
  // ------------------------------
  app.post("/login-admin", async (req, res) => {
    try {
      const { email, password } = req.body;

      const db = client.db("user_data");
      const user = await db.collection("admin_data").findOne({ email });

      if (!user)
        return res.status(401).json({ message: "Invalid email or password" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(401).json({ message: "Invalid email or password" });

      res.json({
        message: "Admin login successful",
        userId: user.userId,
        name: user.name,
      });

    } catch (err) {
      console.error("Admin Login Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // ------------------------------
  // VERIFIER LOGIN
  // ------------------------------
  app.post("/login-verifier", async (req, res) => {
    try {
      const { email, password } = req.body;

      const db = client.db("user_data");
      const user = await db.collection("verifier_data").findOne({ email });

      if (!user)
        return res.status(401).json({ message: "Invalid email or password" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(401).json({ message: "Invalid email or password" });

      res.json({
        message: "Verifier login successful",
        userId: user.userId,
        name: user.name,
      });

    } catch (err) {
      console.error("Verifier Login Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

};
