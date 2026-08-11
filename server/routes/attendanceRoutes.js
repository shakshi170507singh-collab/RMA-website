const express = require("express");

const router = express.Router();

const {
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance
} = require("../controllers/attendanceController");


// Get attendance for an event
router.get("/event/:eventId", getAttendance);


// Create attendance
router.post("/", createAttendance);


// Update attendance
router.put("/:id", updateAttendance);


// Delete attendance
router.delete("/:id", deleteAttendance);


module.exports = router;