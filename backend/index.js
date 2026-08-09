const connectToMongo = require("./Database/db");
const express = require("express");
const app = express();
connectToMongo();
const port = process.env.PORT || 5000;
var cors = require("cors");

// ponytail: allow all origins until FRONTEND_URL is set; then lock to it (+localhost).
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((s) => s.trim()).concat("http://localhost:3000")
  : true;
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json()); //to convert request data to JSON

// Import API routes
const studentRoutes = require('./routes/student');
// Use the API routes
app.use('/api/students', studentRoutes);

// Credential Apis
app.use("/api/student/auth", require("./routes/Student Api/studentCredential"));
app.use("/api/faculty/auth", require("./routes/Faculty Api/facultyCredential"));
app.use("/api/admin/auth", require("./routes/Admin Api/adminCredential"));
// Details Apis
app.use("/api/student/details", require("./routes/Student Api/studentDetails"));
app.use("/api/faculty/details", require("./routes/Faculty Api/facultyDetails"));
app.use("/api/admin/details", require("./routes/Admin Api/adminDetails"));
// Other Apis
app.use("/api/timetable", require("./routes/timetable"));
app.use("/api/material", require("./routes/material"));
app.use("/api/notice", require("./routes/notice"));
app.use("/api/subject", require("./routes/subject"));
app.use("/api/marks", require("./routes/marks"));
app.use("/api/branch", require("./routes/branch"));

// Local dev listens; on Vercel the app is imported as a serverless handler.
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server Listening On http://localhost:${port}`);
  });
}

module.exports = app;
