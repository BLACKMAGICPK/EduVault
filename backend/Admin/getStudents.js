// profile/Profile.js

module.exports = function (app, client) {

  // =========================================================
  // 📥 GET ALL STUDENTS (ADMIN)
  // =========================================================
  app.get("/admin/students", async (req, res) => {
    try {
      const db = client.db("user_data");

      const students = await db
        .collection("student_data")
        .find(
          {}, // 👈 no filter = all students
          {
            projection: {
              password: 0,   // ❌ never expose password
              __v: 0,
            },
          }
        )
        .sort({ createdAt: -1 }) // newest first
        .toArray();

      res.json({
        message: "All students fetched successfully",
        data: students,
      });

    } catch (error) {
      console.error("❌ Fetch All Students Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

};
