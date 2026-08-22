const express = require("express");

const router = express.Router();

const {
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance
} = require("../controllers/attendanceController");


// =========================
// GET ATTENDANCE FOR EVENT
// GET /api/attendance/event/:eventId
// =========================

router.get("/event/:eventId", getAttendance);


// =========================
// CREATE ATTENDANCE
// POST /api/attendance
// =========================

router.post("/", createAttendance);


// =========================
// UPDATE ATTENDANCE
// PUT /api/attendance/:id
// =========================

router.put("/:id", updateAttendance);


// =========================
// DELETE ATTENDANCE
// DELETE /api/attendance/:id
// =========================

router.delete("/:id", deleteAttendance);


module.exports = router;