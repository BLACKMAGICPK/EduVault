// profile/Profile.js

module.exports = function (app, client) {

  // =========================================================
  // 🔧 HELPER FUNCTIONS
  // =========================================================
  function isFilled(value) {
    return value !== null && value !== undefined && value !== "";
  }

  function isProfileComplete(requiredFields) {
    return requiredFields.every(isFilled);
  }

  // =========================================================
  // 📥 GET STUDENT PROFILE
  // =========================================================
  app.get("/profile-student/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const db = client.db("user_data");

      const student = await db.collection("student_data").findOne(
        { userId },
        { projection: { password: 0 } }
      );

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.json({
        message: "Student profile fetched successfully",
        data: student,
      });

    } catch (error) {
      console.error("❌ Fetch Student Profile Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // =========================================================
  // 📤 UPDATE STUDENT PROFILE
  // =========================================================
  app.post("/update-profile-student", async (req, res) => {
    try {
      const {
        userId,
        name,
        email,
        dateOfBirth,
        gender,
        nationality,
        rollNumber,
        institutionName,
        degree,
        department,
        yearOfAdmission,
        yearOfGraduation,
        mobileNumber,
        address,
        profileImage,
      } = req.body;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const db = client.db("user_data");

      const updateData = { updatedAt: new Date() };

      if (name !== undefined) updateData.name = name;
      if (email !== undefined) updateData.email = email;
      if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth;
      if (gender !== undefined) updateData.gender = gender;
      if (nationality !== undefined) updateData.nationality = nationality;
      if (rollNumber !== undefined) updateData.rollNumber = rollNumber;
      if (institutionName !== undefined) updateData.institutionName = institutionName;
      if (degree !== undefined) updateData.degree = degree;
      if (department !== undefined) updateData.department = department;
      if (yearOfAdmission !== undefined) updateData.yearOfAdmission = yearOfAdmission;
      if (yearOfGraduation !== undefined) updateData.yearOfGraduation = yearOfGraduation;
      if (mobileNumber !== undefined) updateData.mobileNumber = mobileNumber;
      if (address !== undefined) updateData.address = address;
      if (profileImage !== undefined) updateData.profileImage = profileImage;

      // 🔒 Profile completeness check
      const requiredFields = [
        name,
        dateOfBirth,
        gender,
        nationality,
        rollNumber,
        institutionName,
        degree,
        department,
        yearOfAdmission,
        yearOfGraduation,
        mobileNumber,
        address,
        profileImage,
      ];

      updateData.isProfileComplete = isProfileComplete(requiredFields);

      const result = await db.collection("student_data").updateOne(
        { userId },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.json({ message: "Student profile updated successfully" });

    } catch (error) {
      console.error("❌ Update Student Profile Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // =========================================================
  // 📥 GET ADMIN PROFILE
  // =========================================================
  app.get("/profile-admin/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const db = client.db("user_data");

      const admin = await db.collection("admin_data").findOne(
        { userId },
        { projection: { password: 0 } }
      );

      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      res.json({
        message: "Admin profile fetched successfully",
        data: admin,
      });

    } catch (error) {
      console.error("❌ Fetch Admin Profile Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // =========================================================
  // 📤 UPDATE ADMIN PROFILE
  // =========================================================
  app.post("/update-profile-admin", async (req, res) => {
    try {
      const {
        userId,
        name,
        dateOfBirth,
        gender,
        nationality,
        institutionName,
        institutionType,
        affiliationAuthority,
        institutionCode,
        departmentOffice,
        officialEmail,
        mobileNumber,
        officeAddress,
        profileImage,
      } = req.body;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const db = client.db("user_data");

      const updateData = { updatedAt: new Date() };

      if (name !== undefined) updateData.name = name;
      if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth;
      if (gender !== undefined) updateData.gender = gender;
      if (nationality !== undefined) updateData.nationality = nationality;
      if (institutionName !== undefined) updateData.institutionName = institutionName;
      if (institutionType !== undefined) updateData.institutionType = institutionType;
      if (institutionCode !== undefined) updateData.institutionCode = institutionCode;
      if (departmentOffice !== undefined) updateData.departmentOffice = departmentOffice;
      if (officialEmail !== undefined) updateData.officialEmail = officialEmail;
      if (mobileNumber !== undefined) updateData.mobileNumber = mobileNumber;
      if (officeAddress !== undefined) updateData.officeAddress = officeAddress;
      if (profileImage !== undefined) updateData.profileImage = profileImage;
      if (affiliationAuthority !== undefined)
  updateData.affiliationAuthority = affiliationAuthority;


      // 🔒 Profile completeness check
      const requiredFields = [
        name,
        dateOfBirth,
        gender,
        nationality,
        institutionName,
        institutionType,
        institutionCode,
        affiliationAuthority,
        departmentOffice,
        officialEmail,
        mobileNumber,
        officeAddress,
        profileImage,
      ];

      updateData.isProfileComplete = isProfileComplete(requiredFields);

      const result = await db.collection("admin_data").updateOne(
        { userId },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Admin not found" });
      }

      res.json({ message: "Admin profile updated successfully" });

    } catch (error) {
      console.error("❌ Update Admin Profile Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // =========================================================
  // 📥 GET VERIFIER PROFILE
  // =========================================================
  app.get("/profile-verifier/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const db = client.db("user_data");

      const verifier = await db.collection("verifier_data").findOne(
        { userId },
        { projection: { password: 0 } }
      );

      if (!verifier) {
        return res.status(404).json({ message: "Verifier not found" });
      }

      res.json({
        message: "Verifier profile fetched successfully",
        data: verifier,
      });

    } catch (error) {
      console.error("❌ Fetch Verifier Profile Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // =========================================================
  // 📤 UPDATE VERIFIER PROFILE
  // =========================================================
  app.post("/update-profile-verifier", async (req, res) => {
    try {
      const {
        userId,
        name,
        dateOfBirth,
        gender,
        nationality,
        designation,
        organizationName,
        organizationType,
        industryDomain,
        officialEmail,
        mobileNumber,
        officeAddress,
        profileImage,
      } = req.body;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const db = client.db("user_data");

      const updateData = { updatedAt: new Date() };

      if (name !== undefined) updateData.name = name;
      if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth;
      if (gender !== undefined) updateData.gender = gender;
      if (nationality !== undefined) updateData.nationality = nationality;
      if (designation !== undefined) updateData.designation = designation;
      if (organizationName !== undefined) updateData.organizationName = organizationName;
      if (organizationType !== undefined) updateData.organizationType = organizationType;
      if (industryDomain !== undefined) updateData.industryDomain = industryDomain;
      if (officialEmail !== undefined) updateData.officialEmail = officialEmail;
      if (mobileNumber !== undefined) updateData.mobileNumber = mobileNumber;
      if (officeAddress !== undefined) updateData.officeAddress = officeAddress;
      if (profileImage !== undefined) updateData.profileImage = profileImage;

      // 🔒 Profile completeness check
      const requiredFields = [
        name,
        dateOfBirth,
        gender,
        nationality,
        designation,
        organizationName,
        organizationType,
        industryDomain,
        officialEmail,
        mobileNumber,
        officeAddress,
        profileImage,
      ];

      updateData.isProfileComplete = isProfileComplete(requiredFields);

      const result = await db.collection("verifier_data").updateOne(
        { userId },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Verifier not found" });
      }

      res.json({ message: "Verifier profile updated successfully" });

    } catch (error) {
      console.error("❌ Update Verifier Profile Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

};
