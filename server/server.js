
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const attendanceRoutes = require("./routes/attendanceRoutes");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// =========================
// CONNECT TO MONGODB
// =========================

connectDB();

// =========================
// MIDDLEWARE
// =========================

app.use(
  cors({
    origin: [
      "https://rma-association.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// =========================
// ROUTES
// =========================

app.use("/api/events", eventRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/auth", authRoutes);

// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "Ramanujan Maths Association backend is running",
  });
});

// =========================
// START SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
