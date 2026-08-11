const Attendance = require("../models/Attendance");

// GET attendance for an event
const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      event: req.params.eventId
    })
      .populate("event", "title")
      .sort({ registerNumber: 1 });

    res.status(200).json(attendance);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch attendance",
      error: error.message
    });
  }
};


// CREATE attendance record
const createAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);

    res.status(201).json(attendance);

  } catch (error) {
    res.status(400).json({
      message: "Failed to create attendance",
      error: error.message
    });
  }
};


// UPDATE attendance
const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance record not found"
      });
    }

    res.status(200).json(attendance);

  } catch (error) {
    res.status(400).json({
      message: "Failed to update attendance",
      error: error.message
    });
  }
};


// DELETE attendance
const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(
      req.params.id
    );

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance record not found"
      });
    }

    res.status(200).json({
      message: "Attendance deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete attendance",
      error: error.message
    });
  }
};


module.exports = {
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance
};